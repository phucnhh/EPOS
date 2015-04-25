'use strict';

angular.module('epos')
  .controller('LeftsideCtrl',['$scope', '$state', 'safeApply', function ($scope, $state, $safeApply) {
    // $scope.currentView = 'item';
     /* declare $scope functions */
    $scope.getCurrentMainView = function(){
        var nameCurrentState = $state.current.name;
        if (/^item/.test(nameCurrentState)) 
          return 'item';

        return '';
    };
    /**
     * declare $scope variables and functions
     */
    $scope.goToCategoryPage = function(){
      var nameCurrentState = $state.current.name;
      if (/^item.category/.test(nameCurrentState)) {
        $state.transitionTo('item.category.list');
      } else {
        if ($scope.getCurrentMainView() !== 'item') {
          $state.go('item');
        } else {
          $state.transitionTo('item.category');
        }
      };
    };

    $scope.goToProductPage = function(){
      var nameCurrentState = $state.current.name;
      if (/^item.product/.test(nameCurrentState)) {
        $state.transitionTo('item.product.create');
      } else {
        if ($scope.getCurrentMainView() !== 'item') {
          $state.go('item');
        } else {
          $state.transitionTo('item.product');
        }
      }
    };
   
  }]);