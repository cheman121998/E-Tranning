(function(){
    angular.module("setting").controller("SettingViewController", ['$scope', '$http', function ($scope, $http) {
        $scope.pollingInterval = function(){
            $http
            .get("/api/time-interval")
            .then(function successCallback(response) {
                $scope.pollingInterval = parseInt(response.data);
                $scope.backupPollingInterval = response.data;
            },
            function errorCallback(response) {
                console.log(response);
            })
            .finally(function () {
                //request DONE
            });
        }        
        $scope.pollingInterval();
        //Show button disabled 
        $scope.changePollingInterval = function () {
            return  $scope.pollingInterval ===  $scope.backupPollingInterval;           
        };
        console.log("=====Change Polling Interval=====", $scope.changePollingInterval);

        // Button save the setting polling interval
        $scope.isSaved = false;  

        // Save polling interval
        $scope.savePollingInterval = function(){
            $scope.isSaved = false;
       
            $http
            .post("/api/time-interval?time=" + $scope.pollingInterval)
            .then(
                function successCallback(response) {
                    $scope.deviceList = response.data;
                },
                function errorCallback(response) {
                    console.log(response);
                }
            )
            .finally(function () {                
            });
        };
        // Revert value Pollinginterval       
        $scope.revertPollingInterval = function(){
            $scope.pollingInterval = $scope.backupPollingInterval;
        }
    }])
})()
