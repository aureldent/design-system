import React from 'react';

import { Chip, Placement, Popover, Size } from '@lumx/react';

const App = ({ theme }: any) => {
    const demoPopperStyle = {
        alignItems: 'center',
        display: 'flex',
        height: 100,
        justifyContent: 'center',
        width: 200,
    };

    const demoPopoverHolderStyle = {
        alignItems: 'center',
        display: 'flex',
        height: 224,
        justifyContent: 'center',
    };

    const anchorRef = React.useRef(null);
    const popoverRef = React.useRef(null);

    const { computedPosition, isVisible } = Popover.useComputePosition(Placement.AUTO, anchorRef, popoverRef, true);

    return (
        <>
            <div style={demoPopoverHolderStyle}>
                <Chip chipRef={anchorRef} theme={theme} size={Size.s}>
                    Anchor
                </Chip>
            </div>
            <Popover theme={theme} popoverRect={computedPosition} popoverRef={popoverRef} isVisible={isVisible}>
                <div style={demoPopperStyle}>{'Popover'}</div>
            </Popover>
        </>
    );
};

export default App;
