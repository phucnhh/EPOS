'use strict';

angular.module('epos')
  .controller('StockCtrl', ['$scope', '$state', 'safeApply', function ($scope, $state, $safeApply) {

  	/**
  	 * declare $scope variables
  	 */
  	$scope.goToCategoryPage = function(){
		$safeApply($scope, function(){
  			$state.transitionTo('stock.category.list');
		});
  	}

  	// load category view for default
  	$safeApply($scope, function(){
  		$state.transitionTo('stock.category');
  	});
  }]);
