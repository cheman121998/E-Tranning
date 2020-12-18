(function(){
    'use strict';
    angular.module('app')
    .directive('addValidator', function() {

        function link(scope, element, attrs) {
            var isShowMessage = true;
            console.log('scope.form', scope.form);
           
            scope.$watch(attrs.ngModel, function(newVal){ 
                var inputAdd = newVal;
                var addRe = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
                var result = addRe.test(inputAdd);
                console.log(result);
                var newItem = document.createElement('span');
                newItem.setAttribute("id", "txt-valid-add");
                newItem.setAttribute("class", "txt-valid")
                var textnode = document.createTextNode('Please insert value with format: "x.x.x.x"');
                newItem.appendChild(textnode);
                if(!result && isShowMessage){ 
                    element[0].parentNode.insertBefore(newItem, element[0].nextSibling);
                    isShowMessage = false
                } else if(result) {
                    // dung remove de clear du lieu di                  
                    document.getElementById('txt-valid-add').remove(result);                   
                }
                })               
        }
        return {
        restrict: "AE",
        link: link
    }
    });
})()