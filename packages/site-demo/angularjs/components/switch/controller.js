function DemoSwitchController() {
    'ngInject';

    const vm = this;

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * Contains all the switches available on the demo page.
     *
     * @type {Object}
     */
    vm.switches = {
        model: {
            checked: true,
            unchecked: false,
        },
        states: {
            disabled: true,
        },
    };
}

/////////////////////////////

angular.module('design-system').controller('DemoSwitchController', DemoSwitchController);

/////////////////////////////

export { DemoSwitchController };
