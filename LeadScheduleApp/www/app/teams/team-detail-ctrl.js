/**
 * Created by kattamum on 3/2/2016.
 */

(function (){
'use strict'

  angular.module('eliteApp').controller('TeamDetailCtrl',['eliteApi','$stateParams','$ionicPopup',TeamDetailCtrl])

function  TeamDetailCtrl(eliteApi,$stateParams,$ionicPopup){

  var vm=this;

  console.log("$stateParams",$stateParams);


  vm.teamId=Number($stateParams.id);
  eliteApi.getLeagueData().then(function (data) {

    var team= _.chain(data.teams)
      .flatten("divisionTeams")
      .find({"id": vm.teamId})
      .value();

    if(team!=undefined)
    {
      vm.teamName=team.name;
    }


    if(data.standings!=undefined)
    {
      vm.teamStanding = _.chain(data.standings)
        .flatten("divisionStandings")
        .find({"teamId": vm.teamId})
        .value();

    }

    vm.following=false;


    vm.toggleFollow= function () {
      if (vm.following) {
        var confirmPopup = $ionicPopup.confirm({title: 'Unfollow?', template: 'Are you sure want ot unfollow?'});

        confirmPopup.then(function (res) {
          if (res) {
            vm.following = !vm.following;
          }
        });


      }


      else {
        vm.following = !vm.following;

      }

    }

//vm.following=!vm.following;


    vm.games= _.chain(data.games)
      .filter(isTeamInGame)
      .map(function (item) {
        var isTeam1=(item.team1Id === vm.teamId ? true : false);
        var opponentName=isTeam1 ? item.team2 : item.team1;
        var scoreDisplay= getScoreDisplay(isTeam1,item.team1Score,item.team2Score)


        return{

          gameId:item.id,
          opponent:opponentName,
          time:item.time,
          location: item.location,
          locationUrl:item.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway:(isTeam1 ? "vs.": "at")

        };

      }).value();


  });





  function isTeamInGame(item)
  {
    return item.teamId === vm.teamId || item.team2Id === vm.teamId;
  }


  function getScoreDisplay(isTeam1,team1Score,team2Score){

    if(team1Score && team2Score){
      var teamScore=(isTeam1 ? team1Score : team2Score);
      var opponentScore=(isTeam1 ? team2Score : team1Score);
      var winIndicator=team1Score > opponentScore ? "W: " : "L: ";

      return winIndicator + team1Score + "-" + opponentScore;


    }
    else
    {
      return "";
    }
  }



};


})();
