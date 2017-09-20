/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('App.services',[]).factory('Model',function($resource){
	console.log('this is testing aap ');
    return $resource('http://localhost:5433/:id',{id:'@_id'},{
		update: { 
		     method: "PUT"
		     }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});