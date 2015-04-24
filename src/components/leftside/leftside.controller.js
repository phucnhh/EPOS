'use strict';

angular.module('epos')
  .controller('LeftsideCtrl',['$scope', '$state', 'safeApply', function ($scope, $state, $safeApply) {
    // $scope.currentView = 'item';
     /* declare $scope functions */
    $scope.getCurrentView = function(){
        var nameCurrentState = $state.current.name;
        if (/^item/.test(nameCurrentState)) 
          return 'item';

        return '';
    };
    /**
     * declare $scope variables and functions
     */
    $scope.goToCategoryPage = function(){
      $safeApply($scope, function(){
          $state.transitionTo('item.category.list');
      });
    };

    $scope.goToProductPage = function(){
      $safeApply($scope, function(){
          $state.transitionTo('item.product.create');
      });
    };
   
  }]);