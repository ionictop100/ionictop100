// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
  .constant('dataUrl', 'data/mostviewed_videos.json')
  .controller('videoListCtrl', ['$scope', '$http', 'dataUrl', function($scope, $http, dataUrl) {

    $scope.data = {};

    $http.get(dataUrl)
      .success(function(data) {
        $scope.data.videos = data;
      })
      .error(function(error) {
        $scope.data.error = error;
      });

      $scope.showInAppVideo = function(url, $event) {

        if ($event.preventDefault) {
          $event.preventDefault();
        }

        var ref = window.open(url, '_blank', 'location=yes');
      };

      $scope.getDuration = function(sec) {

        var s = sec % 60 < 10 ? "0" + ( sec % 60 ) : sec % 60;
        var m = Math.floor(sec/60); 

        return "" + m + ":" + s;
      };

  }])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      // if(window.cordova && window.cordova.plugins.Keyboard) {
      //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
