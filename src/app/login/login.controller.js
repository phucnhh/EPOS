'use strict';

angular.module('epos')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'safeApply','toastMess', 'msg', 'openErp',
    function ($rootScope, $scope, $state, $safeApply, $toastMess, $msg, $openErp) {

    /**
     * declare variable or function private*
     */
    
    // validate input data of form login
    var validateFormLogin = function(){
      var msgs = [];
      var username = typeof $scope.user.username === 'string' ? $scope.user.username.trim() : '';
      var password = typeof $scope.user.password === 'string' ? $scope.user.password.trim() : '';

      if(username.length < 4 || username.length > 10){
        msgs.push('Tên đăng nhập phải chứa 4 - 10 ký tự');
      }

      if(password.length < 6 || password.length > 20){
        msgs.push('Mật khẩu phải chứa 6 - 20 ký tự');
      }

      return msgs;
    };

    
    /**
     * declare $scope variables*
     */
    $scope.user = {'username':'', 'password':''};

    /**
     * declare $scope functions
     */
    $scope.doLogin = function(){

      // validate form login
      var msgs = validateFormLogin();
      if(msgs.length >0){
        $toastMess.showToastError(msgs, 3000, null);
      } else {
        // call services login of openerp
        $rootScope.showLoading = true;
        $openErp.doLogin($scope.user.username, $scope.user.password, function(res){
          $safeApply($scope, function(){
              // go to home page
              $state.go('stock');
          });
        }, function(err){
          $safeApply($scope, function(){
            $rootScope.showLoading = false;
            if (err.error) {
              if (err.code === 500) {
                 $toastMess.showToastError($msg.err500, 3000, null);
              } else if (err.code === 300){
                $toastMess.showToastError($msg.err300, 3000, null);
              } else {
                $toastMess.showToastError($msg.errAnm, 3000, null);
              };
            }else{
              $toastMess.showToastError($msg.errAnm, 3000, null);
            };
          });
        });
      }
    };
  }]);
