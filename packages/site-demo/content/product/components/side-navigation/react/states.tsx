import React from 'react';

import { mdiEmail } from '@lumx/icons';
import { Emphasis, SideNavigation, SideNavigationItem } from '@lumx/react';

const App = () => (
    <>
        <SideNavigation>
            <SideNavigationItem label="Resting" icon={mdiEmail} emphasis={Emphasis.low} />
            <SideNavigationItem label="Selected" icon={mdiEmail} emphasis={Emphasis.low} isSelected />
        </SideNavigation>
    </>
);

export default App;
