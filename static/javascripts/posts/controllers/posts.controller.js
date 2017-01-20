(function() {
    'use strict';

    angular
        .module('thinkster.posts.controllers')
        .controller("PostsController", PostsController);

    PostsController.$inject = ['$scope'];

    function PostsController($scope) {
        var vm = this;

        vm.columns = [];

        activate();

        console.log('PostsController this, $scope', this, $scope);

        function activate() {
            $scope.$watchCollection(function() { return $scope.posts; }, render);
            $scope.$watch(function() { return $(window).width(); }, render)
        }

        function calculateNumberOfColumns() {
            var width = $(window).width();

            if (width >= 1200) {
                return 4;
            } else if (width >= 992) {
                return 3;
            } else if (width >= 768) {
                return 2;
            } else {
                return 1;
            }
        }

        function approximateShortestColumn() {
            var scores = vm.columns.map(columnsMapFn);

            return scores.indexOf(Math.min.apply(this, scores));

            function columnsMapFn(column) {
                var lengths = column.map(function(element) {
                    return element.content.length;
                });

                return lengths.reduce(sum, 0) * column.length;
            }

            function sum(m, n) {
                return m + n;
            }
        }

        function render(current, original) {
            console.log('PostsController#render');
            if (current !== original) {
                vm.columns = [];

                for(var i = 0; i < calculateNumberOfColumns(); i++) {
                    vm.columns.push([]);
                }

                for(var i = 0; i < current.length; i++) {
                    var column = approximateShortestColumn();

                    vm.columns[column].push(current[i]);
                }
            }
        }
    }
})();