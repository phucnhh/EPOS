'use strict';
/**
 * openerp provider support odoo version 8
 */
angular.module('epos')
    .factory('openErp',['_', function (_) {
    		try{

    			var jayson = require('jayson');

				// variables keep information of session and cookie when request to server
				var _session = null;
				var _headers = {
					Cookie: ''
				};

				//check host, port and dbname, if there are null then set to default
				var _host = 'localhost';
				var _port = 8069;
				var _dbName = 'ema';

				var clientKw = jayson.client.http({
					port: _port,
					hostname: _host,
					path: '/web/dataset/call_kw',
					encoding: 'UTF-8',
					headers: _headers
				});

				var clientButton = jayson.client.http({
					port: _port,
					hostname: _host,
					path: '/web/dataset/call_button',
					encoding: 'UTF-8',
					headers: _headers
				});

				var clientSearch = jayson.client.http({
					port: _port,
					hostname: _host,
					path: '/web/dataset/search_read',
					encoding: 'UTF-8',
					headers: _headers
				});

				var clientExecWorkflow = jayson.client.http({
					port: _port,
					hostname: _host,
					path: "/web/dataset/exec_workflow",
					encoding: "UTF-8",
					headers: _headers
				});

				var clientAuth = jayson.client.http({
					port: _port,
					hostname: _host,
					path: '/web/session/authenticate',
					encoding: 'UTF-8'
				});

				var clientLogout = jayson.client.http({
					port: _port,
					hostname: _host,
					path: '/web/session/destroy',
					encoding: 'UTF-8'
				});

				var buildContext = function(context){
					if (context) {
						var newContext = _.clone(_session.context);
						Object.keys(context).forEach(function(key){
							newContext[key] = context[key];
						});
						return newContext;
					} 
					return _session.context;
				}

    		}catch(ex){

    		}


	        return {


				init : function(hostERP, portERP, nameDB){
					_host = hostERP;
					_port = hostERP;
					_dbName = nameDB;
				},


				doLogin : function(login, password, callbackSuccess, callbackError) {
					var paramsAuth = {
						db: _dbName,
						login: login,
						password: password
					};

					clientAuth.on('http response', function(res) {
						// res is an instance of require('http').IncomingMessage
						_headers.Cookie = res.headers['set-cookie'];
					});

					clientAuth.request('call', paramsAuth, function(err, error, res) {
						if (res) {

							var uid = res.uid;
							if (err) {
								callbackError({
									code: 500,
									error: true
								});
							} else if (error) {
								callbackError({
									code: 500,
									error: true
								});
							} else if (uid) {
								//Store session id by uid
								var session_info = {
									context: res.user_context,
									session_id: res.session_id,
									uid: uid,
									login: login,
									password: password
								};
								_session = session_info;
								if (typeof callbackSuccess === 'function')
									callbackSuccess(session_info);
							} else {
								if (typeof callbackError === 'function')
									callbackError({
										code: 300,
										error: true
									});
							}
						} else {
							callbackError({
								code: 500,
								error: true
							});
						}
					});
				},

				
				
				doSearch : function(model, domain, fields, context, extensions, callbackSuccess, callbackError) {
					var extension = extensions || {};
					var params = {
						model: model,
						domain: domain || [],
						fields: fields,
						offset: extension.offset || 0,
						limit: extension.limit || false,
						sort: extension.sort || ''
					};
					params.context = buildContext(context);
					clientSearch.request('call', params,
						function(err, error, response) {
							if (err) {
								err.params = JSON.stringify(params);
								if (typeof callbackError === 'function')
									callbackError(err);
								return;
							}
							if (error) {
								error.params = JSON.stringify(params);
								if (typeof callbackError === 'function')
									callbackError(error);
								return;
							}
							if (typeof callbackSuccess === 'function')
								callbackSuccess(response);
						});
				},


				doCallKw : function(model, method, args, context, callbackSuccess, callbackError) {

					var params = {
						model: model,
						method: method,
						args: args,
						kwargs: {}
					};
					params.kwargs.context = buildContext(context);
					clientKw.request('call', params, function(err, error, response) {
						if (err) {
							err.params = JSON.stringify(params);
							if (typeof callbackError === 'function')
								callbackError(err);
							return;
						}
						if (error) {
							error.params = JSON.stringify(params);
							if (typeof callbackError === 'function')
								callbackError(error);
							return;
						}
						if (typeof callbackSuccess === 'function')
							callbackSuccess(response);
					});
				},


				doCallButton : function(model, method, args, context, callbackSuccess, callbackError) {
					var params = {
						model: model,
						method: method,
						args: args,
						session_id: _session.session_id,
						context: context || _session.context,
						domain_id: null,
						context_id: 1
					};
					clientButton.request('call', params, function(err, error, response) {
						if (err) {
							err.params = JSON.stringify(params);
							if (typeof callbackError === 'function')
								callbackError(err);
							return;
						}
						if (error) {
							error.params = JSON.stringify(params);
							if (typeof callbackError === 'function')
								callbackError(error);
							return;
						}
						if (typeof callbackSuccess === 'function')
							callbackSuccess(response);
					});
				},


				doExecWorkflow : function(model, id, signal, context, callbackSuccess, callbackError) {
					var params = {
						context: context || _session.context,
						id: id,
						session_id: _session.session_id,
						signal: signal,
						model: model
					};

					clientExecWorkflow.request("call", params, function(err, error, response) {
						if (err) {
							err.params = JSON.stringify(params);
							if (typeof callbackError === 'function')
								callbackError(err);
							return;
						}
						if (error) {
							error.params = JSON.stringify(params);
							if (typeof callbackError === 'function')
								callbackError(error);
							return;
						}
						if (typeof callbackSuccess === 'function')
							callbackSuccess(response);
					});
				},

				
				dologout : function(callbackSuccess, callbackError) {
					
					var params = {
						context: _session.context,
						session_id: _session.session_id
					};

					clientLogout.request('call', params, function(err, res) {
						if (err) {
							if (typeof callbackError === 'function')
								callbackError(err);
							return;
						}
						if (typeof callbackSuccess === 'function')
							callbackSuccess();
					});
				}

	        };
    }]);
