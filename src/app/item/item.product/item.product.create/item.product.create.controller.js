'use strict';

angular.module('epos')
  .controller('ItemProductCreateCtrl', ['$rootScope','$scope', '$state', '_', 'safeApply', 'openErp', 'product.category','product.attribute', 'product.attribute.value', 'toastMess','$modal',
  	function ($rootScope, $scope, $state, _, $safeApply, $openErp, $productCategory, $productAttribute, $productAttributeValue, $toastMess, $modal) {

  	/**
  	 * declare $scope functions and variables
  	 */
  	$scope.attsSelected = [];
  	$scope.attributes = [];
  	$scope.attributeValues = [];

  	$scope.addNewRowTableChoseAtts = function(){
  		$scope.attsSelected.push({attSelectedId:null, attValuesSelected:[]});
  	};

  	$scope.removeAttSelected = function(index){
  		$scope.attsSelected.splice(index, 1);
  	}

  	/**
  	 * declare private variables and functions
  	 */
  	var fieldsProductCates = $productCategory.fields;
  	var fieldsProductAttributes = $productAttribute.fields;
  	var fieldsProductAttValues = $productAttributeValue.fields;

  	var loadCategory = function(){
  		$rootScope.countLoading += 1;
	  	$openErp.doSearch($productCategory.model, null, [fieldsProductCates.id, fieldsProductCates.complete_name], {
		  	'bin_size': true,
		  	'params':{
		  		'action': 117
		  	}
		  }, null, function(result){
		  	$safeApply($scope, function(){
		  		$rootScope.countLoading -= 1;
		  		$scope.categories = result.records;
		    });
		  }, function(error){	
		  	$safeApply($scope, function(){
		  		$rootScope.countLoading -= 1;
		  		console.log(error);
		    });
		  });
	  };

	var loadProductAttribute = function(){
		$rootScope.countLoading += 1;
	  	$openErp.doSearch($productAttribute.model, null, [fieldsProductAttributes.id, fieldsProductAttributes.name], {
		  	'bin_size': true,
		  	'params':{
		  		'action': 113
		  	}
		  }, null, function(result){
		  	$safeApply($scope, function(){
		  		$rootScope.countLoading -= 1;
		  		$scope.attributes = result.records;
		    });
		  }, function(error){	
		  	$safeApply($scope, function(){
		  		$rootScope.countLoading -= 1;
		  		console.log(error);
		    });
		  });
	};


	var loadValuesOfProductAttribute = function(idAtt, callbackFunc){
		if (typeof idAtt !== 'number') {
			idAtt = parseInt(idAtt, 10);
			if (isNaN(idAtt)) {
				$toastMess.showToastError('id của product attribute không đúng', 3000, null);
				return;
			};
		}

		$openErp.doSearch($productAttributeValue.model, [[fieldsProductAttValues.attribute_id, '=', idAtt]], [fieldsProductAttValues.id, fieldsProductAttValues.name], {
		  	'bin_size': true,
		  	'params':{
		  		'action': 114
		  	}
		  }, null, function(result){
		  	$safeApply($scope, function(){
		  		$rootScope.countLoading -= 1;
		  		$scope.attributeValues = result.records;
		  		callbackFunc();
		    });
		  }, function(error){	
		  	$safeApply($scope, function(){
		  		$rootScope.countLoading -= 1;
		  		callbackFunc();
		  		console.log(error);
		    });
		  });
	};


  	/**
  	 * declare $scope variables and functions
  	 */
  	$scope.autoCreateBarcode = false;

  	$scope.openModalChoseProductAttributeValue = function(idAtt){
		if (typeof idAtt !== 'number') {
			idAtt = parseInt(idAtt, 10);
			if (isNaN(idAtt)) {
				$toastMess.showToastError('Bạn chưa chọn thuộc tính của sản phẩm', 3000, null);
				return;
			};
		}
		loadValuesOfProductAttribute(idAtt, function(){

			var modalInstance = $modal.open({
		      templateUrl: 'app/item/item.product/item.product.modal/modalChoseProAttVal.html',
		      controller: 'ModalChoseProAttValCtrl',
		      size: null,
		      resolve: {
		      	attributeValues: function(){
		      		return $scope.attributeValues;
		      	},

		        attributeSelectedValues: function(){
		        	var attributeSelected = _.find($scope.attsSelected, function(attSelected) {
		        		return attSelected.attSelectedId == idAtt;
		        	});
		        	return attributeSelected.attValuesSelected ? [] : attributeSelected.attValuesSelected;
		        }
		      }
		    });

		  /*  modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });*/
		    
		});


  	};

  	// load categories from openerp 
  	loadCategory();

  	// load product attributes from openerp 
  	loadProductAttribute();

  }]);