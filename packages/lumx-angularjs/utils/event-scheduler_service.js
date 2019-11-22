import { MODULE_NAME, SERVICE_PREFIX } from '../constants/common_constants';

/////////////////////////////

function EventSchedulerService($document, LumXUtilsService) {
    'ngInject';

    const service = this;

    /////////////////////////////
    //                         //
    //    Private attributes   //
    //                         //
    /////////////////////////////

    /**
     * The handlers.
     *
     * @type {Object}
     */
    const _handlers = {};

    /**
     * The schedule.
     *
     * @type {Object}
     */
    const _schedule = {};

    /////////////////////////////
    //                         //
    //    Private functions    //
    //                         //
    /////////////////////////////

    /**
     * Handle en event.
     *
     * @param {Event} evt The event.
     */
    function _handle(evt) {
        const scheduler = _schedule[evt.type];

        if (angular.isDefined(scheduler)) {
            for (let i = 0, len = scheduler.length; i < len; i++) {
                const handler = scheduler[i];

                if (angular.isDefined(handler) && angular.isDefined(handler.cb) && angular.isFunction(handler.cb)) {
                    handler.cb(evt);

                    if (evt.isPropagationStopped()) {
                        break;
                    }
                }
            }
        }
    }

    /////////////////////////////
    //                         //
    //     Public functions    //
    //                         //
    /////////////////////////////

    /**
     * Register en event.
     *
     * @param  {string}   eventName The event name.
     * @param  {Function} cb        The event callback.
     * @return {string}   The event id.
     */
    function register(eventName, cb) {
        const handler = {
            cb,
            eventName,
        };

        const id = LumXUtilsService.generateUUID();
        _handlers[id] = handler;

        if (angular.isUndefined(_schedule[eventName])) {
            _schedule[eventName] = [];

            $document.on(eventName, _handle);
        }

        _schedule[eventName].unshift(_handlers[id]);

        return id;
    }

    /**
     * Unregister en event.
     *
     * @param  {string} id The event id.
     * @return {found}  Whether the event has been found or not.
     */
    function unregister(id) {
        let found = false;
        const handler = _handlers[id];

        if (angular.isDefined(handler) && angular.isDefined(_schedule[handler.eventName])) {
            const index = _schedule[handler.eventName].indexOf(handler);

            if (angular.isDefined(index) && index > -1) {
                _schedule[handler.eventName].splice(index, 1);

                delete _handlers[id];
                found = true;
            }

            if (_schedule[handler.eventName].length === 0) {
                delete _schedule[handler.eventName];

                $document.off(handler.eventName, _handle);
            }
        }

        return found;
    }

    /////////////////////////////

    service.register = register;
    service.unregister = unregister;
}

/////////////////////////////

angular
    .module(`${MODULE_NAME}.utils.event-scheduler`)
    .service(`${SERVICE_PREFIX}EventSchedulerService`, EventSchedulerService);

/////////////////////////////

export { EventSchedulerService };
