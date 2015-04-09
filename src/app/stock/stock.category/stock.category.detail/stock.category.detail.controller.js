'use strict';

angular.module('epos')
  .controller('StockCategoryDetailCtrl', ['$scope', '$stateParams',function ($scope,  $stateParams) {
  	$scope.cate = $scope.categories[$stateParams.id];
  }]);