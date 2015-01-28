

angular.module('starter.controllers',[])


.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('mainController', function($scope, $http,$sce) {
 $scope.doSearch = function(){
	var url = 'http://gdata.youtube.com/feeds/api/videos?'
			+ ['q=' + encodeURIComponent($scope.query),
			'alt=json',
			'order=relevance',
			'max-results=20',
			'callback=JSON_CALLBACK'
			].join('&');
 
	$http.jsonp(url).success(function(data){
	$scope.results = data.feed.entry;
	angular.forEach(data.feed.entry, function(entry, i){
	var permalink=entry['id']['$t'];
	var id =permalink.match(/^.+\/(.+?)$/)[1];
	// var iframe = "<iframe width='300' height='200' src='https://www.youtube.com/embed/" + id+ "?rel=0&showinfo=0&autohide=1' frameborder='0' allowfullscreen></iframe>";
	var iframe = "<iframe width='300' height='200' src='https://www.youtube.com/embed/" + id+ "?rel=0&showinfo=0&autohide=1' ng-click='showInAppVideo('{{video.url}}', $event)'></iframe>";
	$scope.results[i].iframesrc = iframe;
	});
});
 
$scope.to_trusted = function(html_code){
// html_codeはsanitize済
return $sce.trustAsHtml(html_code);
}
};
})

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

 // Triggered on a button click, or some other target
 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="password" ng-model="data.wifi">',
     title: 'Enter Wi-Fi Password',
     subTitle: 'Please use normal things',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 3000);
  };
   // A confirm dialog
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'プレイリストへ追加',
       template: 'この曲を追加しますか？'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})


.controller('MainCtrl', function($scope) {
  $scope.code = 'Pj-TNdFBCq0';
})

.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
})

.controller('SearchCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('Top100Ctrl',  function($scope,$ionicPlatform, Music, $http, $ionicLoading, $cordovaDevice) {
	


	$ionicPlatform.ready(function() {
		// alert(11);
		alert($cordovaDevice.getUUID());
		
	})
	
	// $cordovaDevice.getUUID();
	
  var _this = this
  $ionicLoading.show({
    template: 'loading'
  })
  // $scope.music = Music.all();
      $http.get(api_url+'youtube_api/').
      success(function(data, status, headers, config) {
      	$ionicLoading.hide()
      	$scope.results = data
      }).
      	error(function(data, status, headers, config) {
      });            
})

.controller('Top100jpCtrl',  function($scope, Music, $http, $ionicLoading) {
  var _this = this
  $ionicLoading.show({
    template: 'loading'
  })	
  // $scope.music = Music.all();
      $http.get(api_url + 'youtube_api_jp/').
      success(function(data, status, headers, config) {
      	$ionicLoading.hide()
      	$scope.results = data
      }).
      	error(function(data, status, headers, config) {
      });            
})

.controller('Top100popCtrl',  function($scope, Music, $http, $ionicLoading) {
  var _this = this
  $ionicLoading.show({
    template: 'loading'
  })	
  // $scope.music = Music.all();
      $http.get(api_url + 'youtube_api_pop/').
      success(function(data, status, headers, config) {
      	$ionicLoading.hide()
      	$scope.results = data
      }).
      	error(function(data, status, headers, config) {
      });            
})

.controller('Top100DetailCtrl', function($scope, $stateParams, Music) {
  // $scope.m = Music.get($stateParams.id);
  $scope.url = "http://www.youtube.com/embed/jgBYxZ5k5QE";
})


.controller('YouTubeCtrl', function($scope, $sce) {
  $scope.trustSrc = function(src) {
  	// return $sce.trustAsResourceUrl('http://www.youtube.com/apiplayer?video_id=' + src +"&version=3");
  	return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + src +"?autoplay=1");
  	
  	
  }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})


.controller('MainCtrl', function($scope) {
  $scope.code = 'hfEf6NFS81E';
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


var User = App.factory("User",function($resource){
    var User = $resource('/api/user.json',{},{
       login:{method:"POST",isArray:true},
       logout:{method:"POST"}
    });
    return User;
    // use User in your controller or another service.
});
