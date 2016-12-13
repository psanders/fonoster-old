angular.module('WebinarMod', ['ngRoute', 'base64']);

angular.module('WebinarMod').config(['$locationProvider',
    function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);

// MDL and Angular integration
angular.module('WebinarMod').run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', ()=> {
        $timeout(() => {
            componentHandler.upgradeAllRegistered();
        })
    })
});

angular.module('WebinarMod').controller('IndexCtrl', ['$scope', '$http', '$location', '$base64',
    function ($scope, $http, $location, $base64) {
    var self = this;
    self.error = false;
    self.sent = false;

    var wid = $location.search().wid;

    if (wid === undefined) {
        self.error = true;
    }

    $http({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/fonoster/webinars/master/' + wid + '.json'
    }).then(function successCallback(response) {
        self.webinar = response.data;
    }, function errorCallback(response) {
        console.log("Something went wrong:");
        self.error = true;
    });

    self.signup = function(subscriber) {
        console.log(subscriber);
        var url = "https://api.mailgun.net/v3/fonoster.com/messages";
        var dataJSON = {
            from: "postmaster@fonoster.com",
            to: "fonosterteam@fonoster.com",
            subject: "Registration to webinar: " + self.webinar.title,
            text: JSON.stringify(subscriber),
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

        self.sent = true;
    }
document.onready = function () {
  document.querySelectorAll("input[data-required]").forEach(function (e) {
     e.required = true;
  });
};
    // This is a workaround to avoid MDL validation onload
    MaterialTextfield.prototype.checkValidity = function () {
        if (this.input_.validity.valid) {
            this.element_.classList.remove(this.CssClasses_.IS_INVALID);
        } else {
            if (this.element_.getElementsByTagName('input')[0].value.length > 0) {
                  this.element_.classList.add(this.CssClasses_.IS_INVALID);
            }
        }
    };

}]);

