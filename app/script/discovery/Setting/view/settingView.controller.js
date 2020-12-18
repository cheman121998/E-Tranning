(function(){
    angular.module("setting").controller("SettingViewController", ['$scope', '$http', function ($scope, $http) {
        $scope.pollingInterval = function(){
            $http
            .get("/api/time-interval")
            .then(function successCallback(response) {
                $scope.pollingInterval = response.data;
            },
            function errorCallback(response) {
                console.log(response);
            })
            .finally(function () {
                //request DONE
            });
        }        
        $scope.pollingInterval();
        $scope.isVisibleSetting = true;

        $scope.updatePollingInterval = function(){
            $scope.updateData = {
                curentPolling = $scope.pollingInterval;
            };
            $http 
            .post("/api/time-interval", $scope.updateData) 
            .then(
                function successCallback(response) {
                    $scope.pollingInterval = response.data;
                },
                function errorCallback(response) {
                    console.log(response);
                }
            )
            .finally(function () {
                //request DONE
                $scope.listDevice();
            });

        }
        
    }])
})()