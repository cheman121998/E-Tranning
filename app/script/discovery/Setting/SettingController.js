(function(){
    'use strict';
    angular.module('setting')
    .controller('SettingController', ['$scope', function($scope){      
        $scope.url = '../../../script/discovery/setting/view/setting.view.html';
        $scope.changeView = function(){
            $scope.url = '../../../script/discovery/setting/action/setting.action.html';
        }
    }])
})()
