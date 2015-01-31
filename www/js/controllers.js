

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
			'max-results=50',
			'callback=JSON_CALLBACK'
			].join('&');
 
	$http.jsonp(url).success(function(data){
	$scope.results = data.feed.entry;
	angular.forEach(data.feed.entry, function(entry, i){
	var permalink=entry['id']['$t'];
	var id =permalink.match(/^.+\/(.+?)$/)[1];
	// var iframe = "<iframe width='300' height='200' src='https://www.youtube.com/embed/" + id+ "?rel=0&showinfo=0&autohide=1' frameborder='0' allowfullscreen></iframe>";
	var iframe = "<iframe width='300' height='200' src='https://www.youtube.com/embed/" + id+ "?rel=0&showinfo=0&autohide=1' ng-click='showInAppVideo('{{video.url}}', $event)'></iframe>";
	// var iframe = "<iframe webkit-playsinline width='300' height='200' src='https://www.youtube.com/embed/" + id+ "?rel=0&showinfo=0&autohide=1&feature=player_detailpage&playsinline=1' ng-click='showInAppVideo('{{video.url}}', $event)'></iframe>";
	$scope.results[i].iframesrc = iframe;
	});
});
 
$scope.to_trusted = function(html_code){
// html_codeはsanitize済
return $sce.trustAsHtml(html_code);
}
};
})

// .controller('InviteCtrl',function($scope, $ionicPopup) {
.controller('InviteCtrl',function($scope,$state, $ionicPopup, $ionicPlatform, $timeout, $http, $ionicLoading, $cordovaDevice) {	
    $scope.inviteInput = function() {
    	// alert($scope.invite_code);
     var confirmPopup = $ionicPopup.confirm({
       title: '招待コード送信',
       template: $scope.invite_code + 'コードを送信しますか？'
     });
    confirmPopup.then(function(res) {
       if(res) {
			$ionicPlatform.ready(function() {
				// alert($scope.invite_code);
				try{
					var uuid = $cordovaDevice.getUUID();
				}catch(err){
					var uuid = uuid_temp;
				}
				$http.get(api_url+'youtube_api_invite/', { params: {
											 "uuid": uuid, 
											 "invite_code": $scope.invite_code 
											 } }).
				  success(function(data) {
					   var alertPopup = $ionicPopup.alert({
					     title: data.title,
					     template: data.detail
					   });
					   alertPopup.then(function(res) {
					     console.log('Thank you for not eating my delicious ice cream cone');
					   });
				  })
				  .error(function(error) {
				    $scope.data.error = error;
				  });
				$state.reload()
			})
       } else {
       }
     });
    };
})


.controller('PopupCtrl',function($scope,$state, $ionicPopup, $ionicPlatform, $timeout, $http, $ionicLoading, $cordovaDevice) {
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'プレイリストへ追加',
       template: $scope.video.title + ' 曲を追加しますか？'
     });
     confirmPopup.then(function(res) {
       if(res) {
			$ionicPlatform.ready(function() {
				
				try{
					var uuid = $cordovaDevice.getUUID();
				}catch(err){
					var uuid = uuid_temp;
				}
				$http.get(api_url+'youtube_api_add/', { params: {
											 "uuid": uuid, 
											 "song_title": $scope.video.title,
											 "song_name": $scope.video.name,
											 "videoId": $scope.video.videoId,
											 "userID": $scope.video.userID,
											 "url": $scope.video.url,
											 "thumbnail": $scope.video.thumbnail_url 
											 } }).
				  success(function(data) {
					   var alertPopup = $ionicPopup.alert({
					     title: data.title,
					     template: data.detail
					   });
					   alertPopup.then(function(res) {
					     console.log('Thank you for not eating my delicious ice cream cone');
					   });
				  })
				  .error(function(error) {
				    $scope.data.error = error;
				  });              
			})
       } else {
       }
     });
   };
   
   // Song delete
   $scope.showConfirmDelete = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: '曲削除',
       template: $scope.video.title + ' 曲を削除しますか？'
     });
     confirmPopup.then(function(res) {
       if(res) {
			$ionicPlatform.ready(function() {
				try{
					var uuid = $cordovaDevice.getUUID();
				}catch(err){
					var uuid = uuid_temp;
				}
				$http.get(api_url+'youtube_api_delete/', { params: {
											 "uuid": uuid, 
											 "song_title": $scope.video.title,
											 "song_name": $scope.video.name,
											 "videoId": $scope.video.videoId,
											 "userID": $scope.video.userID,
											 "url": $scope.video.url,
											 "thumbnail": $scope.video.thumbnail_url 
											 } }).
				  success(function(data) {
					   var alertPopup = $ionicPopup.alert({
					     title: data.title,
					     template: data.detail
					   });
					   alertPopup.then(function(res) {
					     console.log('Thank you for not eating my delicious ice cream cone');
					   });
				  })
				  .error(function(error) {
				    $scope.data.error = error;
				  });
					  $state.reload()
			})
       } else {
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

.controller('ListCtrl',  function($scope,$ionicPlatform, Music, $http, $ionicLoading, $cordovaDevice) {
  $ionicLoading.show({
    template: 'loading'
  })
	$ionicPlatform.ready(function() {
			try{
				var uuid = $cordovaDevice.getUUID();
			}catch(err){
				var uuid = uuid_temp;
			}
			$scope.data = {};
			$http.get(api_url+'youtube_api_list/', { params: {
										 "uuid": uuid
										 } }).
			  success(function(data) {
			    $scope.data.videos = data;
			    $ionicLoading.hide()
			  })
			  .error(function(error) {
			    $scope.data.error = error;
			  });              
	})
})

.controller('AccountCtrl', function($scope,$ionicPlatform, Music, $http, $ionicLoading, $cordovaDevice) {
$ionicLoading.show({
    template: 'loading'
  })
	$ionicPlatform.ready(function() {
			try{
				var uuid = $cordovaDevice.getUUID();
			}catch(err){
				var uuid = uuid_temp;
			}
			$scope.data = {};
			$http.get(api_url+'youtube_api_user/', { params: {
										 "uuid": uuid 
										 } }).
			  success(function(data) {
			    $scope.data = data;
			    $ionicLoading.hide()
			  })
			  .error(function(error) {
			    $scope.data.error = error;
			  });              
	})
})

// .controller('Top100Ctrl',  function($scope,$ionicPlatform, Music, $http, $ionicLoading, $cordovaDevice) {
.controller('Top100Ctrl',  function($scope,$ionicPlatform,$ionicPopup, $http, $ionicLoading, $cordovaDevice) {

  $ionicLoading.show({
    template: 'loading'
  })
	$ionicPlatform.ready(function() {
		// try{
			try{
				var uuid = $cordovaDevice.getUUID();
				var device_model = $cordovaDevice.getModel();
				var device_platform = $cordovaDevice.getPlatform();
			}catch(err){
				var uuid = uuid_temp;
				var device_model = "device_model";
				var device_platform = "device_platform";
			}
			$scope.data = {};
			$http.get(api_url+'youtube_api/', { params: {
										 "uuid": uuid, 
										 "device_model": device_model,
										 "device_platform": device_platform,
										 "device_app_version": "1.0.1" } }).
			  success(function(data) {
			  	// alert(data.toSource());
			    $scope.data.videos = data;
			    $ionicLoading.hide()
			    
			    
			    $http.get(api_url+'youtube_api_notification/', { params: {"uuid": uuid}}).
			    success(function(data) {
			    	if (data.flag == 1) {
					   var alertPopup = $ionicPopup.alert({
					     title: data.title,
					     template: data.detail
					   });
			    	}
			    });
			    
			    
			    
			    
			  })
			  .error(function(error) {
			    $scope.data.error = error;
			  });              
		// }catch(err){			
		// }
	})
})


.controller('Top100jpCtrl',  function($scope, $ionicPlatform, Music, $http, $ionicLoading, $cordovaDevice) {
	  $ionicLoading.show({
	    template: 'loading'
	  })	

	$scope.data = {};
	$http.get(api_url+'youtube_api_jp/', { params: { "key1": "jp", "key2": "jp" } }).
	  success(function(data) {
	    $scope.data.videos = data;
	    $ionicLoading.hide()
	  })
	  .error(function(error) {
	    $scope.data.error = error;
	  }); 
})

.controller('Top100popCtrl',  function($scope, $ionicPlatform, Music, $http, $ionicLoading, $cordovaDevice) {
  var _this = this
  $ionicLoading.show({
    template: 'loading'
  })	
	$scope.data = {};
	$http.get(api_url+'youtube_api_pop/', { params: { "key1": "pop", "key2": "pop" } }).
	  success(function(data) {
	  	// alert(data.toSource());
	    $scope.data.videos = data;
	    $ionicLoading.hide()
	  })
	  .error(function(error) {
	    $scope.data.error = error;
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

var User = App.factory("User",function($resource){
    var User = $resource('/api/user.json',{},{
       login:{method:"POST",isArray:true},
       logout:{method:"POST"}
    });
    return User;
    // use User in your controller or another service.
});
