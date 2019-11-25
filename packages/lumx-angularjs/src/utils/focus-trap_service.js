import { TAB_KEY_CODE } from '@lumx/core/constants';
import { MODULE_NAME, SERVICE_PREFIX } from '@lumx/angularjs/constants/common_constants';

/////////////////////////////

function FocusTrapService() {
    'ngInject';

    const service = this;

    /////////////////////////////
    //                         //
    //    Private attributes   //
    //                         //
    /////////////////////////////

    /**
     * The active element where to trap the focus.
     *
     * @type {Element}
     */
    let _activeElement;

    /////////////////////////////
    //                         //
    //    Private functions    //
    //                         //
    /////////////////////////////

    /**
     * Handle key events on key press.
     *
     * @param {Event} evt The key event.
     */
    function _onKeyPress(evt) {
        if (evt.keyCode !== TAB_KEY_CODE) {
            return;
        }

        const focusableEls = _activeElement.find(
            'a[href]:not([tabindex="-1"]), button:not([tabindex="-1"]), textarea:not([tabindex="-1"]), input[type="text"]:not([tabindex="-1"]), input[type="radio"]:not([tabindex="-1"]), input[type="checkbox"]:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
        );

        // eslint-disable-next-line prefer-destructuring
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];

        if (evt.shiftKey) {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                evt.preventDefault();
            }
        } else if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            evt.preventDefault();
        }
    }

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Activate focus trap on given element.
     *
     * @param {element} el The element where to trap focus.
     */
    function activate(el) {
        _activeElement = el;
        _activeElement.on('keydown keypress', _onKeyPress);
    }

    /**
     * Disable focus trap on given element.
     */
    function disable() {
        _activeElement.off('keydown keypress', _onKeyPress);
        _activeElement = undefined;
    }

    /////////////////////////////

    service.activate = activate;
    service.disable = disable;
}

/////////////////////////////

angular.module(`${MODULE_NAME}.utils.focus-trap`).service(`${SERVICE_PREFIX}FocusTrapService`, FocusTrapService);

/////////////////////////////

export { FocusTrapService };
