'use strict';

angular.module('epos')
  .controller('LeftsideCtrl',['$scope', '$state', 'safeApply', function ($scope, $state, $safeApply) {

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