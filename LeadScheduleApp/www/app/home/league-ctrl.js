/**
 * Created by kattamum on 3/2/2016.
 */
(function (){
  'use strict';

  angular.module('eliteApp').controller('LeaguesCtrl',['$state','eliteApi',LeaguesCtrl]);

  function  LeaguesCtrl($state,eliteApi){

    var vm=this;


    eliteApi.getLeagues().then(function (data) {
      vm.leagues=data;
    });

    //eliteApi.getLeagueData().then(function (data) {
    //  vm.leagues=data.leagues;
    //});



    //var leagues=eliteApi.getLeagues();
    //var leaguesData=eliteApi.getLeagueData();
    //
    //console.log("leagues",leagues);
    //console.log("leaguesData",leaguesData);

   // vm.leagues=leagues;

    vm.selectLeague=function (id){
//todo:
      eliteApi.setLeagueId(id);
      $state.go('app.teams');
    };

  };


})();

