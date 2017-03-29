angular.module('app', [
    'ngRoute',
    'services.breadcrumbs',
    'templates.app']);

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo:'/projectsinfo'});
}]);

angular.module('app').controller('AppCtrl', ['$scope', function($scope) {

}]);

angular.module('app').controller('HeaderCtrl', ['$scope', '$location', '$route' ,  'breadcrumbs', 
    function($scope, $location, $route,  breadcrumbs) {
        $scope.location = $location;
        $scope.breadcrumbs = breadcrumbs;
        $scope.home = function(){
            // if (security.isAuthenticated()) {
            //     $location.path('/dashboard');
            // } else {
            //     $location.path('/projectsinfo');
            // }
        };
}]);