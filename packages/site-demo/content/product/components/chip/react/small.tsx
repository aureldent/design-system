import React from 'react';

import { mdiClose, mdiEmail } from '@lumx/icons';
import { Chip, Icon, Size } from '@lumx/react';

const App = ({ theme }) => {
    // Initialize a click handler
    const onClick = () => console.log('clicked chip');

    return (
        <>
            <Chip theme={theme} size={Size.s}>
                Default
            </Chip>
            <Chip theme={theme} size={Size.s} before={<Icon icon={mdiEmail} size={Size.xxs} />}>
                Rich
            </Chip>
            <Chip theme={theme} size={Size.s} after={<Icon icon={mdiClose} size={Size.xxs} />} onClick={onClick}>
                Dismissible
            </Chip>
        </>
    );
};

export default App;