import React, { ReactElement } from 'react';

import { mount, shallow } from 'enzyme';

import { ICommonSetup, Wrapper, commonTestsSuite } from 'LumX/core/testing/utils.test';
import { getBasicClass } from 'LumX/core/utils';

import { CLASSNAME, Dropdown, DropdownProps } from './Dropdown';

/////////////////////////////

/**
 * Define the overriding properties waited by the `setup` function.
 */
type ISetupProps = Partial<DropdownProps>;

/**
 * Defines what the `setup` function will return.
 */
interface ISetup extends ICommonSetup {
    props: ISetupProps;

    /**
     * The <div> element that holds the dropdown content.
     */
    dropdown: Wrapper;
}

/////////////////////////////

/**
 * Mounts the component and returns common DOM elements / data needed in multiple tests further down.
 *
 * @param props  The props to use to override the default props of the component.
 * @param     [shallowRendering=true] Indicates if we want to do a shallow or a full rendering.
 * @return      An object with the props, the component wrapper and some shortcut to some element inside of the
 *                       component.
 */
const setup = ({ ...propsOverrides }: ISetupProps = {}, shallowRendering: boolean = true): ISetup => {
    const props: DropdownProps = {
        // tslint:disable-next-line no-unused
        children: (setIsOpen: (isOpen: boolean) => void): React.ReactNode => 'This is the content of the dropdown',
        toggleElement: 'Toggle',
        ...propsOverrides,
    };

    const renderer: (el: ReactElement) => Wrapper = shallowRendering ? shallow : mount;

    const wrapper: Wrapper = renderer(<Dropdown {...props} />);

    return {
        dropdown: wrapper.find('div').first(),

        props,
        wrapper,
    };
};

describe(`<${Dropdown.displayName}>`, (): void => {
    // 1. Test render via snapshot (default states of component).
    describe('Snapshots and structure', (): void => {
        it('should render correctly', (): void => {
            const { dropdown, wrapper } = setup();
            expect(wrapper).toMatchSnapshot();

            expect(dropdown).toExist();
            expect(dropdown).toHaveClassName(CLASSNAME);
        });
    });

    /////////////////////////////

    // 2. Test defaultProps value and important props custom values.
    describe('Props', (): void => {
        it('should use default props', (): void => {
            const { dropdown }: ISetup = setup();

            expect(dropdown).toHaveClassName(CLASSNAME);
            expect(dropdown).toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: 'hasToggle', value: true }));
        });
    });

    /////////////////////////////

    // 3. Test events.
    describe('Events', (): void => {
        // Nothing to do here.
    });
    /////////////////////////////

    // 4. Test conditions (i.e. things that display or not in the UI based on props).
    describe('Conditions', (): void => {
        // Nothing to do here.
    });

    /////////////////////////////

    // 5. Test state.
    describe('State', (): void => {
        // Nothing to do here.
    });

    /////////////////////////////

    // Common tests suite.
    commonTestsSuite(setup, { className: 'dropdown', prop: 'dropdown' }, { className: CLASSNAME });
});
