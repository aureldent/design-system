import React, { ReactElement } from 'react';

import { ButtonEmphasis, DropdownButton, Theme } from 'LumX';
import { Callback } from 'LumX/core/react/utils';
import { mdiPencil } from 'LumX/icons';

/////////////////////////////

interface IProps {
    /**
     * The theme to use to display this demo.
     */
    theme: Theme;
}

/////////////////////////////

/**
 * The demo for the <DropdownButton>s.
 *
 * @return The demo component.
 */
const DemoComponent: React.FC<IProps> = ({ theme }: IProps): ReactElement => {
    const onClick = (splitted: boolean = false): Callback => {
        return (): void => {
            console.info(`You click on a ${splitted ? 'splitted' : 'non-splitted'} dropdown button`);
            if (splitted) {
                console.info(
                    'A click on the main (label) button will only trigger your `onClick` handler, while a click on the secondary (arrow) button will trigger the toggle of the dropdown.',
                );
            } else {
                console.info(
                    'A click on this type of dropdown button will trigger both you `onClick` handler and the toggle of the dropdown.',
                );
            }
        };
    };

    return (
        <>
            <div className="mb+">
                <DropdownButton
                    className="mr"
                    dropdown={<span>Content of the Dropdown</span>}
                    emphasis={ButtonEmphasis.low}
                    color={theme === Theme.dark ? 'light' : undefined}
                    theme={theme}
                    onClick={onClick(false)}
                >
                    Dropdown button
                </DropdownButton>

                <DropdownButton
                    className="mr"
                    dropdown={<span>Content of the Dropdown</span>}
                    emphasis={ButtonEmphasis.medium}
                    color={theme === Theme.dark ? 'light' : undefined}
                    theme={theme}
                    onClick={onClick(false)}
                >
                    Dropdown button
                </DropdownButton>

                <DropdownButton dropdown={<span>Content of the Dropdown</span>} theme={theme} onClick={onClick(false)}>
                    Dropdown button
                </DropdownButton>
            </div>

            <div className="mb+">
                <DropdownButton
                    className="mr"
                    dropdown={<span>Content of the Dropdown</span>}
                    splitted={true}
                    emphasis={ButtonEmphasis.low}
                    color={theme === Theme.dark ? 'light' : undefined}
                    theme={theme}
                    onClick={onClick(true)}
                >
                    Splitted Dropdown button
                </DropdownButton>

                <DropdownButton
                    className="mr"
                    dropdown={<span>Content of the Dropdown</span>}
                    splitted={true}
                    emphasis={ButtonEmphasis.medium}
                    color={theme === Theme.dark ? 'light' : undefined}
                    theme={theme}
                    onClick={onClick(true)}
                >
                    Splitted Dropdown button
                </DropdownButton>

                <DropdownButton
                    dropdown={<span>Content of the Dropdown</span>}
                    splitted={true}
                    theme={theme}
                    onClick={onClick(true)}
                >
                    Splitted Dropdown button
                </DropdownButton>
            </div>

            <div>
                <DropdownButton
                    className="mr"
                    dropdown={<span>Content of the Dropdown</span>}
                    icon={mdiPencil}
                    theme={theme}
                    onClick={onClick(false)}
                >
                    Dropdown button with left icon
                </DropdownButton>

                <DropdownButton
                    dropdown={<span>Content of the Dropdown</span>}
                    splitted={true}
                    icon={mdiPencil}
                    theme={theme}
                    onClick={onClick(true)}
                >
                    Splitted Dropdown button with left icon
                </DropdownButton>
            </div>
        </>
    );
};

/////////////////////////////

export default {
    view: DemoComponent,
};