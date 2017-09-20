/**
 * Created by Sandeep on 01/06/14.
 */
angular.module('App.controllers',[]).controller('ListController',function($scope,$state,popupService,$window,Model){
    $scope.model=Model.query();
    $scope.deleteModel=function(model){
        if(popupService.showPopup('Really delete this?')){
            model.$delete(function(){
                $window.location.href='';
            });
        }
    }
}).controller('ViewController',function($scope,$stateParams,Model){
    $scope.model=Model.get({id:$stateParams.id});
	console.log( $scope.model);
}).controller('CreateController',function($scope,$state,$stateParams,Model){
    $scope.model=new Model();
    $scope.addModel=function(){
        $scope.model.$save(function(){
            $state.go('models');
        });
    }
}).controller('EditController',function($scope,$state,$stateParams,Model){
    $scope.updateModel=function(){
        $scope.model.$update(function(){
            $state.go('models');
        });
    };
    $scope.loadModel=function(){
        $scope.model=Model.get({id:$stateParams.id});
    };
    $scope.loadModel();
});