(function(){
    'use strict';
    angular.module('app')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.
        when('/managed-device', {
          templateUrl: './script/discovery/managedDevices/managedDevice.main.html',
          controller: 'ManagedDeviceController'
        }).
        when('/setting', {
          templateUrl: './script/discovery/setting/setting.main.html',
          controller: "SettingController"
        }).
        otherwise('/managed-device');
    }])
})()
