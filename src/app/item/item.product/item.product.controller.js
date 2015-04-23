'use strict';

angular.module('epos')
  .controller('ItemProductCtrl', ['$scope', '$state', 'safeApply',function ($scope, $state, $safeApply) {

  	// load product-create view for default
  	$safeApply($scope, function(){
  		$state.transitionTo('item.product.create');
  	});
  }]);