(function () {
    "use strict";
    angular.module("app").directive("macAddValidator", function () {
        function link(scope, element, attrs) {
            var isShowMessage = true;
            scope.$watch(attrs.ngModel, function (newVal) {
                console.log("Ng model la:", attrs.ngModel);
                var inputMacAdd = newVal;
                var macAddRe = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
                var result = macAddRe.test(inputMacAdd);
                console.log(result);
                var newItem = document.createElement("span");
                newItem.setAttribute("id", "txt-valid-mac-add");
                newItem.setAttribute("class", "txt-valid");
                var textnode = document.createTextNode(
                    'Please insert value with format: "xx:xx:xx:xx:xx:xx"'
                );
                newItem.appendChild(textnode);
                if (!result && isShowMessage) {
                    element[0].parentNode.insertBefore(
                        newItem,
                        element[0].nextSibling
                    );
                    isShowMessage = false;
                } else if (
                    result &&
                    document.getElementById("txt-valid-mac-add")
                ) {
                    // dung remove de clear du lieu di
                    document.getElementById("txt-valid-mac-add").remove();
                    isShowMessage = true;
                }
            });
        }
        return {
            restrict: "AE",
            link: link,
        };
    });
})();
