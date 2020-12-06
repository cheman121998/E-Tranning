(function(){
    'use strick';
    angular.module('managedDevice')
    .controller('ManagedDeviceController', ['$scope', function($scope){
        $scope.url = './script/discovery/managedDevices/view/managedDevice.view.html';
        $scope.changeView = function(){
            $scope.url = '../../../script/discovery/managedDevices/action/managedDevice.action.html';
        }
    }])
})()
