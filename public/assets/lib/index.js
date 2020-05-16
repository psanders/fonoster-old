angular.module('FIndex', ['ngRoute', 'base64']);

// MDL and Angular integration
angular.module('FIndex').run(function ($rootScope,$timeout) {
    $rootScope.$on('$viewContentLoaded', ()=> {
        $timeout(() => {
            componentHandler.upgradeAllRegistered();
        })
    })
});

angular.module('FIndex').controller('IndexCtrl', ['$scope', '$window', '$location', '$http', '$base64',
    function ($scope, $window, $location, $http, $base64) {
    var self = this;

    self.goDown = function() {
        var content = $('.mdl-layout__content');
        content.stop().animate({ scrollTop: 430 }, "slow");
    }

    self.isHome = function() {
        if ($location.path() === '/') return true;
        return false;
    }
}]);

// Horrible idea :s
angular.module('FIndex').controller('ContactCtrl', ['$scope', '$http', '$base64',
    function ($scope, $http, $base64) {
    var self = this;
    $scope.sent = false;

    $scope.contactTeam = function() {
        var url = "https://api.mailgun.net/v3/fonoster.com/messages";
        var dataJSON = {
            from: "postmaster@fonoster.com",
            to: "fonosterteam@fonoster.com",
            subject: "Sales contact?",
            text: JSON.stringify($scope.contactForm),
            multipart: true
        }

        var req = {
            method : 'POST',
            url: url,
            headers : {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + $base64.encode('api:key-6b882d7dab7126118ac4456330a2dd75')
            },
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: dataJSON
        }
        $http(req).then(function(data){
            console.log(data);
        }, function(data){
            console.log(data);
        })

        $scope.sent = true;
    }
}]);

angular.module('FIndex').config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'landingpage.tpl.html'
    }).
    when('/about', {
        templateUrl: 'about.tpl.html'
    }).
    when('/contact', {
        templateUrl: 'contact.tpl.html',
        controller: 'ContactCtrl'
    }).
    when('/terms', {
        templateUrl: 'terms.tpl.html'
    }).
    when('/privacy', {
        templateUrl: 'privacy.tpl.html'
    }).
    when('/pricing', {
        templateUrl: 'pricing.tpl.html'
    }).
    otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
}]);