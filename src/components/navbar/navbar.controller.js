'use strict';

angular.module('epos')
  .controller('NavbarCtrl',['$scope', '$state', 'safeApply', function ($scope, $state, $safeApply) {

  	/* declare private variable */
  	

  	/* declare $scope variables */

    /* declare $scope functions */
   /* $scope.goToStockPage = function(){
    	$safeApply($scope, function(){
        var nameCurrentState = $state.current.name;
        if (/^stock/.test(nameCurrentState)) {
          $state.transitionTo('stock.category.list');
        } else {
    		  $state.go('stock');
        }
    	});
    };*/
  }]);
