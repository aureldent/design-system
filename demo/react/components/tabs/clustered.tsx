import React, { Fragment, useState } from 'react';

import { mdiBowl, mdiBreadSliceOutline } from '@mdi/js';
import { Tabs, TabsProps, TabsTheme } from 'LumX';
import { Tab } from 'LumX/components/tabs/react/Tab';
import { Layouts } from 'LumX/components/tabs/react/Tabs';

/////////////////////////////

interface IProps {
    /**
     * The theme to use to display this demo.
     */
    theme: TabsTheme;
}

/////////////////////////////

/**
 * The demo for the clustered <Tabs>s.
 *
 * @return {React.ReactElement} The demo component.
 */
const DemoComponent: React.FC<IProps> = ({ theme }: IProps): React.ReactElement => {
    const [activeTab, setActiveTab]: [TabsProps['activeTab'], React.Dispatch<React.SetStateAction<number>>] = useState(
        0,
    );

    const handleTabClick: CallableFunction = ({ index }: { index: number }): void => {
        setActiveTab(index);
    };

    return (
        <Fragment>
            <Tabs theme={theme} layout={Layouts.clustered} activeTab={activeTab} onTabClick={handleTabClick}>
                <Tab label="First Tab" icon={mdiBreadSliceOutline}>
                    <p className="p+">Bread</p>
                </Tab>

                <Tab label="Second Tab">
                    <p className="p+">Banana</p>
                </Tab>

                <Tab label="Third Tab" icon={mdiBowl} isDisabled={true}>
                    <p className="p+">Bowl</p>
                </Tab>
            </Tabs>
        </Fragment>
    );
};

/////////////////////////////

export default {
    view: DemoComponent,
};