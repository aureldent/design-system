import { COMPONENT_PREFIX, MODULE_NAME } from 'LumX/angularjs/constants/common_constants';

/////////////////////////////

function SelectChoicesFilter($filter) {
    'ngInject';

    return function filteredChoices(choices, externalFilter, textFilter) {
        if (externalFilter) {
            return choices;
        }

        let toFilter = [];

        if (angular.isArray(choices)) {
            toFilter = choices;
        } else if (angular.isObject(choices)) {
            for (const idx in choices) {
                if (angular.isArray(choices[idx])) {
                    toFilter = toFilter.concat(choices[idx]);
                }
            }
        }

        return $filter('filter')(toFilter, textFilter);
    };
}

/////////////////////////////

angular.module(`${MODULE_NAME}.select`).filter(`${COMPONENT_PREFIX}SelectChoicesFilter`, SelectChoicesFilter);

/////////////////////////////

export { SelectChoicesFilter };
