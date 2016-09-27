/**
 * Created by kattamum on 3/4/2016.
 */
(function (){
  'use strict';

  angular.module('eliteApp').controller('GameCtrl',['eliteApi','$stateParams',GameCtrl]);

  function  GameCtrl(eliteApi,$stateParams){

    var vm=this;


    var gameId=Number($stateParams.id);
    eliteApi.getLeagueData().then(function (data) {
      vm.game= _.find(data.games,{"id":gameId});
    });




  };

})();
