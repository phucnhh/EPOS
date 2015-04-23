'use strict';

angular.module('epos')
  .controller('ItemCategoryCreateCtrl', ['$rootScope','$scope', '$state', '_', 'safeApply', 'openErp','product.category', 'toastMess',
  	function ($rootScope, $scope, $state, _, $safeApply, $openErp, $productCategory, $toastMess) {

  	/**
  	 * declate private variables and functions
  	 */
  	var fieldsProductCates = $productCategory.fields;
  	// validate input data of form create category
    var validateFormCreateCategory = function(){
      var msgs = [];
      var nameOfCate = typeof $scope.nameCate === 'string' ? $scope.nameCate.trim() : '';

      if(nameOfCate.length < 4 || nameOfCate.length > 20){
        msgs.push('Tên danh mục phải chứa 4 - 20 ký tự');
      }

      return msgs;
    };

  	/**
  	 * declare $scope variables
  	 */
  	

  	/**
  	 * declare $scope functions
  	 */
  	$scope.doCreateCategory = function(){
  		var msgs = validateFormCreateCategory();
  		if (msgs.length > 0) {
  			$toastMess.showToastError(msgs, 3000, null);
  		}else {
	  		// show loading
	  		$rootScope.countLoading += 1;

	  		// process create category
	  		var defaultCate = $productCategory.defaultVal;
  			defaultCate[fieldsProductCates.parent_id] = $scope.parentCate;
	  		defaultCate[fieldsProductCates.name] = $scope.nameCate;

	  		// call create object_category to openerp
	  		$openErp.doCallKw($productCategory.model, "create", [defaultCate], {
	  			'params':{
			  		'action': 117
			  	}
	  		}, function(result){
	  			$safeApply($scope, function(){
		        	$rootScope.countLoading -= 1;
			        $toastMess.showToastSuccess('Đã tạo thành công danh mục: <b>' + $scope.nameCate +'</b>', 3000, null);
			    });
	  		}, function(error){
	  			$safeApply($scope, function(){
		        	$rootScope.countLoading -= 1;
		  			$toastMess.showToastError('Tạo không thành công danh mục: <b>' + $scope.nameCate +'</b>', 3000, null);
		  			console.log(error);
			    });
	  			
	  		});
  		}
  	}

	  // load categories from server
	  $rootScope.countLoading += 1;
	  $openErp.doSearch($productCategory.model, null, [fieldsProductCates.id, fieldsProductCates.complete_name], {
	  	'bin_size': true,
	  	'params':{
	  		'action': 117
	  	}
	  }, null, function(result){
	  	$safeApply($scope, function(){
	  		$scope.categories = result.records;
        	$rootScope.countLoading -= 1;
	    });
	  }, function(error){	
	  	$safeApply($scope, function(){
	  		$rootScope.countLoading -= 1;
	  		console.log(error);
	    });
	  });


  }]);
