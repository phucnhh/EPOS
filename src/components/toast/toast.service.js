'use strict';
angular.module('epos')
    .factory('toastMess', ['toaster', function (toaster) {

    		// variable keep type of toast message
    		var success = 'success';
    		var warning = 'warning';
    		var error 	= 'error';
    		var wait 	= 'wait';
    		var note 	= 'note';

    		// variable keep title of toast
    		var titleSuccess = 'Thông báo';
    		var titleError	 = 'Lỗi';


    		var buildBodyMsg = function(msgs){
    			// build body message
    			msgs = Array.isArray(msgs) ? msgs : [msgs];
        		var body = "<ul>";
        		msgs.forEach(function(msg){
        			  body += "<li>"+msg+"</li>";
        		});
        		body += "</ul>";

        		// return body
        		return body;
    		};

	        return {

	        	showToastSuccess : function (msgs, timeout, clickHandler){
	        		timeout = typeof timeout !== "number" ? 3000 : timeout;
	        		var bodyMess = buildBodyMsg(msgs);
	        		toaster.pop(success, titleSuccess, bodyMess, timeout, 'trustedHtml', clickHandler);

	        	},

	        	showToastError : function (msgs, timeout, clickHandler){
	        		timeout = typeof timeout !== "number" ? 3000 : timeout;
	        		var bodyMess = buildBodyMsg(msgs);
	        		toaster.pop(error, titleError, bodyMess, timeout, 'trustedHtml', clickHandler);
	        	}

	        };
    }]);
