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
.controller('AppCtrl', function($scope, $ionicPopover, $http, $interval) {

    $ionicPopover.fromTemplateUrl('template/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });
    
    $scope.pub=[
        
    ];
    
    //$scope.identifiant = localStorage.getItem('identifiant');
    
    var affichePublications=function(){
    
    $http.post("http://api.chessfamily.net/api/query",
            {
                    authentication:"chessfemily",
					action:"member_publications",
					member_id:4,
					perpage:10,
					page:1
            }
        ).success(function(response){ 
            
            if($scope.pub.length < response.nb_total){
                 console.log("test ",response.nb_total);
                 $scope.pub = [];
                   for(var i=$scope.pub.length;i<(response.nb_total);i++){
                      $scope.pub.push({id:response.publications[i].id,date:response.publications[i].date}); 
                    }
            }else if($scope.pub.length>response.nb_total){
                console.log("test1 ",response.nb_total);
                $scope.pub = [];
                for(var i=$scope.pub.length;i<(response.nb_total);i++){
                    $scope.pub.push({id:response.publications[i].id,date:response.publications[i].date});  
                   
                } 
            }
         })
         .error(function(response){
            console.log(response);
         });
        
        
    }
    affichePublications();
    setInterval(affichePublications,2000);
    
    
    
    
    $scope.loginparams={};//Modification par hosni

    $scope.memberConnect = function() {


        $http.post("http://api.chessfamily.net/api/query",{
            authentication:'chessfemily',
            action:'member_connect',
            email: $scope.loginparams.email, //Modification par hosni
            password: $scope.loginparams.password //Modification par hosni

        },{

        })
        .success(function(response) {
            localStorage.setItem("identifiant", response.member.id);
        })
        .error(function(response){
            console.log(response);
        });
 
    };
    
    
    
    
    
    $scope.registerparams={};
    $scope.memberAdd = function(){
        
        $http.post("http://api.chessfamily.net/api/query",
            {
                    authentication:"chessfemily",
					action:"member_add",
					name:$scope.registerparams.name,
					email:$scope.registerparams.email,
					password:$scope.registerparams.password,
					birthday:$scope.registerparams.birthday,
					gender:$scope.registerparams.gender
            }
        )
        .success(function(response) {
            console.log(response);
        })
        .error(function(response){
            console.log(response);
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
