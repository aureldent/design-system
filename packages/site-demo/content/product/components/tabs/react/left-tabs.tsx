import React, { useState } from 'react';

import classNames from 'classnames';
import { Tab, Tabs, TabsLayout, Theme } from '@lumx/react';

const App = ({ theme }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = ({ index }) => {
        setActiveTab(index);
    };

    return (
        <>
            <Tabs theme={theme} activeTab={activeTab} onTabClick={handleTabClick} layout={TabsLayout.clustered}>
                <Tab label="Tab 1">
                    <p
                        className={classNames(
                            'lumx-spacing-padding-vertical-huge',
                            theme === Theme.dark && 'lumx-theme-color-light-N',
                        )}
                    >
                        Tab 1 content
                    </p>
                </Tab>

                <Tab label="Tab 2">
                    <p
                        className={classNames(
                            'lumx-spacing-padding-vertical-huge',
                            theme === Theme.dark && 'lumx-theme-color-light-N',
                        )}
                    >
                        Tab 2 content
                    </p>
                </Tab>

                <Tab label="Tab 3">
                    <p
                        className={classNames(
                            'lumx-spacing-padding-vertical-huge',
                            theme === Theme.dark && 'lumx-theme-color-light-N',
                        )}
                    >
                        Tab 3 content
                    </p>
                </Tab>
            </Tabs>
        </>
    );
};

export default App;