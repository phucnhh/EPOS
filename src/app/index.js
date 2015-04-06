'use strict';

angular.module('epos', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial', 'toaster'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });

    $urlRouterProvider.otherwise('/login');
  })
  .run(['$rootScope', 'cfg', 'openErp', function($rootScope, $cfg,$openErp){

      /* if project build same as node-webkit app, it is full screen*/
      try {
        var gui = require('nw.gui');
        var win = gui.Window.get();
        win.showDevTools();
        win.maximize(); 
      }
      catch (ex) {
      }

      // init param for openerp service
  		$openErp.init($cfg.erphost, $cfg.erpport, $cfg.erpdb);

      // set showLoading is hidden
      $rootScope.showLoading = false;
  }])
;
