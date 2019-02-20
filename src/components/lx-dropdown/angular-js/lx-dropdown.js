import '../style/lx-dropdown.scss';
import template from './lx-dropdown.html';

/////////////////////////////

function lxDropdownController(
    $document,
    $scope,
    $timeout,
    $window,
    LxDepthService,
    LxDropdownService,
    LxEventSchedulerService,
    LxUtilsService,
) {
    // eslint-disable-next-line consistent-this
    const lxDropdown = this;

    /////////////////////////////
    //                         //
    //    Private attributes   //
    //                         //
    /////////////////////////////

    /**
     * The escape key code.
     *
     * @type {number}
     * @constant
     * @readonly
     */
    const _ESCAPE_KEY_CODE = 27;

    /**
     * Offset from the edge of the view port if dropdown is higher.
     *
     * @type {number}
     * @constant
     * @readonly
     */
    const _OFFSET_FROM_EDGE = 16;

    /**
     * The source element mouse enter timeout.
     *
     * @type {Object}
     */
    let _hoverTimeout;

    /**
     * The event scheduler id.
     *
     * @type {string}
     */
    // eslint-disable-next-line one-var
    let _idEventScheduler;

    /**
     * The menu element.
     *
     * @type {element}
     */
    // eslint-disable-next-line one-var
    let _menuEl;

    /**
     * Whether the user pointer is on menu or not.
     * Useful to know Whether or not close the menu in hover mode.
     *
     * @type {boolean}
     */
    let _mouseOnMenu = false;

    /**
     * The toggle element.
     *
     * @type {element}
     */
    let _toggleEl;

    /////////////////////////////
    //                         //
    //    Public attributes    //
    //                         //
    /////////////////////////////

    /**
     * Whether the directive has toggle slot filled or not.
     *
     * @type {boolean}
     */
    lxDropdown.hasToggle = false;

    /**
     * Whether the dropdown is open or not.
     *
     * @type {boolean}
     */
    lxDropdown.isOpen = false;

    /**
     * The dropdown uuid.
     *
     * @type {string}
     */
    lxDropdown.uuid = LxUtilsService.generateUUID();

    /////////////////////////////
    //                         //
    //    Private functions    //
    //                         //
    /////////////////////////////

    /**
     * Close dropdown on document click.
     */
    function _onDocumentClick() {
        if (angular.isUndefined(lxDropdown.closeOnClick) || lxDropdown.closeOnClick) {
            LxDropdownService.closeActiveDropdown();
        }
    }

    /**
     * Close dropdown.
     */
    function _close() {
        lxDropdown.isOpen = false;

        LxDropdownService.resetActiveDropdownUuid();

        LxUtilsService.restoreBodyScroll();

        $timeout(() => {
            _menuEl.removeAttr('style').insertAfter(_toggleEl);

            if (angular.isUndefined(lxDropdown.escapeClose) || lxDropdown.escapeClose) {
                LxEventSchedulerService.unregister(_idEventScheduler);
                _idEventScheduler = undefined;
            }

            $document.off('click', _onDocumentClick);
        });
    }

    /**
     * Get available height.
     *
     * @return {Object} Available height on top / bottom.
     */
    function _getAvailableHeight() {
        const availaibleHeight = {};
        const toggleProps = {
            height: _toggleEl.outerHeight(),
            top: _toggleEl.offset().top - angular.element($window).scrollTop(),
        };
        const windowProps = {
            height: $window.innerHeight,
        };

        if (lxDropdown.overToggle) {
            availaibleHeight.above = toggleProps.top;
            availaibleHeight.below = windowProps.height - toggleProps.top;
        } else {
            availaibleHeight.above = toggleProps.top;
            availaibleHeight.below = windowProps.height - (toggleProps.top + toggleProps.height);
        }

        return availaibleHeight;
    }

    /**
     * Initialize horizontal position.
     */
    function _initHorizontalPosition() {
        const menuProps = {};
        const toggleProps = {
            height: _toggleEl.outerHeight(),
            left: _toggleEl.offset().left,
            width: _toggleEl.outerWidth(),
        };
        const windowProps = {
            height: $window.innerHeight,
            width: $window.innerWidth,
        };

        if (angular.isDefined(lxDropdown.width)) {
            if (lxDropdown.width.indexOf('%') > -1) {
                // eslint-disable-next-line no-magic-numbers
                menuProps.minWidth = toggleProps.width * (lxDropdown.width.slice(0, -1) / 100);
            } else {
                menuProps.width = lxDropdown.width;
            }
        } else {
            menuProps.width = 'auto';
        }

        if (lxDropdown.position === 'left') {
            menuProps.left = toggleProps.left;
            menuProps.right = 'auto';
        } else if (lxDropdown.position === 'right') {
            menuProps.left = 'auto';
            menuProps.right = windowProps.width - toggleProps.width - toggleProps.left;
        }

        _menuEl.css({
            left: menuProps.left,
            right: menuProps.right,
        });

        if (angular.isDefined(menuProps.minWidth)) {
            _menuEl.css({
                minWidth: menuProps.minWidth,
            });
        } else {
            _menuEl.css({
                width: menuProps.width,
            });
        }
    }

    /**
     * Initialize vertical position.
     */
    function _initVerticalPosition() {
        const availaibleHeight = _getAvailableHeight();
        const menuProps = {};
        const windowProps = {
            height: $window.innerHeight,
        };

        if (availaibleHeight.below > availaibleHeight.above) {
            if (lxDropdown.overToggle) {
                menuProps.top = availaibleHeight.above;
                menuProps.maxHeight = availaibleHeight.below;
            } else {
                // eslint-disable-next-line no-bitwise
                menuProps.top = availaibleHeight.above + _toggleEl.outerHeight() + ~~lxDropdown.offset;
                menuProps.maxHeight = availaibleHeight.below;
            }
        } else if (lxDropdown.overToggle) {
            menuProps.bottom = windowProps.height - availaibleHeight.above - _toggleEl.outerHeight();
            menuProps.maxHeight = availaibleHeight.above + _toggleEl.outerHeight();
        } else {
            // eslint-disable-next-line no-bitwise
            menuProps.bottom = windowProps.height - availaibleHeight.above + ~~lxDropdown.offset;
            menuProps.maxHeight = availaibleHeight.above;
        }

        menuProps.maxHeight -= _OFFSET_FROM_EDGE;

        _menuEl.css(menuProps);
    }

    /**
     * Close dropdown on echap key up.
     *
     * @param {Event} evt The key up event.
     */
    function _onKeyUp(evt) {
        if (evt.keyCode === _ESCAPE_KEY_CODE) {
            LxDropdownService.closeActiveDropdown();
        }

        evt.stopPropagation();
    }

    /**
     * Open dropdown.
     */
    function _open() {
        LxDropdownService.closeActiveDropdown();
        LxDropdownService.registerActiveDropdownUuid(lxDropdown.uuid);

        if (angular.isUndefined(lxDropdown.escapeClose) || lxDropdown.escapeClose) {
            _idEventScheduler = LxEventSchedulerService.register('keyup', _onKeyUp);
        }

        LxDepthService.increase();

        _menuEl.appendTo('body').css('z-index', LxDepthService.get());

        $timeout(() => {
            _initHorizontalPosition();
            _initVerticalPosition();

            lxDropdown.isOpen = true;
            LxUtilsService.disableBodyScroll();

            $document.on('click', _onDocumentClick);
        });
    }

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Close dropdown on mouse enter.
     *
     * @param {string} fromMenu Whether the function is triggered from the menu or from the toggle.
     */
    function closeOnMouseLeave(fromMenu) {
        if (!lxDropdown.hover) {
            return;
        }

        $timeout.cancel(_hoverTimeout);

        $timeout(() => {
            if (!_mouseOnMenu || fromMenu) {
                LxDropdownService.closeActiveDropdown();
            }

            if (fromMenu) {
                _mouseOnMenu = false;
            }
        }, lxDropdown.hoverDelay);
    }

    /**
     * Open dropdown on mouse leave.
     */
    function openOnMouseEnter() {
        if (!lxDropdown.hover || lxDropdown.isOpen) {
            return;
        }

        _hoverTimeout = $timeout(_open, lxDropdown.hoverDelay);
    }

    /**
     * Register menu.
     *
     * @param {element} menuEl The menu element.
     */
    function registerMenu(menuEl) {
        _menuEl = menuEl;
    }

    /**
     * Register the fact that user pointer is on the menu.
     */
    function registerMouseEnterEvent() {
        _mouseOnMenu = true;
    }

    /**
     * Register toggle.
     *
     * @param {element} toggleEl The toggle element.
     */
    function registerToggle(toggleEl) {
        _toggleEl = toggleEl;
    }

    /**
     * Toggle the dropdown on toggle click.
     */
    function toggle() {
        if (lxDropdown.hover) {
            return;
        }

        if (lxDropdown.isOpen) {
            LxDropdownService.closeActiveDropdown();
        } else {
            _open();
        }
    }

    /////////////////////////////

    lxDropdown.closeOnMouseLeave = closeOnMouseLeave;
    lxDropdown.openOnMouseEnter = openOnMouseEnter;
    lxDropdown.registerMenu = registerMenu;
    lxDropdown.registerMouseEnterEvent = registerMouseEnterEvent;
    lxDropdown.registerToggle = registerToggle;
    lxDropdown.toggle = toggle;

    /////////////////////////////
    //                         //
    //          Events         //
    //                         //
    /////////////////////////////

    /**
     * Open a given dropdown.
     *
     * @param {Event}  evt    The dropdown open event.
     * @param {Object} params The dropdown uuid and the target id.
     */
    $scope.$on('lx-dropdown__open', (evt, params) => {
        if (params.uuid === lxDropdown.uuid && !lxDropdown.isOpen) {
            registerToggle(angular.element(params.target));
            _open();
        }
    });

    /**
     * Close a given dropdown.
     *
     * @param {Event}  evt    The dropdown open event.
     * @param {Object} params The dropdown uuid.
     */
    $scope.$on('lx-dropdown__close', (evt, params) => {
        if (params.uuid === lxDropdown.uuid && lxDropdown.isOpen) {
            _close();
        }
    });
}

/////////////////////////////

function lxDropdownDirective() {
    function link(scope, el, attrs, ctrl, transclude) {
        ctrl.registerToggle(el.find('.lx-dropdown__toggle'));
        ctrl.registerMenu(el.find('.lx-dropdown__menu'));

        if (transclude.isSlotFilled('toggle')) {
            ctrl.hasToggle = true;
        }

        attrs.$observe('id', (id) => {
            ctrl.uuid = id;
        });
    }

    return {
        bindToController: true,
        controller: lxDropdownController,
        controllerAs: 'lxDropdown',
        link,
        replace: true,
        restrict: 'E',
        scope: {
            closeOnClick: '=?lxCloseOnClick',
            escapeClose: '=?lxEscapeClose',
            hover: '=?lxHover',
            hoverDelay: '=?lxHoverDelay',
            offset: '@?lxOffset',
            overToggle: '=?lxOverToggle',
            position: '@?lxPosition',
            width: '@?lxWidth',
        },
        template,
        transclude: {
            menu: 'lxDropdownMenu',
            toggle: '?lxDropdownToggle',
        },
    };
}

/////////////////////////////

angular.module('lumx.dropdown').directive('lxDropdown', lxDropdownDirective);

/////////////////////////////

export { lxDropdownDirective };
