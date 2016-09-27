/**
 * Created by kattamum on 3/3/2016.
 */
(function (){
  'use strict';

  angular.module('eliteApp').controller('LocationsCtrl',['eliteApi',LocationsCtrl]);

  function  LocationsCtrl(eliteApi){

    var vm=this;

  eliteApi.getLeagueData().then(function (data) {

      vm.locations=data.locations;

      console.log(data.locations)
    });


  };

})();
