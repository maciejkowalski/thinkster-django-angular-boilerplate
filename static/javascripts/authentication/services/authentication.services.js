/**
 * Authentication
 * @namespace thinkster.authentication.services
 */
(function() {
    'use strict';

    angular
        .module('thinkster.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    /**
     * @namespace Authentication
     * @returns {Factory}
     */

    function Authentication($cookies, $http) {
        /**
         * @name Authentication
         * @returns {Factory}
         */
        var Authentication = {
            register: register,
            login: login,
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };

        return Authentication;

        /**
         * @name login
         * @desc Try to login user with email and password
         * @param {string} email The email entered by user
         * @param {string} password The password entered by user
         * @returns {HttpPromise}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email,
                password: password
            }).then(loginSuccessFn, loginErrorFn);

            /**
             * @name loginSuccessFn
             * @desc Set the authenticated account and redirect with refresh to home page
             */
            function loginSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount(data.data);

                window.location = '/';
            };

            /**
             * @name loginErrorFn
             * @desc print Login failed
             */
            function loginErrorFn(data, status, headers, config) {
                console.error('Login failed!')
            };
        };

        /**
         * @name register
         * @desc Try to register a new user
         * @param {string} username The username entered by user
         * @param {string} password The password entered by user
         * @param {string} email The email entered by user
         * @returns {HttpPromise}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function register(email, password, username) {
            return $http.post('/api/v1/accounts/', {
                email: email,
                username: username,
                password: password
            }).then(registerSuccessFn, registerErrorFn);

            /**
             * @name registerSuccessFn
             * @desc Log the new user in
             */
            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(email, password);
            };

            /**
             * @name registerErrorFn
             * @desc console error msg that signup failed
             */

            function registerErrorFn(data, status, headers, config) {
                console.error("User signup failed!");
            };
        }

        /**
         * @name getAuthenticatedAccount
         * @desc Returns the currently authenticated account
         * @returns {object|undefined} Account if authenticated, else `undefined`
         * @memberOf thinkster.authentication.services.Authentication
         */
        function getAuthenticatedAccount() {
            var accountJSON = $cookies.authenticatedAccount;

            if (!accountJSON) {
                return;
            }

            return JSON.parse(accountJSON);
        };

        /**
         * @name isAuthenticated
         * @desc Check if the current user is authenticated
         * @returns {boolean} true if authenticated, else false
         * @memberOf thinkster.authenticated.services.Authentication
         */
        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        /**
         * @name setAuthenticatedAccount
         * @desc Stringify the account object and store it in cookies
         * @param {Object} user The account to be stored
         * @returns {undefined}
         * @memberOf thinkster.authenticated.services.Authentication
         */
        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        /**
         * @name unauthenticate
         * @desc Delete stringified account object from cookies
         * @returns {undefined}
         * @memberOf thinkster.authenticated.services.Authentication
         */
        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }


    };
})();