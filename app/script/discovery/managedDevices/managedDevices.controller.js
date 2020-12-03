(function(){
    angular.module('managedDevice')
    .controller('ManagedDeviceController', ['$scope', function($scope){
        $scope.title = "Man"
        $scope.url = './script/discovery/managedDevices/view/managedDevice.view.html';
        $scope.changeView = function(){
            $scope.url = '../../../script/discovery/managedDevices/action/managedDevice.action.html';
        }
    }])
})()