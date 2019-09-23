import React, { ReactElement, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { COMPONENT_PREFIX } from 'LumX/core/react/constants';

import { IGenericProps, getRootClassName } from 'LumX/core/react/utils';
import { handleBasicClasses } from 'LumX/core/utils';

import { Theme } from 'LumX';
import useEventCallback from 'LumX/core/react/hooks/useEventCallback';

import uuid from 'uuid/v4';

/////////////////////////////

/**
 * Defines the props of the component.
 */
interface ISliderProps extends IGenericProps {
    /** Deactivate the component */
    disabled?: boolean;
    /** Label */
    label?: string;
    /** Helper message. */
    helper?: string;
    /** Should the min and max labels be hidden */
    hideMinMaxlabel?: boolean;
    /** Maximum value */
    max: number;
    /** Maximum value */
    min: number;
    /**  Number of figures used for the fractional part of the value */
    precision?: number;
    /** Value between 2 steps */
    steps?: number;
    /** Callback function invoked when the slider value changes */
    onChange?(value: number): void;
    /** Callback function invoked when the component is clicked */
    onMouseDown?(event: React.SyntheticEvent): void;
}
type SliderProps = ISliderProps;

/////////////////////////////

/**
 * Define the types of the default props.
 */
interface IDefaultPropsType extends Partial<SliderProps> {
    /**
     * The theme.
     */
    theme?: Theme;
}

/////////////////////////////
//                         //
//    Public attributes    //
//                         //
/////////////////////////////

/**
 * The display name of the component.
 *
 */
const COMPONENT_NAME = `${COMPONENT_PREFIX}Slider`;

/**
 * The default class name and classes prefix for this component.
 *
 */
const CLASSNAME: string = getRootClassName(COMPONENT_NAME);

/**
 * The default value of props.
 *
 */
const DEFAULT_PROPS: IDefaultPropsType = {
    defaultValue: 0,
    hideMinMaxlabel: false,
    precision: 0,
    theme: Theme.light,
};
/////////////////////////////

const clamp = (min: number, max: number, value: number): number => (value < min ? min : value > max ? max : value);

/**
 * Slider component.
 *
 * @return The component.
 */
const Slider: React.FC<SliderProps> = ({
    className = '',
    label,
    helper,
    id = uuid(),
    max,
    min,
    onMouseDown,
    onChange,
    steps,
    precision = DEFAULT_PROPS.precision,
    defaultValue = DEFAULT_PROPS.defaultValue,
    hideMinMaxlabel = DEFAULT_PROPS.hideMinMaxlabel,
    disabled,
    theme = DEFAULT_PROPS.theme,
    ...props
}: SliderProps): ReactElement => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(0);
    const avaibleSteps: number[] = [];

    // build a lookup array for the steps.
    if (steps) {
        avaibleSteps.push(0);
        const percentStep = 1 / ((max - min) / steps);
        let ptr = 0;
        while (true) {
            if (ptr + percentStep < 1) {
                ptr += percentStep;
                avaibleSteps.push(ptr);
            } else {
                break;
            }
        }
    }

    /**
     * Try to find the closest step to the current slider position.
     *
     * @param percentValue Reference value
     * @return The closest step value
     */
    const findClosestStep = (percentValue: number): number => {
        const closest = avaibleSteps.reduce(
            // tslint:disable-next-line: typedef
            (acc, step) => {
                const aDst = Math.abs(percentValue - step);
                if (aDst < acc.dst) {
                    return { dst: aDst, val: step };
                }
                return acc;
            },
            { dst: Infinity, val: -1 },
        );
        return closest.val;
    };

    /**
     * Convert slider's handle position to percent.
     *
     * @param event The interaction event
     * @param slider the slider element
     * @return The computed percent value
     */
    const getPercentValue = (event: React.MouseEvent, slider: HTMLDivElement): number => {
        const { width, left } = slider.getBoundingClientRect();
        let percent = (event.pageX - left - window.pageXOffset) / width;
        percent = clamp(0, 1, percent);
        if (steps) {
            percent = findClosestStep(percent);
        }
        return percent;
    };

    /**
     * Convert a percent value to a value in range min - max.
     *
     * @param percent The value to convert
     * @return Value in range min - max
     */
    const computeNewValueFromPercent = (percent: number): number =>
        Number((min + percent * (max - min)).toFixed(precision));

    /**
     * Register a handler for the mouse move event.
     */
    const handleMove = useEventCallback((event: React.MouseEvent) => {
        const { current: slider } = sliderRef;
        const newValue = getPercentValue(event, slider!);

        if (onChange) {
            onChange(computeNewValueFromPercent(newValue));
        }
        setValue(newValue);
    });

    /**
     * Register a handler for the mouse up event.
     * Clean a all listeners.
     */
    const handleEnd = useEventCallback(() => {
        document.body.removeEventListener('mousemove', handleMove);
        document.body.removeEventListener('mouseup', handleEnd);
        document.body.removeEventListener('touchmove', handleMove);
        document.body.removeEventListener('touchend', handleEnd);
    });

    /**
     * Move to the next or previous value (i.e. + or - 10%) or next step
     * @param previous Should seek the previous value.
     */
    const hopToValue = (previous: boolean = false): void => {
        const newVal = value + (previous ? -0.1 : 0.1);
        let percent = clamp(0, 1, newVal);
        if (steps) {
            percent = value + avaibleSteps[1] * (previous ? -1 : 1);
            percent = findClosestStep(percent);
        }
        if (onChange) {
            onChange(computeNewValueFromPercent(percent));
        }
        setValue(percent);
    };

    /**
     * Register a handler for keyboard interactions
     */
    const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
            hopToValue();
        } else if (event.key === 'ArrowLeft') {
            hopToValue(true);
        }
    });

    /**
     * Register a handler for the mouseDown event.
     */
    const handleMouseDown = useEventCallback((event: React.MouseEvent) => {
        if (onMouseDown) {
            onMouseDown(event);
        }
        if (disabled) {
            return;
        }
        const { current: slider } = sliderRef;
        const newValue = getPercentValue(event, slider!);
        if (onChange) {
            onChange(computeNewValueFromPercent(newValue));
        }
        setValue(newValue);

        document.body.addEventListener('mousemove', handleMove);
        document.body.addEventListener('mouseup', handleEnd);
    });

    /**
     * Simple effect that set the default value to the slider.
     */
    useEffect(() => {
        const newValue = clamp(0, 1, (defaultValue - min) / (max - min));
        setValue(newValue);
        if (onChange) {
            onChange(computeNewValueFromPercent(newValue));
        }
    }, []);

    return (
        <div
            className={classNames(
                className,
                handleBasicClasses({ prefix: CLASSNAME, theme, hasLabel: Boolean(label) }),
            )}
            {...props}
            onMouseDown={handleMouseDown}
        >
            {label && (
                <label htmlFor={id} className={`${CLASSNAME}__label`}>
                    {label}
                </label>
            )}

            {helper && <span className={`${CLASSNAME}__helper`}>{helper}</span>}

            <div className={`${CLASSNAME}__ui-wrapper`}>
                {!hideMinMaxlabel && (
                    <span className={`${CLASSNAME}__value-label ${CLASSNAME}__value-label--min`}>{min}</span>
                )}
                <div className={`${CLASSNAME}__wrapper`} ref={sliderRef}>
                    <div className={`${CLASSNAME}__track ${CLASSNAME}__track--background`} />
                    <div
                        className={`${CLASSNAME}__track ${CLASSNAME}__track--active`}
                        style={{ width: `${value * 100}%` }}
                    />
                    {steps && (
                        <div className={`${CLASSNAME}__ticks`}>
                            {avaibleSteps.map((step: number, idx: number) => {
                                return (
                                    <div
                                        key={`tick_${idx}`}
                                        className={`${CLASSNAME}__tick`}
                                        style={{ left: `${step * 100}%` }}
                                    />
                                );
                            })}
                        </div>
                    )}
                    <button
                        className={`${CLASSNAME}__handle`}
                        style={{ left: `${value * 100}%` }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                {!hideMinMaxlabel && (
                    <span className={`${CLASSNAME}__value-label ${CLASSNAME}__value-label--max`}>{max}</span>
                )}
            </div>
        </div>
    );
};
Slider.displayName = COMPONENT_NAME;

/////////////////////////////

export { CLASSNAME, DEFAULT_PROPS, Slider, SliderProps };
