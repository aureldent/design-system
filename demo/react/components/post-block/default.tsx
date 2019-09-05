import React, { ReactElement } from 'react';

import { mdiComment, mdiHeart } from 'LumX/icons';

import { Button, Chip, Emphasis, Grid, Orientation, PostBlock, Size, Theme, UserBlock } from 'LumX';

/////////////////////////////

interface IProps {
    /**
     * The theme to use to display this demo.
     */
    theme: Theme;
}

/////////////////////////////

/**
 * The demo for the default <PostBlock>s.
 *
 * @return The demo component.
 */
const DemoComponent: React.FC<IProps> = ({ theme }: IProps): ReactElement => (
    <>
        <PostBlock
            actions={
                <Grid>
                    {[{ icon: mdiComment, value: 16 }, { icon: mdiHeart, value: 8 }].map((action, index) => {
                        return (
                            <Button key={index} emphasis={Emphasis.low} size={Size.s} leftIcon={action.icon}>
                                <span>{action.value}</span>
                            </Button>
                        );
                    })}
                </Grid>
            }
            attachments={
                <UserBlock
                    avatar="http://i.pravatar.cc/128"
                    name="Matthias Manoukian"
                    fields={['Head of Design', 'Lyon']}
                    orientation={Orientation.vertical}
                    size={Size.l}
                    theme={theme}
                />
            }
            author={
                <UserBlock avatar="http://i.pravatar.cc/128" name="Matthias Manoukian" size={Size.s} theme={theme} />
            }
            tags={
                <Grid>
                    {['tag1', 'tag2', 'tag3'].map((tag, index) => {
                        return (
                            <Chip key={index} className="lumx-spacing-margin-right-tiny" size={Size.s} theme={theme}>
                                {tag}
                            </Chip>
                        );
                    })}
                </Grid>
            }
            meta="1 day ago in community's name"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus libero aliquet pharetra luctus. Fusce nisl turpis, posuere ac tellus at, euismod vulputate libero..."
            thumbnail="https://picsum.photos/800/600/?random"
            title="Annual Bonus Payments"
        />
    </>
);

/////////////////////////////

export default {
    view: DemoComponent,
};
