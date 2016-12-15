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
        self.webinar.dateFormated =  moment(self.webinar.date, 'YYYYMMDDHHmm').local().format("LLL");
    }, function errorCallback(response) {
        console.log("Something went wrong:");
        self.error = true;
    });
}]);

