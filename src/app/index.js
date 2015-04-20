'use strict';

angular.module('epos', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial', 'toaster', 'ui.grid', 'ui.grid.selection', 'ui.grid.selection'])
  .config(function ($stateProvider, $urlRouterProvider,  $mdIconProvider) {
    $stateProvider
      // stock view
      .state('stock', {
        url: '/stock',
        templateUrl: 'app/stock/stock.html',
        controller: 'StockCtrl'
      })
          // stock-category
          .state('stock.category', {
              url: '/category',
              templateUrl: 'app/stock/stock.category/stock.category.html',
              controller: 'StockCategoryCtrl'
          })
          .state('stock.category.list', {
              url: '/list',
              templateUrl: 'app/stock/stock.category/stock.category.list/stock.category.list.html',
              controller: 'StockCategoryListCtrl'
          })
          .state('stock.category.detail', {
              url: '/:id',
              templateUrl: 'app/stock/stock.category/stock.category.detail/stock.category.detail.html',
              controller: 'StockCategoryDetailCtrl'
          })
          .state('stock.category.create', {
              url: '/create',
              templateUrl: 'app/stock/stock.category/stock.category.create/stock.category.create.html',
              controller: 'StockCategoryCreateCtrl'
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

     // Register icons in system
    $mdIconProvider
        .icon('header-setting', 'assets/images/svg/align14.svg')
        .icon('nav-sale'      , 'assets/images/svg/sale.svg')
        .icon('nav-stock', 'assets/images/svg/stock.svg' )
        .icon('nav-report', 'assets/images/svg/report.svg' )
        .icon('btn-delete', 'assets/images/svg/delete.svg', 16 )
        .icon('btn-add', 'assets/images/svg/add.svg', 16 )
        .icon('btn-save', 'assets/images/svg/save.svg', 16 )
        .icon('stock-left-category', 'assets/images/svg/category.svg', 32 )
        .icon('stock-left-product', 'assets/images/svg/product.svg', 32 )
        .icon('stock-left-import', 'assets/images/svg/import_product.svg', 32 )
        .icon('stock-left-inventory', 'assets/images/svg/inventory_product.svg', 32 );
  })
  .run(['$rootScope', 'cfg', 'openErp', function($rootScope, $cfg,$openErp){

      try {
        // if project build same as node-webkit app, it is full screen
        var gui = require('nw.gui');
        var win = gui.Window.get();
        win.showDevTools();
        win.maximize(); 

         // init param for openerp service
        $openErp.init($cfg.erphost, $cfg.erpport, $cfg.erpdb);

        // set showLoading is hidden
        $rootScope.showLoading = false;

      }
      catch (ex) {
      }

  }])
;
