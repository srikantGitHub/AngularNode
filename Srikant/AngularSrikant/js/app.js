/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('App',['ui.router','ngResource','App.controllers','App.services']);

angular.module('App').config(function($stateProvider,$httpProvider){
    $stateProvider.state('models',{
        url:'/models',
        templateUrl:'partials/models.html',
        controller:'ListController'
    }).state('viewModels',{
       url:'/models/:id/view',
       templateUrl:'partials/model-view.html',
       controller:'ViewController'
    }).state('newModels',{
        url:'/models/new',
        templateUrl:'partials/model-add.html',
        controller:'CreateController'
    }).state('editModels',{
        url:'/models/:id/edit',
        templateUrl:'partials/model-edit.html',
        controller:'EditController'
    });
}).run(function($state){
   $state.go('models');
});