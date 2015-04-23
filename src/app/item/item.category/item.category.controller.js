'use strict';

angular.module('epos')
  .controller('ItemCategoryCtrl', ['$scope', '$state', 'safeApply',function ($scope, $state, $safeApply) {

  	// load category-list view for default
  	$safeApply($scope, function(){
  		$state.transitionTo('item.category.list');
  	});
  }]);
