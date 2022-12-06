import {
    ActionIcon,
    Button,
    Center,
    Col,
    Grid,
    Loader,
    Space,
    Text,
} from '@mantine/core';

import DataTable, { createTheme } from 'react-data-table-component';

import { useOrder } from '../hooks/orderHooks';

import jwt_decode from 'jwt-decode';

import { IconEdit, IconPrinterOff } from '@tabler/icons';

import { useOrderGlobalState } from '../globalState/currentOrder.state';

import { Navigate } from 'react-router-dom';

const ListOrder = () => {
    const [currentOrder, setCurrentOrder] = useOrderGlobalState(
        'currentOrder',
        {},
    );

    const { isLoading, data: orders, error, isError } = useOrder();

    if (isLoading) {
        return (
            <Grid>
                <Col span={12}>
                    <Center>
                        <Loader color="red"></Loader>
                    </Center>
                </Col>
            </Grid>
        );
    }

    if (isError) {
        return (
            <Grid>
                <Col span={12}>
                    <Center>
                        <Text size="md" color="red" weight={500}>
                            {error.message}
                        </Text>
                    </Center>
                </Col>
            </Grid>
        );
    }

    let column;
    let dataForTable = [];

    const formatNumberOrder = (number) => {
        return number.padStart(6, '0');
    };

    const loadOrder = () => {
        if (orders.length > 0) {
            let columns = [
                {
                    name: 'Mã ĐH',
                    selector: (row) => row.orderId,
                    sortable: true,
                },
                {
                    name: 'Số',
                    selector: (row) => row.numberOrder,
                    sortable: true,
                    width: '100px',
                    format: (row) =>
                        formatNumberOrder(row.numberOrder.toString()),
                },
                {
                    name: 'Tên KH',
                    selector: (row) => row.consumerName,
                    sortable: true,
                    wrap: true,
                },
                {
                    name: 'Tên NT',
                    selector: (row) => row.username,
                    sortable: true,
                    wrap: true,
                },
                {
                    name: 'Tên NV',
                    selector: (row) => row.staffName,
                    sortable: true,
                    wrap: true,
                },
                {
                    name: '#',
                    button: true,
                    wrap: true,
                    cell: (row) => (
                        <>
                            <ActionIcon
                                color="green"
                                variant="filled"
                                onClick={() => onEditClicked(row.orderId)}
                            >
                                <IconEdit size={15} />
                            </ActionIcon>
                            <Space w="xs" />
                            <ActionIcon
                                color="violet"
                                variant="filled"
                                onClick={() => onRePrintClicked(row.orderId)}
                            >
                                <IconPrinterOff size={15} />
                            </ActionIcon>
                        </>
                    ),
                },
            ];

            column = columns;

            const token = localStorage.getItem('token');

            if (!token) {
                return <Navigate to="/login" />;
            } else {
                let decodeToken = jwt_decode(token);

                if (!decodeToken.username) {
                    return <Navigate to="/login" />;
                } else {
                    if (decodeToken.role === 'admin') {
                        dataForTable = orders;
                    } else {
                        dataForTable = orders.filter(
                            (el) => el.staffId === decodeToken.staffId,
                        );
                    }
                }
            }
        }
    };

    loadOrder();

    createTheme('dark', {
        background: {
            default: 'transparent',
        },
    });

    const onEditClicked = (orderId) => {
        setCurrentOrder({});
        let find = orders.find((el) => el.orderId === orderId);
        setCurrentOrder(find);
    };

    const onRePrintClicked = (orderId) => {
        console.log(orderId);
    };

    return (
        <>
            <Grid>
                <Col span={12}>
                    {localStorage.getItem(
                        'mantine-color-scheme-selling-fruit',
                    ) === '"dark"' ? (
                        <DataTable
                            columns={column}
                            data={dataForTable}
                            theme="dark"
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[
                                5, 10, 50, 100, 200, 500,
                            ]}
                        />
                    ) : (
                        <DataTable
                            columns={column}
                            data={dataForTable}
                            pagination
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[
                                5, 10, 50, 100, 200, 500,
                            ]}
                        />
                    )}
                </Col>
            </Grid>
        </>
    );
};

export default ListOrder;
