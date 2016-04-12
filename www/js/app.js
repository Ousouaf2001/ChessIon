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
.controller('AppCtrl', function($scope, $ionicPopover, $http, $ionicModal,$state,$ionicPopup) {

   
    
    // modals
    $ionicModal.fromTemplateUrl('template/modalactivity.html', function(modal){
      $scope.activity = modal;
    }, {
      scope:$scope,
      animation:'slide-in-up',
    });
    
    $ionicModal.fromTemplateUrl('template/modalfriend.html', function(modal){
      $scope.friend = modal;
    }, {
      scope:$scope,
      animation:'slide-in-up',
    });
    
    $scope.openactivity = function(){
        $scope.activity.show();   
    };
    
    $scope.closeactivity = function(){
        $scope.activity.hide();   
    };
    
    $scope.openfriend = function(){
        $scope.friend.show();   
    };
    
    $scope.closefriend = function(){
        $scope.friend.hide();   
    };
    
    $ionicPopover.fromTemplateUrl('template/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });
    

    // member connect
    $scope.loginparams={};
    $scope.memberConnect = function() {
        $http.post("http://api.chessfamily.net/api/query",{
            authentication:'chessfemily',
            action:'member_connect',
            email: $scope.loginparams.email,
            password: $scope.loginparams.password

        },{

        })
        .success(function(response) {
            if(response.success == 1){
                localStorage.setItem('identifiant',response.member.id);
                $state.go('menu.profile');
            }else{
              var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
              });
            }
            
        })
        .error(function(response){
            console.log(response);
        });
 
    };
    

    // member register
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
    
    // publication list angularJs
    $scope.pub=[
        
    ];
    
    
    //publication show
    var affichePublications=function(){
    $scope.identifiant = localStorage.getItem('identifiant');
    $http.post("http://api.chessfamily.net/api/query",
            {
          authentication:"chessfemily",
          action:"member_publications",
          member_id:$scope.identifiant,
          perpage:10,
          page:1
            }
        ).success(function(response){ 
            

            
            if($scope.pub.length < response.nb_total){
                 $scope.pub = [];
                   for(var i=$scope.pub.length;i<(response.nb_total);i++){
                      $scope.pub.push({
                                      id:response.publications[i].id,
                                      date:response.publications[i].date,
                                      texte:response.publications[i].formatted_text,
                                    }); 
                      
                    }
            }else if($scope.pub.length>response.nb_total){
                $scope.pub = [];
                for(var i=$scope.pub.length;i<(response.nb_total);i++){
                    $scope.pub.push({
                                    id:response.publications[i].id,
                                    date:response.publications[i].date,
                                    texte:response.publications[i].formatted_text
                                  });  
                   
                } 
            }
         })
         .error(function(response){
            console.log(response);
         });
        
        
    }
    affichePublications();
    setInterval(affichePublications,2000);


    // delete publication
    $scope.deletePublication = function(id){
        $http.post("http://api.chessfamily.net/api/query",
            {
              authentication:"chessfemily",
              action:"member_publication_delete",
              member_id:localStorage.getItem('identifiant'),
              publication_id:id
            }
        )
        .success(function(response) {
            console.log(response);
        })
        .error(function(response){
            console.log(response);
        });
    };


    // notification list
    $scope.notif=[
        
    ];

    //notification show
    var afficheNotification=function(){
    $scope.identifiant = localStorage.getItem('identifiant');
    $http.post("http://api.chessfamily.net/api/query",
            {
          authentication:"chessfemily",
          action:"notifications",
          member_id:$scope.identifiant,
          perpage:10,
          page:1
            }
        ).success(function(response){ 
            

            
            if($scope.notif.length < response.nb_total){
                 $scope.notif = [];
                   for(var i=$scope.notif.length;i<(response.nb_total);i++){
                      $scope.notif.push({
                                      name:response.notifications[i].sender_name,
                                      lastname:response.notifications[i].sender_last_name,
                                      date:response.notifications[i].date,
                                      texte:response.notifications[i].message,
                                      image:response.notifications[i].sender_photo
                                    }); 
                      
                    }
            }else if($scope.notif.length>response.nb_total){
                $scope.notif = [];
                for(var i=$scope.notif.length;i<(response.nb_total);i++){
                    $scope.notif.push({
                                    name:response.notifications[i].sender_name,
                                      lastname:response.notifications[i].sender_last_name,
                                      date:response.notifications[i].date,
                                      texte:response.notifications[i].message,
                                      image:response.notifications[i].sender_photo
                                  });  
                   
                } 
            }
         })
         .error(function(response){
            console.log(response);
         });
        
        
    }
    afficheNotification();
    setInterval(afficheNotification,2000);


    // notification list
    $scope.meet=[
        
    ];
   
    //notification show
    var afficheMeetingPlace=function(){
    $scope.identifiant = localStorage.getItem('identifiant');
    $http.post("http://api.chessfamily.net/api/query",
            {
          authentication:"chessfemily",
          action:"member_meeting_places",
          member_id:$scope.identifiant,
          perpage:20,
          page:1
            }
        ).success(function(response){ 
            

            
            if($scope.meet.length < response.nb_total){
                 
                   for(var i=$scope.meet.length;i<(response.nb_total);i++){
                      $scope.meet.push({
                                      name:response.meeting_places[i].name,
                                      adresse:response.meeting_places[i].adress,
                                      image:response.meeting_places[i].type_image
                                    }); 
                      
                    }
            }else if($scope.meet.length>response.nb_total){
                
                for(var i=$scope.meet.length;i<(response.nb_total);i++){
                    $scope.meet.push({
                                      name:response.meeting_places[i].name,
                                      adresse:response.meeting_places[i].adress,
                                      image:response.meeting_places[i].type_image
                                  });  
                   
                } 
            }
         })
         .error(function(response){
            console.log(response);
         });
        
        
    }
    affichePublications();
    setInterval(afficheMeetingPlace,4000);

    // delete meeting place
    $scope.deleteMeeting = function(id){
        $http.post("http://api.chessfamily.net/api/query",
            {
              authentication:"chessfemily",
              action:"meeting_place_delete",
              member_id:localStorage.getItem('identifiant'),
              meeting_place_id:id
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


    






// routers
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
          templateUrl: 'template/myfriends.html'
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
          templateUrl: 'template/recherchePlaces.html'
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
    
    $stateProvider.state('menu.eventDescription', {
      url: '/eventDescription',
      views: {
        'side-menu21': {
          templateUrl: 'template/eventDescription.html'
        }
      }
    });
    
    $stateProvider.state('menu.memberProfile', {
      url: '/memberProfile',
      views: {
        'side-menu21': {
          templateUrl: 'template/memberProfile.html'
        }
      }
    });
    
    $stateProvider.state('menu.message', {
      url: '/message',
      views: {
        'side-menu21': {
          templateUrl: 'template/message.html'
        }
      }
    });
    
    $urlRouterProvider.otherwise("login");
});
