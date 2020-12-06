(function(){
    console.log('test again')
    angular.module('managedDevice')
    .controller('ManagedDeviceController', ['$scope', function($scope){
        $scope.manman = "Man";
        $scope.deviceList = [
            {
                name: "ManMan",
                address: "Hue",
                macAddress: "HUE",
                status: "Up",
                type: "12332311",
                version: "3.8403.342"
            },
            {
                name: "Hello",
                address: "Hue",
                macAddress: "HUE",
                status: "Up",
                type: "12332311",
                version: "3.8403.342"
            },
            {
                name: "Angular",
                address: "Hue",
                macAddress: "HUE",
                status: "Up",
                type: "12332311",
                version: "3.8403.342"
            },
            {
                name: "Min Min",
                address: "Hue",
                macAddress: "HUE",
                status: "Up",
                type: "12332311",
                version: "3.8403.342"
            }
        ];
        $scope.url = './script/discovery/managedDevices/view/managedDevice.view.html';
        $scope.changeView = function(){
            $scope.url = '../../../script/discovery/managedDevices/action/managedDevice.action.html';
        }

        // Status Save fefault
        $scope.isSaved = false;

        // Status Button Edit
        $scope.isDisableEditButton = true;

        //Create a new Managed Device
         $scope.createNewMangedDevice = function(){
            $scope.isSaved = false;
            $scope.deviceList.push({name:$scope.frmName, address:$scope.frmAddress, macAdress:$scope.frmMacAddress, status:$scope.frmStatus, type:$scope.frmType, version:$scope.frmVersion});
            $scope.frmName = '';
            $scope.frmAddress = '';
            $scope.frmMacAddress = '';
            $scope.frmStatus = '';
            $scope.frmType = '';
            $scope.frmVersion = '';
         }
         console.log('Create new managed device', $scope.createNewMangedDevice);

         //Remove one or multy managed device
         $scope.removeMangedDevice = function(){
            $scope.isSaved = false;
             var oldDeviceList = $scope.deviceList;
             $scope.deviceList = [];
             angular.forEach(oldDeviceList, function(deviceItem){
                 if(!deviceItem.select) $scope.deviceList.push(deviceItem);
             });
         };

         console.log('Removed managed device ===>', $scope.removeMangedDevice);

         //Change checkbox
         $scope.changeCheckbox = function(value){
             $scope.isSaved = false;
             console.log(value);
             $scope.isDisableEditButton = checkDisableEditButton();
         }

         $scope.logData = function(list) {
             console.log('list', list);
         }
         function checkDisableEditButton(){
             $scope.isSaved = false;
             let countSelect = 0;
             for(let i = 0; i < $scope.deviceList.length; i++){
                 if($scope.deviceList[i].select == true){
                     $scope.selectedItem = angular.copy($scope.deviceList[i]);
                     countSelect++;
                 }
             }
             if(countSelect == 1){
                 return false;
             }
             else {
                 $scope.selectedItem = null;
                 return true;
             }
         };

         $scope.editManagedDevice = function(){
             $scope.isVisible = !$scope.isVisible;
         };

         $scope.cancelEditMangedDevice = function(){
             $scope.isVisible = false;
         };

         $scope.updateDeviceList = function(selectedItem){
            console.log(selectedItem);
            $scope.isSaved = true;
            $scope.isVisible = false;
            for(var i = 0; i<$scope.deviceList.length; i++){
                $scope.deviceItem[i].name = selectedItem.name;
                $scope.deviceItem[i].address = selectedItem.address;
                $scope.deviceItem[i].type = selectedItem.type;
                $scope.deviceItem[i].version = selectedItem.version;
            }
         }
        }]);
    })();
