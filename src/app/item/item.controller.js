'use strict';

angular.module('epos')
  .controller('ItemCtrl', ['$scope', '$state', 'safeApply', function ($scope, $state, $safeApply) {

  	// load category view for default
	$state.transitionTo('item.category');
  }]);
