import React, { ReactElement } from 'react';

import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import { build, fake, oneOf } from 'test-data-bot';

import { mdiCheck, mdiPlus } from '@lumx/icons';
import { ColorPalette, ColorVariant, Size } from '@lumx/react';
import { ICommonSetup, Wrapper, commonTestsSuite } from '@lumx/react/testing/utils';
import { getBasicClass } from '@lumx/react/utils';

import { CLASSNAME, Icon, IconProps } from './Icon';

/////////////////////////////

/**
 * Define the overriding properties waited by the `setup` function.
 */
type ISetupProps = Partial<IconProps>;

/**
 * Defines what the `setup` function will return.
 */
interface ISetup extends ICommonSetup {
    props: ISetupProps;

    /**
     * The <i> element that wraps the <svg> element.
     */
    i: Wrapper;

    /**
     * The <path> element that holds the icon path.
     */
    path: Wrapper;

    /**
     * The <svg> element that holds the SVG <path> of the icon.
     */
    svg: Wrapper;
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
    const props: IconProps = {
        icon: 'mdiPlus',
        ...propsOverrides,
    };

    const renderer: (el: ReactElement) => Wrapper = shallowRendering ? shallow : mount;

    const wrapper: Wrapper = renderer(<Icon {...props} />);

    return {
        i: wrapper.find('i'),
        path: wrapper.find('path'),
        svg: wrapper.find('svg'),

        props,
        wrapper,
    };
};

describe(`<${Icon.displayName}>`, () => {
    // 1. Test render via snapshot (default states of component).
    describe('Snapshots and structure', () => {
        it('should render correctly', () => {
            const { i, path, svg, wrapper } = setup();
            expect(wrapper).toMatchSnapshot();

            expect(i).toExist();
            expect(i).toHaveClassName(CLASSNAME);

            expect(svg).toExist();
            expect(path).toExist();
        });

        it('should render color & color variant', () => {
            const { wrapper } = setup({ color: ColorPalette.primary, colorVariant: ColorVariant.D1 });
            expect(wrapper).toMatchSnapshot();
        });
    });

    /////////////////////////////

    // 2. Test defaultProps value and important props custom values.
    describe('Props', () => {
        it("shouldn't use any default props", () => {
            const { i } = setup();

            ['color', 'size'].forEach((prop: string) => {
                expect(i).not.toHaveClassName(getBasicClass({ prefix: CLASSNAME, type: prop, value: '' }));
            });
        });

        it('should use the given props', () => {
            const modifiedPropsBuilder: () => ISetupProps = build('props').fields({
                color: fake((fakeData: any) => fakeData.commerce.color()),
                icon: oneOf(mdiPlus, mdiCheck),
                size: oneOf(...Object.values(Size)),
            });

            const modifiedProps: ISetupProps = modifiedPropsBuilder();

            const { i, path } = setup({ ...modifiedProps });

            Object.keys(modifiedProps).forEach((prop: string) => {
                if (prop === 'icon') {
                    expect(path).toHaveProp('d', modifiedProps[prop]);
                } else {
                    expect(i).toHaveClassName(
                        getBasicClass({ prefix: CLASSNAME, type: prop, value: modifiedProps[prop] }),
                    );
                }
            });
        });
    });

    /////////////////////////////

    // 3. Test events.
    describe('Events', () => {
        // Nothing to do here.
    });
    /////////////////////////////

    // 4. Test conditions (i.e. things that display or not in the UI based on props).
    describe('Conditions', () => {
        it('should fail when no `icon` is given', () => {
            expect(() => {
                // We know that icon must be given to <Icon>, but for the test, ignore it.
                // @ts-ignore
                setup({ icon: null });
            }).toThrowErrorMatchingSnapshot();
        });
    });

    /////////////////////////////

    // 5. Test state.
    describe('State', () => {
        // Nothing to do here.
    });

    /////////////////////////////

    // Common tests suite.
    commonTestsSuite(setup, { className: 'i', prop: 'i' }, { className: CLASSNAME });
});
