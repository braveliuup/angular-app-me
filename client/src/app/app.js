angular.module('app', ['templates.app']);

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo:'/projectsinfo'});
}]);

angular.module('app').controller('AppCtrl', ['$scope', function($scope) {

}]);

angular.module('app').controller('HeaderCtrl', ['$scope', function($scope){
    $scope.home = function(){

    };
}]);