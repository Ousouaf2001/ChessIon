// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app=angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
      
  });
})
.controller('AppCtrl', function($scope, $ionicPopover, $http) {

    $ionicPopover.fromTemplateUrl('template/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });
    
    $scope.memberConnect = function() {
        
        $http.post("http://api.chessfamily.net/api/query",{
            authentication:'chessfemily',
            action:'member_connect',
            email: $scope.email,
            password: $scope.password
        })
        .success(function(response) {
            console.log(response.data);
        })
        .error(function(response){
            console.log(response);
        });
 
    };
    
    $scope.memberAdd = function(){
        
        url ="http://api.chessfamily.net/api/query";
        $http.post(url,
            {
                    authentication:"chessfamily",
					action:"member_add",
					name:name,
					last_name:$scope.last_name,
					email:$scope.email,
					password:$scope.password,
					birthday:$scope.birthday,
					genre:$scope.genre
            }
        )
        .success(function(data, status, headers, config){
            
            console.log(data);
            
            //$ionicLoading.hide();
            //console.log(response.data);
         })
         .error(function(data, status){
            console.log(status);
         });
        
        
    };
    
    

});

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state("login", {
        url:"/login",
        templateUrl:"template/login.html"
    });
    $stateProvider.state("register", {
        url:"/register",
        templateUrl:"template/register.html"
    });
    
    $stateProvider.state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'template/menu.html'
    });
    
    $stateProvider.state('menu.profile', {
      url: '/profile',
      views: {
        'side-menu21': {
          templateUrl: 'template/profile.html'
        }
      }
    });
    $stateProvider.state('menu.geo', {
      url: '/geo',
      views: {
        'side-menu21': {
          templateUrl: 'template/geo.html'
        }
      }
    });
    $stateProvider.state('menu.notification', {
      url: '/notification',
      views: {
        'side-menu21': {
          templateUrl: 'template/notification.html'
        }
      }
    });
    $stateProvider.state('menu.publication', {
      url: '/publication',
      views: {
        'side-menu21': {
          templateUrl: 'template/publication.html'
        }
      }
    });
    $stateProvider.state('menu.meetingPlace', {
      url: '/meetingPlace',
      views: {
        'side-menu21': {
          templateUrl: 'template/meetingPlace.html'
        }
      }
    });
    $stateProvider.state('menu.event', {
      url: '/event',
      views: {
        'side-menu21': {
          templateUrl: 'template/event.html'
        }
      }
    });
    $stateProvider.state('menu.privacy', {
      url: '/privacy',
      views: {
        'side-menu21': {
          templateUrl: 'template/privacy.html'
        }
      }
    });
    $stateProvider.state('menu.myfriends', {
      url: '/myfriends',
      views: {
        'side-menu21': {
          templateUrl: 'template/myFriends.html'
        }
      }
    });
    
    $stateProvider.state('menu.myfavorite', {
      url: '/myFavorite',
      views: {
        'side-menu21': {
          templateUrl: 'template/myFavorite.html'
        }
      }
    });
    
    $stateProvider.state('menu.faq', {
      url: '/faq',
      views: {
        'side-menu21': {
          templateUrl: 'template/faq.html'
        }
      }
    });
    
    $stateProvider.state('menu.setting', {
      url: '/setting',
      views: {
        'side-menu21': {
          templateUrl: 'template/setting.html'
        }
      }
    });
    
    $stateProvider.state('menu.rechercheMembers', {
      url: '/rechercheMembers',
      views: {
        'side-menu21': {
          templateUrl: 'template/rechercheMembers.html'
        }
      }
    });
    
    $stateProvider.state('menu.rechercheEvents', {
      url: '/rechercheEvents',
      views: {
        'side-menu21': {
          templateUrl: 'template/rechercheEvents.html'
        }
      }
    });
    
    $stateProvider.state('menu.recherchePlaces', {
      url: '/recherchePlaces',
      views: {
        'side-menu21': {
          templateUrl: 'template/recherchePLaces.html'
        }
      }
    });
    
    $stateProvider.state('menu.placeDescription', {
      url: '/placeDescription',
      views: {
        'side-menu21': {
          templateUrl: 'template/placeDescription.html'
        }
      }
    });
    
    $urlRouterProvider.otherwise("login");
});
