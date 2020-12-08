(function(){
    console.log('test again')
    angular.module('managedDevice')
    .controller('ManagedDeviceController', ['$scope', function($scope){
        $scope.deviceList = [
            { 
                id: 1,
                name: "ManMan",
                address: "Hue",
                macAddress: "HUE",
                status: "Up",
                type: "12332311",
                version: "3.8403.342"
            },
            {
                id: 2,
                name: "Hello",
                address: "Hue",
                macAddress: "HUE",
                status: "Up",
                type: "12332311",
                version: "3.8403.342"
            },
            {
                id: 3,
                name: "Angular",
                address: "Hue",
                macAddress: "HUE",
                status: "Up",
                type: "12332311",
                version: "3.8403.342"
            },
            {
                id: 4,
                name: "Min Min",
                address: "Hue",
                macAddress: "HUE",
                status: "Up",
                type: "12332311",
                version: "3.8403.342"
            }
        ];

        $scope.url = './script/discovery/managedDevices/view/managedDevice.view.html';

        $scope.changeView = function(view){
            switch(view) {
                case 'edit':
                    $scope.url = '../../../script/discovery/managedDevices/view/managedDevice.view.html';
                    break;
                case 'create':
                    $scope.url = '../../../script/discovery/managedDevices/action/managedDevice.action.html';
                    break;
                default: 
                    $scope.url = '../../../script/discovery/managedDevices/view/managedDevice.view.html';
                    break;
            }
           
        }

        // Status Save fefault
        $scope.isSaved = false;

        // Status Button Edit
        $scope.isDisableEditButton = false;

        //Create a new Managed Device
         $scope.createNewMangedDevice = function(){
           $scope.isSaved = false;
           $scope.deviceList.push({name:$scope.frmName, address:$scope.frmAddress, macAddress:$scope.frmMacAddress, status:$scope.frmStatus, type:$scope.frmType, version:$scope.frmVersion});
           $scope.frmName = '';
           $scope.frmAddress = '';
           $scope.frmMacAddress = '';
           $scope.frmStatus = '';
           $scope.frmType = '';
           $scope.frmVersion = '';          
           //Thực thi hàm change view...
           $scope.changeView();
         }
         console.log('Create new managed device', $scope.createNewMangedDevice);




        //  $scope.actionCreateNew = function(){
        //      if($scope.frmName !== null){
        //          $scope.isDisableEditButton = false;
        //      }
        //  }

         //Remove one or multy managed device
         $scope.removeMangedDevice = function(){
            $scope.isSaved = false;
             var oldDeviceList = $scope.deviceList;
             $scope.deviceList = [];
             angular.forEach(oldDeviceList, function(deviceItem){
                 if(!deviceItem.select) {
                     $scope.deviceList.push(deviceItem);                     
                 }                
             });
         };

         console.log('Removed managed device ===>', $scope.removeMangedDevice);

         //Select All to Delete

         $scope.checkAll = function () {
            angular.forEach($scope.checkbox, function (obj) {
                obj.selected = $scope.select;
            });
          };

         //Change checkbox
         $scope.changeCheckbox = function(value){
             $scope.isSaved = false;
             console.log(value);
             $scope.isDisableEditButton = checkDisableEditButton();
         }


         // Function selected list 

        //  $scope.selectedList =[];
        //  if(deviceItem.select){
        //      $scope.selectedList.push(deviceItem);
        //  }
        //  else {
        //      $scope.selectedList.splice(deviceItem);
        //  }
         
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

         // Cancel a page 

         $scope.Cancel = function(){
            $scope.IsVisible = false;
         }

        // Update Man
         $scope.updateDeviceList = function(selectedItem){
            console.log(selectedItem);
            $scope.isSaved = true;
            $scope.isVisible = false;
            for(var i = 0; i<$scope.deviceList.length; i++){
                $scope.deviceItem[i].name = $parent.selectedItem.name;
                $scope.deviceItem[i].address =  $parent.selectedItem.address;
                $scope.deviceItem[i].type =  $parent.selectedItem.type;
                $scope.deviceItem[i].version =  $parent.selectedItem.version;
            }
         }
        }]);
    })();
