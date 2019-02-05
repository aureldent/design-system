(function IIFE() {
    'use strict';

    /////////////////////////////

    function DemoCheckboxController() {
        var vm = this;

        /////////////////////////////
        //                         //
        //    Public attributes    //
        //                         //
        /////////////////////////////

        vm.checkboxes = {
            model: {
                checked: true,
                unchecked: false
            },
            states: {
                disabled: true
            },
        };
    }

    /////////////////////////////

    angular.module('lumx').controller('DemoCheckboxController', DemoCheckboxController);
})();