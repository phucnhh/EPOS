'use strict';

angular.module('epos')
  .controller('NavbarCtrl',['$scope', '$state', function ($scope, $state) {

  	/* declare $scope variables */

    /* declare $scope functions */
    $scope.goToHomePage = function(){
    	$state.go()
    }


  }]);
