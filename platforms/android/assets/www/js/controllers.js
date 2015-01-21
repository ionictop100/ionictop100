
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

.controller('TestCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})
.controller('Top100Ctrl',  function($scope, Music, $http, $ionicLoading) {
  var _this = this
  $ionicLoading.show({
    template: 'loading'
  })
  $scope.music = Music.all();
      $http.get("http://dev.followkr.com/survey/youtube_api/").
      // $http.get("http://127.0.0.1:8060/survey/youtube_api/").
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
      $http.get("http://dev.followkr.com/survey/youtube_api_jp/").
      // $http.get("http://127.0.0.1:8060/survey/youtube_api_jp/").
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
      $http.get("http://dev.followkr.com/survey/youtube_api_pop/").
      // $http.get("http://127.0.0.1:8060/survey/youtube_api_pop/").
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
