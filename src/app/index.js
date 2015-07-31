'use strict';

angular.module('epos', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'toaster', 'ui.grid', 'ui.grid.selection', 'ui.grid.selection', 'ui.grid.autoResize',  'ui.grid.edit', 'ui.grid.cellNav'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      // stock view
      .state('item', {
        url: '/item',
        templateUrl: 'app/item/item.html',
        controller: 'ItemCtrl'
      })
          // item-category
          .state('item.category', {
              url: '/category',
              templateUrl: 'app/item/item.category/item.category.html',
              controller: 'ItemCategoryCtrl'
          })
          .state('item.category.list', {
              url: '/list',
              templateUrl: 'app/item/item.category/item.category.list/item.category.list.html',
              controller: 'ItemCategoryListCtrl'
          })
          .state('item.category.detail', {
              url: '/:id',
              templateUrl: 'app/item/item.category/item.category.detail/item.category.detail.html',
              controller: 'ItemCategoryDetailCtrl'
          })
          .state('item.category.create', {
              url: '/create',
              templateUrl: 'app/item/item.category/item.category.create/item.category.create.html',
              controller: 'ItemCategoryCreateCtrl'
          })

          // item-product
          .state('item.product', {
              url: '/product',
              templateUrl: 'app/item/item.product/item.product.html',
              controller: 'ItemProductCtrl'
          })
           .state('item.product.create', {
              url: '/create',
              templateUrl: 'app/item/item.product/item.product.create/item.product.create.html',
              controller: 'ItemProductCreateCtrl'
          })
      // sale view
      .state('sale', {
        url: '/sale',
        templateUrl: 'app/sale/sale.html',
        controller: 'SaleCtrl'
      })
      // login
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });

    $urlRouterProvider.otherwise('/login');
  })
  .run(['$rootScope', 'cfg', 'openErp', function($rootScope, $cfg,$openErp){

      try {
        // if project build same as node-webkit app, it is full screen
        var gui = require('nw.gui');
        var win = gui.Window.get();
        win.maximize(); 
        win.showDevTools();

         // init param for openerp service
        $openErp.init($cfg.erphost, $cfg.erpport, $cfg.erpdb);

        // set showLoading is hidden
        $rootScope.countLoading = 0;

      }
      catch (ex) {
      }

  }])
;
