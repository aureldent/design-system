import {
    mdiFileDocumentBox,
    mdiNewspaper,
    mdiClipboardAccount,
    mdiArchive,
    mdiStar,
    mdiHelpCircle,
    mdiWrench,
} from '@lumx/icons';

/////////////////////////////

function DemoController(LumXDropdownService) {
    'ngInject';

    const vm = this;

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * The id of the dropdown.
     *
     * @type {string}
     * @constant
     * @readonly
     */
    vm.dropdownId = 'test-dropdown-menu';
    vm.dropdownTarget = 'test-dropdown-target';
    vm.dropdownSource = 'test-dropdown-source';

    /**
     * The icons to use in the template.
     *
     * @type {Object}
     * @constant
     * @readonly
     */
    vm.icons = {
        mdiFileDocumentBox,
        mdiNewspaper,
        mdiClipboardAccount,
        mdiArchive,
        mdiStar,
        mdiHelpCircle,
        mdiWrench,
    };

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Close the dropdown.
     *
     * @param {Event} evt The event that triggered this function.
     */
    function closeDropdown(evt) {
        evt.stopPropagation();

        LumXDropdownService.close(vm.dropdownId);
    }

    /**
     * Open the dropdown.
     *
     * @param {Event} evt The event that triggered this function.
     */
    function openDropdown(evt) {
        evt.stopPropagation();

        LumXDropdownService.open(vm.dropdownId, {
            target: `#${vm.dropdownTarget}`,
            source: `#${vm.dropdownSource}`,
        });
    }

    /////////////////////////////

    vm.closeDropdown = closeDropdown;
    vm.openDropdown = openDropdown;
}

/////////////////////////////

export { DemoController };
