'use strict';

angular.module('epos')
  .controller('StockCategoryCtrl', ['$scope', '$state',function ($scope, $state) {

  	/**
  	 * declare $scope variables
  	 */
  	$scope.categories = [{id:0, name:'cate 1', desc:"Chi tiet cate 1"}, {id:1, name:'cate 2', desc:"Chi tiet cate 2"}];

  	// load category-list view for default
  	$state.transitionTo('stock.category.list');
  }]);
