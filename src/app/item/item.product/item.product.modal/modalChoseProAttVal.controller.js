'use strict';

angular.module('epos')
  .controller('ModalChoseProAttValCtrl', ['$rootScope','$scope', '_', 'safeApply', 'openErp', 'product.attribute.value', '$modalInstance', 'attributeValues', 'attributeSelectedValues',
  	function ($rootScope, $scope, _, $safeApply, $openErp, $productAttributeValue, $modalInstance, attributeValues, attributeSelectedValues) {

  		/**
  		 * declare $scope varibles and functions
  		 */
  		$scope.attributeValues = attributeValues;
  		$scope.attributeSelectedValues = attributeSelectedValues;


  		// action select one attribute value
  		// step 1: unactive old select attribute value
  		// step 2: set $scope.attributeValuesSelecting is current attribute value
  		$scope.addSelectingAttributeValue = function(paAttributeValueSelecting) {
  			if (attributeValueSelecting) {
  				attributeValueSelecting.isSelecting = false;
  			}
  			attributeValueSelecting = paAttributeValueSelecting;
  			attributeValueSelecting.isSelecting = true;
  		};

  		// action select one attribute value selected
  		// step 1: unactive old select attribute value selected
  		// step 2: set $scope.attributeValuesSelecting is current attribute value selected
  		$scope.addSelectingAttributeValueSelected = function(paAttributeValueSelectedSelecting) {
  			if (attributeValueSelectedSelecting) {
  				attributeValueSelectedSelecting.isSelecting = false;
  			}
  			attributeValueSelectedSelecting = paAttributeValueSelectedSelecting;
  			attributeValueSelectedSelecting.isSelecting = true;
  		};
  		
  		// action chose one attribute value
  		// step 1: reject this attribute value in $scope.attributeValues
  		// step 2: unselect attribute value selecting
  		$scope.selectAttributeValue = function(){
  			$scope.attributeValues = _.reject($scope.attributeValues, function(attVal){
  				return attVal.id === attributeValueSelecting.id;
  			});
  			attributeValueSelecting.isSelecting = false;
  			$scope.attributeSelectedValues.push(attributeValueSelecting);
  		};

  		// action unselect one attribute value selected
  		$scope.unSelectAttributeValue = function(){
  			$scope.attributeSelectedValues = _.reject($scope.attributeSelectedValues, function(attVal){
  				return attVal.id === attributeValueSelectedSelecting.id;
  			});
  			attributeValueSelectedSelecting.isSelecting = false;
  			$scope.attributeValuespush(attributeValueSelectedSelecting);
  		};

  		$scope.close = function(){
  			$modalInstance.dismiss('cancel');
  		};

  		/**
  		 * declare private variables and functions
  		 */
  		var attributeValueSelecting = null;
  		var attributeValueSelectedSelecting = null;
  }]);