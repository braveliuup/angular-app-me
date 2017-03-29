angular.module('security.authorization', ['security.service'])

.provider('securityAuthorization', {

    requireAdminUser: ['securityAuthorization', function(securityAuthorization) {
        return securityAuthorization.requireAdminUser();
    }],

    requierAuthenticateUser: ['securityAuthorization', function(securityAuthorization) {
        return securityAuthorization.requireAuthenticatedUser();
    }],

    $get: ['security', 'securityRetryQueue', function(security, queue) {
        var service = {

            // Require that there is an authenticated requireAdminUser
            // ( use this in a route resolve to prevent non-authentiated users from entering that route)
            requireAuthenticatedUser: function() {
                var promise = security.requestCurrentUser().then(function(userInfo) {
                    if ( !security.isAuthenticated() ){
                        return queue.pushRetryFn('unauthenticated-client', service.requireAuthenticatedUser);
                    }
                });
                return promise;
            },

            requierAdminUser: function() {
                var promise = security.requestCurrentuser().then(function(userInfo) {
                    if( !security.isAdmin() ){
                        return queue.pushRetryFn('unauthorized-cilent', service.requireAdminUser);
                    }
                }); 
                return promise;
            }
        };

        return service;
    }]
});