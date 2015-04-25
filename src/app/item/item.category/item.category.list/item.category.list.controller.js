'use strict';

angular.module('epos')
  .controller('ItemCategoryListCtrl', ['$rootScope','$scope', '$state', 'uiGridConstants', '_', 'safeApply', 'openErp','product.category', 'toastMess',
  	function ($rootScope, $scope, $state, uiGridConstants, _, $safeApply, $openErp, $productCategory, $toastMess) {
  		/**
  		 * declare private variables
  		 */
	   var fieldsProductCates = $productCategory.fields;
	   var loadAllCategory = function(){
	   		 // load category from server
	   		  $rootScope.countLoading += 1;
			  $openErp.doSearch($productCategory.model, null, [fieldsProductCates.id, fieldsProductCates.complete_name], {
			  	'bin_size': true,
			  	'params':{
			  		'action': 117
			  	}
			  }, null, function(result){
			  	$safeApply($scope, function(){
			  		$scope.gridOptions.data = result.records;
		        	$rootScope.countLoading -= 1; 
		        });
			  }, function(error){
			  	$safeApply($scope, function(){
			  		$rootScope.countLoading -= 1;
			  		console.log(error);
		        });
			  });
	   };


	  	/**
	  	 * declare $scope variables
	  	 */
	   $scope.gridOptions = {
	    enableSorting: true,
	    enableGridMenu: true,
	    enableRowSelection: true,
	    enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
	    columnDefs: [
	      {
	        field: fieldsProductCates.id,
	        name:"Id",
	        sort: {
	          direction: uiGridConstants.DESC,
	          priority: 1
	        }
	      },
	      {
	        field: fieldsProductCates.complete_name,
	        name: "Name",
	        sort: {
	          direction: uiGridConstants.DESC,
	          priority: 0
	        }
	      }
	    ],
	    gridMenuCustomItems: [
	      {
	        title: 'Xóa',
	        action: function ($event) {
	        	// get row that selected by user
	        	var selectedRow = $scope.gridApi.selection.getSelectedRows();
	        	if (selectedRow.length > 0) {
		        	// show loading
		        	$rootScope.countLoading += 1;
		        	
		        	var argIds = [];
		        	var nameCateSelected = '<ul>';
		        	selectedRow.forEach(function(row){
		        		argIds.push(row.id);
		        		nameCateSelected += '<li>' + row.complete_name + '</li>';
		        	});

		        	// call service delete of openerp
		        	// call create object_category to openerp
			  		$openErp.doCallKw($productCategory.model, "unlink", [argIds], {
			  			'params':{
					  		'action': 117
					  	}
			  		}, function(result){
			  			$safeApply($scope, function(){
				        	$rootScope.countLoading -= 1; // hidden loading
					        $toastMess.showToastSuccess('Đã xóa thành công danh mục: </br>' + nameCateSelected, 3000, null);

					        // reload category from openerp
					        loadAllCategory();
					    });
			  		}, function(error){
			  			$safeApply($scope, function(){
				        	$rootScope.countLoading -= 1; // hidden loading
				  			$toastMess.showToastSuccess('Xóa không thành công danh mục : </br>' + nameCateSelected, 3000, null);
				  			console.log(error);
					    });
			  			
			  		});
	        	} else {
	        		
	        	}
	        }
	      }
	   ],
	   onRegisterApi: function(gridApi){
		   	//set gridApi on scope
	      $scope.gridApi = gridApi;
	   },
	    appScopeProvider: { 
	          onDblClick : function(row) {
          		var id = row.entity.id;
               // go to detail page
               $state.transitionTo('item.category.detail', { id:  id});
	          }
	    },
	    rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell ></div>"
	  };


	  /**
	   * decalare $scope functions
	   */
	  $scope.goToCreateCategory = function(){
  		$state.transitionTo('item.category.create');
	  }

	  // load category from openerp when load this screen.
	  loadAllCategory();

 }]);