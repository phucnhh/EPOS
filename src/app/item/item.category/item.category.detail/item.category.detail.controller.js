'use strict';

angular.module('epos')
  .controller('ItemCategoryDetailCtrl', ['$rootScope','$scope', '$state', '_', 'safeApply', 'openErp','product.category', 'toastMess', '$stateParams'
  	,function ($rootScope, $scope, $state, _, $safeApply, $openErp, $productCategory, $toastMess, $stateParams) {

  	/**
  	 * declate private variables and functions
  	 */
  	var fieldsProductCates = $productCategory.fields;
    var clone_cate_parent_id = null;
    var clone_cate_name = null;


  	// validate input data of form update category
    var validateFormUpdateCategory = function(){
      var msgs = [];
      var nameOfCate = typeof $scope.cate_name === 'string' ? $scope.cate_name.trim() : '';
      if(nameOfCate.length < 4 || nameOfCate.length > 20){
        msgs.push('Tên danh mục phải chứa 4 - 20 ký tự');
      }
      return msgs;
    };

    // build fields update for category 
    var buildFieldsUpdate = function(){
      var fieldsUpdated = {}; // variable that hold fields and new value updated for category
      var flagUpdateCate = false; // variable check update or not update category

      var cate_name = $scope.cate_name;
      if (clone_cate_name !== cate_name) {
        fieldsUpdated[fieldsProductCates.name] = cate_name;
        flagUpdateCate = true;
      };

      var cate_parent_id = $scope.cate_parent_id;
      if (clone_cate_parent_id !== cate_parent_id) {
        fieldsUpdated[fieldsProductCates.parent_id] = cate_parent_id;
        flagUpdateCate = true;
      };

      return flagUpdateCate ? fieldsUpdated : flagUpdateCate;
    }

    // get category by id
  	var getCategoryById = function(id){
      $rootScope.countLoading += 1;
  		// call get_category by to openerp
  		$openErp.doCallKw($productCategory.model, "read", [[id], [fieldsProductCates.id, fieldsProductCates.name, fieldsProductCates.parent_id]], {
  			'params':{
		  		'action': 117
		  	}
  		}, function(result){
  			$safeApply($scope, function(){
	        	$rootScope.countLoading -= 1;
		        if (Array.isArray(result) && result.length > 0) {
              var cateTmp = result[0];
              $scope.cate_name = cateTmp.name;
              clone_cate_name  = $scope.cate_name;

              if (cateTmp.parent_id) {
                $scope.cate_parent_id = cateTmp.parent_id[0];
                clone_cate_parent_id = $scope.cate_parent_id;
              };
		        } else {
		        	$toastMess.showToastError('Không lấy được danh mục với id:  <b>' + id +'</b>', 3000, null);
		        }
		    });
  		}, function(error){
  			$safeApply($scope, function(){
	       $rootScope.countLoading -= 1;
	  			$toastMess.showToastError('Không lấy được danh mục với id:  <b>' + id +'</b>', 3000, null);
	  			console.log(error);
		    });
  			
  		});
  	};

    // load all category from openerp
    var loadAllCategory = function(){
      $rootScope.countLoading += 1;
       // load category from server
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

    // update information of category
    var updateCategory = function(id){
      var fieldsUpdate = buildFieldsUpdate();
      if (fieldsUpdate) {
        var msgs = validateFormUpdateCategory();
        if (msgs.length > 0) {
          $toastMess.showToastError(msgs, 3000, null);
        } else {

          $rootScope.countLoading += 1;

          // call update category to openerp
          $openErp.doCallKw($productCategory.model, "write", [[id], fieldsUpdate], {
            'params':{
              'action': 117
            }
          }, function(result){
            $safeApply($scope, function(){
                $rootScope.countLoading -= 1;
                if (result) {
                  $toastMess.showToastSuccess('Cập nhật thông tin danh mục thành công', 3000, null);
                } else {
                  $toastMess.showToastError('Không cập nhật được thông tin danh mục', 3000, null);
                }
            });
          }, function(error){
            $safeApply($scope, function(){
              $rootScope.countLoading -= 1;
              $toastMess.showToastError('Không cập nhật được thông tin danh mục', 3000, null);
              console.log(error);
            });
            
          });
        }
      } else {
        $toastMess.showToastError('Không thể cập nhật do thông tin danh mục không bị thay đổi', 3000, null);
      }
    }

     /**
      * declare $scope variables
      */
     $scope.cate_name = null;
     $scope.cate_parent_id = null;

     /**
      * Declare $scope functions
      */
     $scope.doUpdateCategory = function(){
      updateCategory(parseInt($stateParams.id, 10));
     };


  	// load category by id when load this screen
    loadAllCategory();
    getCategoryById(parseInt($stateParams.id, 10));
  	
  }]);