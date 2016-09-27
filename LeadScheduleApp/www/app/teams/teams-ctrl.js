/**
 * Created by kattamum on 3/3/2016.
 */
(function (){
  'use strict';

  angular.module('eliteApp').controller('TeamsCtrl',['$scope','eliteApi',TeamsCtrl]);

  function  TeamsCtrl($scope,eliteApi){

    var vm=this;

    vm.loadList= function (forceRefresh) {

      eliteApi.getLeagueData().then(function (data) {
        vm.teams=data.teams;
      }).finally(function () {
        $scope.$broadcast('scroll,refreshComplete')
      });

    };



    //var data=eliteApi.getLeagueData();
   // vm.teams=data.teams;

    vm.loadList(false);

  };

})();
