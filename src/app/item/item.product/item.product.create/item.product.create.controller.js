'use strict';

angular.module('epos')
  .controller('ItemProductCreateCtrl', ['$rootScope','$scope', '$state', '_', 'safeApply', 'openErp','product.category', 'toastMess', 'uiGridConstants',
  	function ($rootScope, $scope, $state, _, $safeApply, $openErp, $productCategory, $toastMess, uiGridConstants) {

  	/**
  	 * declare private variables and functions
  	 */
  	var fieldsProductCates = $productCategory.fields;

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

  	/**
  	 * declare $scope variables and functions
  	 */
  	$scope.autoCreateBarcode = false;
  	$scope.gridAttExtScope = $scope;

    $scope.gridAttOptions = {
	    enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
	    enableRowHeaderSelection: false,
	    columnDefs: [
	      {
	        field: 'att',
	        name:"Thuộc tính",
	        editableCellTemplate: 'ui-grid/dropdownEditor', 
	        width: '20%',
		    enableCellEditOnFocus:true ,
		    editDropdownValueLabel: 'att',
		    editDropdownIdLabel:'att', 
		    editDropdownOptionsArray: [
		        { id: 1, att: 'male' },
		        { id: 2, att: 'female' }
		    ] 
	      },
	      {
	        field: 'value',
	        name: "Giá trị"
	      }
	    ],
	    data : [{att:'Chon mot thuoc tinh', value:''}],
	   onRegisterApi: function(gridApi){
		   	//set gridApi on scope
	      $scope.gridApi = gridApi;
	   }
  	};



  	// load category from openerp 
  	loadCategory();

  }]);