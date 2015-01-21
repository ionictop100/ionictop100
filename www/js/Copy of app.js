// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

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
    })
  })




.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })



  .state('tab.top100', {
    url: '/top100',
    views: {
      'tab-top100': {
        templateUrl: 'templates/tab-top100.html',
        controller: 'Top100Ctrl'
      }
    }
  })

    .state('tab.top100-detail', {
      url: '/top100/:id',
      views: {
        'tab-top100': {
          templateUrl: 'templates/top100-detail.html',
          controller: 'Top100DetailCtrl'
        }
      }
    })



  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })



  .state('tab.test', {
      url: '/test',
      views: {
        'tab-test': {
          templateUrl: 'templates/tab-test.html',
          controller: 'TestCtrl'
        }
      }
    })



  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
