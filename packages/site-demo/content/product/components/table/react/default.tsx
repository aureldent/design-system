import React, { useCallback, useState } from 'react';

import orderBy from 'lodash/orderBy';

import { mdiCommentOutline } from '@lumx/icons';
import {
    Table,
    TableBody,
    TableCell,
    TableCellVariant,
    TableHeader,
    TableHeaderProps,
    TableRow,
    ThOrder,
    ThScope,
} from '@lumx/react';

const initialTable = [
    {
        calories: 159,
        comments: 'Lorem ipsum',
        dessert: 'Frozen yogurt',
        fat: 6.0,
        id: 1,
    },
    {
        calories: 237,
        comments: 'Lorem ipsum',
        dessert: 'Ice cream sandwich',
        fat: 9.0,
        id: 2,
    },
    {
        calories: 262,
        comments: 'Lorem ipsum',
        dessert: 'Eclair',
        fat: 16.0,
        id: 3,
    },
];
const initialHeaders: Array<Partial<TableHeaderProps>> = [
    {
        isSortable: true,
        label: 'Dessert',
        name: 'dessert',
        scope: ThScope.col,
    },
    {
        isSortable: true,
        label: 'Calories',
        name: 'calories',
        scope: ThScope.col,
    },
    {
        isSortable: true,
        label: 'Fat (g)',
        name: 'fat',
        scope: ThScope.col,
    },
    {
        icon: mdiCommentOutline,
        isSortable: false,
        label: 'Comments',
        name: 'comments',
        scope: ThScope.col,
    },
];

const App = ({ theme }: any) => {
    const [tableHeader, setTableHeader] = useState(initialHeaders);
    const [tableBody, setTableBody] = useState(initialTable);
    const toggleSort = useCallback(
        (header) => {
            const sortOrder = header.sortOrder === ThOrder.asc ? ThOrder.desc : ThOrder.asc;
            setTableHeader(
                tableHeader.map((h) => ({
                    ...h,
                    sortOrder: h.name === header.name ? sortOrder : null,
                })),
            );
            setTableBody(orderBy(tableBody, header.name, sortOrder));
        },
        [tableHeader, tableBody],
    );

    return (
        <>
            <Table hasDividers theme={theme}>
                <TableHeader>
                    <TableRow>
                        {tableHeader.map((header) => {
                            const onHeaderClick = () => toggleSort(header);
                            return (
                                <TableCell
                                    key={header.name}
                                    icon={header.icon}
                                    isSortable={header.isSortable}
                                    scope={header.scope}
                                    sortOrder={header.sortOrder}
                                    variant={TableCellVariant.head}
                                    onHeaderClick={onHeaderClick}
                                >
                                    {header.label}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tableBody.map((body) => (
                        <TableRow key={body.id}>
                            <TableCell>{body.dessert}</TableCell>
                            <TableCell>{String(body.calories)}</TableCell>
                            <TableCell>{String(body.fat)}</TableCell>
                            <TableCell>{body.comments}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default App;
