(function() {
    'use strict';

    angular
        .module('thinkster.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication'];

    /**
     * @namespace LoginController
     * @param $location
     * @param $scope
     * @param Authentication
     */
    function LoginController($location, $scope, Authentication) {
        var vm = this;

        vm.login = login;

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when controller is initialized.
         * @memberOf thinkster.authentication.controllers.LoginController
         */
        function activate() {
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
        }

        /**
         * @name login
         * @desc Log the user in
         * @memberOf thinkster.authentication.controllers.LoginController
         */
        function login() {
            Authentication.login(vm.email, vm.password);
        }
    };
})();