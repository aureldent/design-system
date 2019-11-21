import React from 'react';

import { Chip, ChipGroup, Icon, Size } from '@lumx/react';
import { mdiEmail, mdiClose } from '@lumx/icons';

const App = ({ theme }) => {
    return (
        <ChipGroup>
            <Chip theme={theme} size={Size.s}>
                Default
            </Chip>
            <Chip theme={theme} size={Size.s} before={<Icon icon={mdiEmail} size={Size.xxs} />}>
                Rich
            </Chip>
            <Chip theme={theme} size={Size.s} after={<Icon icon={mdiClose} size={Size.xxs} />}>
                Dismissible
            </Chip>
        </ChipGroup>
    );
};

export default App;
