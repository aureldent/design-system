import React from 'react';

import { Avatar, Icon, List, ListItem, ListSubheader, Size, Thumbnail, ThumbnailVariant } from '@lumx/react';

import { mdiSend } from '@lumx/icons';

const App = () => (
    <>
        <List>
            <ListSubheader>text only</ListSubheader>

            <ListItem size={Size.tiny}>Single-line item</ListItem>
            <ListItem size={Size.tiny}>Single-line item</ListItem>
            <ListItem size={Size.tiny}>Single-line item</ListItem>

            <ListSubheader>rich</ListSubheader>

            <ListItem size={Size.tiny} before={<Icon icon={mdiSend} size={Size.xs} />}>
                Single-line item
            </ListItem>

            <ListItem
                size={Size.tiny}
                before={
                    <Thumbnail variant={ThumbnailVariant.rounded} image="https://picsum.photos/48" size={Size.xs} />
                }
            >
                Single-line item
            </ListItem>

            <ListItem size={Size.tiny} before={<Avatar image="http://i.pravatar.cc/48" size={Size.xs} />}>
                Single-line item
            </ListItem>
        </List>
    </>
);

export default App;
