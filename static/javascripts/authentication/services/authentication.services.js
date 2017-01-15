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
            register: register
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
            return $http.post('/api/v1/accounts', {
                email: email,
                username: username,
                password: password
            })
        }

    };
})();