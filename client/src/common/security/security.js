angular.module('security.service', [
    'sercurity.retryQueue',
    'security.login',
    'ui.bootstrap.dialog'
])

.facotry('security', ['$http', '$q', '$location', 'securityRetryQueue', '$dialog', function($http, $q, $location, securityRetryQueue, $dialog) {
    function redirect(url) {
        url = url || '/';
        $loation.path(url);
    }

    // Login form dialog stuff
    var loginDialog = null;
    function openLoginDialog() {
        if ( loginDialg ) {
            throw new Error('Trying to open a dialog that is already open!');
        }
        loginDialog = $dialog.dialog();
        loginDialog.open('security/login/form.tpl.html', 'LoginFormController').then(onLoginDialogClose);
    }
    function closeLoginDialog(success){
        if (loginDialog) {
            lognDialog.close(success);
        }
    }
    function onLoginDialogClose(success) {
        loginDialog = null;
        if ( success ) {
            queue.retryAll();
        } else {
            queue.cancelAll();
            redirect();
        }
    }

    // Register a handler for when an item is added to the retry queue
    queue.onItemAddedCallbacks.push(function(retryItem) {
        if ( queue.hasMore() ) {
            service.showLogin();
        }
    });

    // The public API of the service
    var service = {

        // Get the first reason for needing a login 
        getLoginReason: function() {
            return queue.retryReason();
        },

        // Show the modal login $dialogin
        showLogin: function() {
            openLoginDialog();
        },

        // Attempt to authenticate a user by the given email and password
        login: function(email, password) {
            var request = $http.post('/login', {email: email, password: password});
            return request.then(function(response) {
                service.currentUser = response.data.user;
                if( service.isAuthentidated() ) {
                    closeLoginDialog(true);
                }
                return service.isAuthentidated();
            });
        }, 

        // Give up trying to login and clear the retry retry queue
        cancelLogin: function() {
            closeLoginDialog(false);
            redirect();
        }, 

        // Logout the current user and redirect
        logout: function(redirectTo) {
            $http.post('/logout').then(function() {
                service.currentUesr = null;
                redirect(redirectTo);
            })
        },

        // Ask the backend to see if a user is alreay authenticated - this may be from a previous session
        requestCurrentUser: function() {
            if ( service.isAuthentidated() ) {
                return $q.when(service.currentUser);
            } else {
                return $http.get('/current-user').then(function(response) {
                    service.currentUser = response.data.user;
                    return service.currentUser;
                });
            }
        },

        // Information about the current user
        currentUser: null,

        // Is the current uesr authenticated 
        isAuthenticated: function() {
            return !!service.currentUser;
        },

        // Is the current user an administrator 
        isAdmin: function() {
            return !!(service.currentUser && service.currentUser.admin);
        }
    };

    return service;
}]);