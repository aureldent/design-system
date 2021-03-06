import React, { useState } from 'react';

import { mdiDotsVertical } from '@lumx/icons';

import {
    Alignment,
    Divider,
    Emphasis,
    ExpansionPanel,
    Grid,
    GridItem,
    IconButton,
    Size,
    Thumbnail,
    ThumbnailVariant,
} from '@lumx/react';

const App = () => {
    const [isOpen1, setOpen1] = useState(false);
    const [isOpen2, setOpen2] = useState(false);
    const [isOpen3, setOpen3] = useState(false);
    const [isOpen4, setOpen4] = useState(false);
    const [isOpen5, setOpen5] = useState(false);
    const [isOpen6, setOpen6] = useState(false);
    const stopPropagation = (evt: Event) => evt.stopPropagation();

    return (
        <>
            <ExpansionPanel hasBackground hasHeaderDivider isOpen={isOpen1} toggleCallback={setOpen1}>
                <header>
                    <Grid className="lumx-spacing-margin-left-regular" hAlign={Alignment.center}>
                        <Thumbnail
                            image="https://picsum.photos/72/72/?random"
                            size={Size.m}
                            variant={ThumbnailVariant.rounded}
                        />

                        <span className="lumx-spacing-margin-left-big lumx-typography-body1">With thumbnail</span>
                    </Grid>
                </header>

                <div className="lumx-spacing-padding-big">
                    <p className="lumx-typography-subtitle1">Curabitur est gravida et libero vitae dictum.</p>
                    <p className="lumx-typography-body1">Etiam habebis sem dicantur magna mollis euismod.</p>
                </div>
            </ExpansionPanel>

            <ExpansionPanel
                className="lumx-spacing-margin-top-big"
                hasBackground
                hasHeaderDivider
                isOpen={isOpen2}
                toggleCallback={setOpen2}
            >
                <header>
                    <Grid className="lumx-spacing-margin-left-regular" hAlign={Alignment.center}>
                        <Thumbnail
                            image="https://picsum.photos/72/72/?random"
                            size={Size.m}
                            variant={ThumbnailVariant.rounded}
                        />

                        <div className="lumx-spacing-margin-left-big">
                            <span className="lumx-base-display-block lumx-typography-body1">With thumbnail</span>
                            <span className="lumx-base-display-block lumx-typography-caption lumx-theme-color-dark-L2">
                                And secondary text
                            </span>
                        </div>
                    </Grid>
                </header>

                <div className="lumx-spacing-padding-big">
                    <p className="lumx-typography-subtitle1">Curabitur est gravida et libero vitae dictum.</p>
                    <p className="lumx-typography-body1">Etiam habebis sem dicantur magna mollis euismod.</p>
                </div>
            </ExpansionPanel>

            <ExpansionPanel
                className="lumx-spacing-margin-top-big"
                hasBackground
                isOpen={isOpen3}
                toggleCallback={setOpen3}
            >
                <header>
                    <Grid className="lumx-spacing-margin-left-big" hAlign={Alignment.center}>
                        <GridItem>
                            <span className="lumx-base-display-block lumx-typography-body1">With secondary action</span>
                        </GridItem>

                        <IconButton
                            icon={mdiDotsVertical}
                            emphasis={Emphasis.low}
                            size={Size.m}
                            onClick={stopPropagation}
                        />
                    </Grid>
                </header>

                <div className="lumx-spacing-padding-big lumx-spacing-padding-top-none">
                    <p className="lumx-typography-subtitle1">Curabitur est gravida et libero vitae dictum.</p>
                    <p className="lumx-typography-body1">Etiam habebis sem dicantur magna mollis euismod.</p>
                </div>
            </ExpansionPanel>

            <ExpansionPanel className="lumx-spacing-margin-top-big" isOpen={isOpen4} toggleCallback={setOpen4}>
                <header>
                    <Grid hAlign={Alignment.center}>
                        <Thumbnail
                            image="https://picsum.photos/72/72/?random"
                            size={Size.m}
                            variant={ThumbnailVariant.rounded}
                        />

                        <span className="lumx-spacing-margin-left-big lumx-typography-body1">With Dividers</span>
                    </Grid>
                </header>

                <div className="lumx-spacing-padding-top">
                    <p className="lumx-typography-subtitle1">Curabitur est gravida et libero vitae dictum.</p>
                    <p className="lumx-typography-body1">Etiam habebis sem dicantur magna mollis euismod.</p>
                </div>
            </ExpansionPanel>

            <Divider className="lumx-spacing-margin-vertical-big" />

            <ExpansionPanel isOpen={isOpen5} toggleCallback={setOpen5}>
                <header>
                    <Grid hAlign={Alignment.center}>
                        <Thumbnail
                            image="https://picsum.photos/72/72/?random"
                            size={Size.m}
                            variant={ThumbnailVariant.rounded}
                        />

                        <span className="lumx-spacing-margin-left-big lumx-typography-body1">With Dividers</span>
                    </Grid>
                </header>

                <div className="lumx-spacing-padding-top">
                    <p className="lumx-typography-subtitle1">Curabitur est gravida et libero vitae dictum.</p>
                    <p className="lumx-typography-body1">Etiam habebis sem dicantur magna mollis euismod.</p>
                </div>
            </ExpansionPanel>

            <Divider className="lumx-spacing-margin-vertical-big" />

            <ExpansionPanel isOpen={isOpen6} toggleCallback={setOpen6}>
                <header>
                    <Grid hAlign={Alignment.center}>
                        <Thumbnail
                            image="https://picsum.photos/72/72/?random"
                            size={Size.m}
                            variant={ThumbnailVariant.rounded}
                        />

                        <span className="lumx-spacing-margin-left-big lumx-typography-body1">With Dividers</span>
                    </Grid>
                </header>

                <div className="lumx-spacing-padding-top">
                    <p className="lumx-typography-subtitle1">Curabitur est gravida et libero vitae dictum.</p>
                    <p className="lumx-typography-body1">Etiam habebis sem dicantur magna mollis euismod.</p>
                </div>
            </ExpansionPanel>
        </>
    );
};

export default App;
