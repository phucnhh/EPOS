'use strict';

angular.module('epos')
  .controller('StockCtrl', ['$scope', '$state',function ($scope, $state) {

  	// load category view for default
  	$state.transitionTo('stock.category');
  }]);
