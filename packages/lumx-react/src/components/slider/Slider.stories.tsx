import { Slider } from '@lumx/react';
import { number, text } from '@storybook/addon-knobs';
import noop from 'lodash/noop';
import React from 'react';

export default { title: 'Slider' };

export const defaultSlider = ({ theme }) => (
    <Slider
        label={text('label', 'Default')}
        max={number('max', 10)}
        min={number('min', 0)}
        theme={theme}
        value={5}
        onChange={noop}
    />
);

export const withHelperSlider = ({ theme }) => (
    <Slider
        label={text('label', 'Default')}
        helper={text('helper', 'This is an helper text')}
        max={number('max', 10)}
        min={number('min', 0)}
        theme={theme}
        value={5}
        onChange={noop}
    />
);