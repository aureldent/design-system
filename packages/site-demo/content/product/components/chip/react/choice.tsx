import React, { useState } from 'react';

import { Chip } from '@lumx/react';

const App = ({ theme }: any) => {
    const [selected, setSelected] = useState<number>(-1);

    const indexedProps = (index: number) => ({
        isSelected: selected === index,
        onClick: () => setSelected(selected === index ? -1 : index),
    });

    return (
        <div className="demo-grid">
            <Chip theme={theme} {...indexedProps(0)}>
                Am
            </Chip>

            <Chip theme={theme} {...indexedProps(1)}>
                Stram
            </Chip>

            <Chip theme={theme} {...indexedProps(2)}>
                Gram
            </Chip>

            <Chip theme={theme} {...indexedProps(3)}>
                Pic
            </Chip>

            <Chip theme={theme} {...indexedProps(4)}>
                Pic
            </Chip>

            <Chip theme={theme} {...indexedProps(5)}>
                Colegram
            </Chip>
        </div>
    );
};

export default App;
