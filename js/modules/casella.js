application.directive('casellaGrid', function () {
    return {
        restrict: 'E',
        templateUrl: '/js/modules/casellaGrid.html',
        scope: {
            rowsNum : '@',
            colsNum : '@',
            play: "=",
            playerSign :'=',
            sign : '=',
            casellaAttuale : "="
        },
        controller: ['$scope', function ($scope){
            $scope.rows = creaArray($scope.rowsNum);
            $scope.cols = creaArray($scope.colsNum);

            function creaArray(n){
                var a = [];
                for (var i = 0; i < n; i++){
                    a.push(i);
                }
                return a;
            }

            if(angular.isDefined($scope.sign)){
                $scope.sign = getSign;
            }

            $scope.conquistaCasella = function(row, col){
                if ($scope.play){
                    var signObj = setSign(row, col);
                    if (!signObj.alreadySigned){
                        $scope.casellaAttuale = signObj.posizioneCasella;
                    }
                }
            };

            $scope.$watch('play', function(newVal, oldVal){
                if (newVal == true && oldVal == false){
                    $scope.$broadcast('reset');
                }
            });

            function setSign (row, col){
                var position = row + '_' + col;
                var event = $scope.$broadcast(position, {setCasella :true});
                return {
                    alreadySigned : event.casellaSigned,
                    posizioneCasella : position
                };
            }

            function getSign (row, col){
                var position = row + '_' + col;
                var event = $scope.$broadcast(position);
                return event.casellaSign;
            }


        }]
    }
});


application.directive('casella', function () {
    return {
        restrict: 'E',
        templateUrl: '/js/modules/casella.html',
        scope: {
            playerSign :'=',
            position: '@'
        },
        controller: ['$scope', function ($scope){

            $scope.$on('reset', function() {
                $scope.casellaSign = undefined;
            });

            $scope.$on($scope.position, function(event, args) {
                event.casellaSigned = checkCasella();
                if (angular.isDefined(args) && !!args.setCasella){
                    contrassegnaCasella();
                }
                event.casellaSign = getCasellaSign();
            });

            function contrassegnaCasella() {
                if (angular.isUndefined($scope.casellaSign)){
                    $scope.casellaSign = $scope.playerSign;
                }
            }

            function checkCasella() {
                return angular.isDefined($scope.casellaSign);
            }

            function getCasellaSign() {
                return $scope.casellaSign;
            }

        }]
    }
});