'use strict';

angular.module('epos')
  .controller('StockCategoryCtrl', ['$scope', '$state', 'safeApply',function ($scope, $state, $safeApply) {

  	// load category-list view for default
  	$safeApply($scope, function(){
  		$state.transitionTo('stock.category.list');
  	});
  }]);
