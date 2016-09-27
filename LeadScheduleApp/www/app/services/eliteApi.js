/**
 * Created by kattamum on 3/2/2016.
 */

(function () {
  'use strict';

  angular.module('eliteApp').factory('eliteApi', ['$http','$q','$ionicLoading','CacheFactory',eliteApi]);

  function eliteApi($http,$q,$ionicLoading,DSCacheFactory) {

   // var currentLeagueId;

    self.leaguesCache=DSCacheFactory.get("leaguesCache");
    self.leagueDataCache=DSCacheFactory.get("leagueDataCache");

    //if some thing went wrong ,on cache expires gets the old data
    self.leaguesCache.setOptions({
    onExpire: function (key,value) {
     getLeagues().then(function () {
       console.log("Leagues from cache automativcally refreshed",new Date())
     }, function () {
      console.log("Error getting data.putting expired items",new Date());
       self.leaguesCache.put(key,value);
     });
    }
    });


    self.leagueDataCache.setOptions({
      onExpire: function (key,value) {
        getLeagueData().then(function () {
          console.log("Leagues Data from cache automativcally refreshed",new Date())
        }, function () {
          console.log("Error getting data.putting expired items",new Date());
          self.leagueDataCache.put(key,value);
        });
      }
    });


    self.staticCache = DSCacheFactory.get("staticCache");

    function setLeagueId(leagueId){
      self.staticCache.put('currentLeagueId',leagueId);
    }

    function getLeagueId(){
      return self.staticCache.get('currentLeagueId')
    }

    function getLeagues() {
      var deferred= $q.defer();
      var  cacheKey="leagues";
      var leaguesData = self.leaguesCache.get(cacheKey);

      if(leaguesData)
      {
        console.log("Found data from cache",leaguesData);
        deferred.resolve(leaguesData);
      }
      else {
        //return leagues;
        $http.get("http://elite-schedule.net/api/leaguedata").success(function (data) {
          console.log("Recieved data via HTTP");
          self.leaguesCache.put(cacheKey,data);
          deferred.resolve(data);
          //callback(data);
        }).error(function (data) {
          console.log('!Oops Some  thing went wrong!');
          deferred.reject(data);
        });
      }
      return deferred.promise;

    };


    function getLeagueData(forceRefresh) {

      if(typeof forceRefresh === "undefined")
      {
        forceRefresh =false;
      }
      var deferred = $q.defer();
      var cacheKey="leagueData-"+ getLeagueId();
      var leagueData=null;

      if(!forceRefresh)
      {
        leagueData=self.leagueDataCache.get(cacheKey);
      };


     // $ionicLoading.show({template:'Loading....'});
      if(getLeagueId()!=undefined) {
        //return leagueData;

        if(leagueData)
        {
          console.log("foun data in cache");
          deferred.resolve(leagueData);
        }
        else {
          $http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId()).success(function (data, status) {
            console.log('recieved scedule dat via HTTP', data, status);
            self.leagueDataCache.put(cacheKey,data);
            // callback(data);
            //$ionicLoading.hide();
            deferred.resolve(data);
          }).error(function (data) {
            console.log('!Oops Some  thing went wrong!');
            //$ionicLoading.hide();
            deferred.reject(data);
          });

        }


        return deferred.promise;
      }
      else
      {
        deferred.reject();
        return deferred.promise;
      }

    };


    //function setLeagueId(leagueId){
    //  console.log("test",currentLeagueId);
    //  currentLeagueId=leagueId;
    //};

    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId:setLeagueId

    };
  };

})();
