(function () {
    angular.module("managedDevice").controller("ManagedDeviceController", [
        '$scope',
        '$filter',
        '$http',
        function ($scope, $filter, $http) {
            //======Show managed device in view======//
            $scope.listDevice = function () {
                $http
                    .get("api/switches/non-page")
                    .then(
                        function successCallback(response) {
                            $scope.deviceList = response.data;
                        },
                        function errorCallback(response) {
                            console.log(response);
                        }
                    )
                    .finally(function () {
                        //request DONE
                    });
            };
            $scope.listDevice();

            $scope.listDeviceUpdate = function () {
                //  name: $scope.itemEdit.name
                //=> name 1 phải giống với name của server định nghĩa
                // => name 2 phải giống với name của UI định nghĩa
                $scope.updateData = {
                    id: $scope.itemEdit.id,
                    name: $scope.itemEdit.name,
                    address: $scope.itemEdit.address,
                    macAddress: $scope.itemEdit.macAddress,
                    status: $scope.itemEdit.status,
                    type: $scope.itemEdit.type,
                    version: $scope.itemEdit.version,
                };
                $http
                    //$scope.itemEdit phải format cho giống với bên server side
                    .put("api/switches/single", $scope.updateData)
                    .then(
                        function successCallback(response) {
                            $scope.deviceList = response.data;
                        },
                        function errorCallback(response) {
                            console.log(response);
                        }
                    )
                    .finally(function () {
                        //request DONE
                        $scope.listDevice();
                    });
            };

            //======Create new managed device======//
            $scope.createNew = function () {
                $scope.createData = {
                    name: $scope.itemEdit.name,
                    address: $scope.itemEdit.address,
                    macAddress: $scope.itemEdit.macAddress,
                    status: $scope.itemEdit.status,
                    type: $scope.itemEdit.type,
                    version: $scope.itemEdit.version,
                };
                $http
                    .post("api/switches", $scope.createData)
                    .then(
                        function successCallback(response) {
                            $scope.deviceList = response.data;
                        },
                        function errorCallback(response) {
                            console.log(response);
                        }
                    )
                    .finally(function () {
                        //request DONE
                        $scope.listDevice();
                    });
            };

            $scope.createNewMangedDevice = function () {
                $scope.isSaved = false;
                //Thực thi hàm change view...
                $scope.changeView();
                $scope.isView = true;
                $scope.createNew();
            };
            // Status button create
            $scope.isCreate = false;

            $scope.goToCreatePage = function () {
                $scope.itemEdit = {};
                $scope.isView = false;
                $scope.isCreate = true;
                $scope.changeView("create");
            };

            //Show/hide button when click button (+)
            $scope.checkDisableButton = function () {
                return (
                    !$scope.itemEdit.name ||
                    !$scope.itemEdit.address ||
                    !$scope.itemEdit.macAddress ||
                    !$scope.itemEdit.status ||
                    !$scope.itemEdit.type ||
                    !$scope.itemEdit.version
                );
            };

            //======Edit managed device======//

            // Status Button Create, Update when click button add and edit
            $scope.isVisibleAdd = false;
            $scope.goToEditPage = function () {
                $scope.isView = false;
                $scope.isCreate = false;
                $scope.itemEdit = angular.copy($scope.selected[0]);
                $scope.changeView("edit");
                // $scope.isSaved = true;
                // $scope.isVisibleAdd = true;
                $scope.selected = [];
            };

            //When input change text in Edit Managed Device Template => button update will disabled
            $scope.changeTextEdit = function () {
                if ($scope.itemEdit.name === $scope.selected.name) {
                    return true;
                }
                return false;
            };

            //Use Selected in order to update DeviceItem
            $scope.updateManagedDevice = function () {
                $scope.isSaved = true;
                $scope.selected = [];
                $scope.isCreate = false;
                $scope.changeView();
                $scope.isView = true;
                $scope.listDeviceUpdate();
            };

            //======Delete managed device======//
            $scope.remove = function () {
                $scope.ids = [];
                $scope.selected.forEach(function (item) {
                    $scope.ids.push(item.id);
                });
                $http
                    .delete("/api/switches", { data: $scope.ids })
                    .then(
                        function successCallback(response) {
                            $scope.deviceList = response.data;
                            $scope.listDevice();
                        },
                        function errorCallback(response) {
                            console.log(response);
                        }
                    )
                    .finally(function () {
                        //request DONE
                        // $scope.listDevice();
                    });
                $scope.changeView();
            };
            $scope.isView = true;

            $scope.url =
                "./script/discovery/managedDevices/view/managedDevice.view.html";

            $scope.changeView = function (view) {
                switch (view) {
                    case "create":
                        $scope.url =
                            "../../../script/discovery/managedDevices/action/managedDevice.action.html";
                        $scope.isVisible = true;
                        break;
                    case "edit":
                        $scope.url =
                            "../../../script/discovery/managedDevices/action/managedDevice.action.html";
                        $scope.isVisible = false;
                        break;
                    default:
                        $scope.url =
                            "../../../script/discovery/managedDevices/view/managedDevice.view.html";
                        break;
                }
            };

            // Status Save fefault
            $scope.isSaved = false;

            // Status Button Edit default
            $scope.isVisible = false;

            //Create a new Managed Device

            $scope.clearData = function () {
                $scope.itemEdit.name = "";
                $scope.itemEdit.address = "";
                $scope.itemEdit.macAddress = "";
                $scope.itemEdit.status = "";
                $scope.itemEdit.type = "";
                $scope.itemEdit.version = "";
            };

            $scope.selected = [];

            $scope.toggleSelection = function (item) {
                var idx = $scope.selected.indexOf(item);
                if (idx > -1) {
                    $scope.selected.splice(idx, 1);
                } else {
                    $scope.selected.push(item);
                }
                console.log($scope.selected);
            };

            //Select all checkboxes in table
            $scope.checkAll = function (checkAllValue) {
                angular.forEach($scope.deviceList, function (deviceItem) {
                    deviceItem.select = checkAllValue;
                    // $scope.toggleSelection(deviceItem)
                });
                $scope.selected = checkAllValue
                    ? angular.copy($scope.deviceList)
                    : [];
            };

            // IsVisible when click Cancel
            $scope.cancel = function () {
                $scope.isView = true;
                $scope.changeView();
                $scope.clearData();
            };

            // Select Row when click anywhere
            $scope.rowClicked = function (obj) {
                console.log("row clicked", obj);
                obj.select = !obj.select;
                $scope.toggleSelection(obj);
                console.log("row clicked", $scope.selected);
            };
            $scope.actionRowOnToggle = function (deviceItem) {
                $scope.index = $scope.deviceList.indexOf(deviceItem);
            };

            //Sort Data when click Header in table
            $scope.sort = {
                column: '',
                descending: false
            }; 
            $scope.sortData = function(column) {

                var sort = $scope.sort;
        
                if (sort.column == column) {
                    sort.descending = !sort.descending;
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };

            // Paging in table

            $scope.currentPage = 0;
            $scope.pageSize = 16;
            $scope.deviceList = [];
            
            $scope.getData = function () {
              return $filter('filter')($scope.deviceList)     
            }
            
            $scope.numberOfPages=function(){
                return Math.ceil($scope.getData().length/$scope.pageSize);                
            }
        },
    ])
    .filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
})();
