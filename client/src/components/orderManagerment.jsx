import {
    ActionIcon,
    Center,
    Col,
    Grid,
    Kbd,
    Loader,
    Space,
    Text,
    TextInput,
} from '@mantine/core';

import DataTable, { createTheme } from 'react-data-table-component';

import { useOrder, useUpdatePrintOrder } from '../hooks/orderHooks';

import jwt_decode from 'jwt-decode';

import {
    IconEdit,
    IconPrinterOff,
    IconRotate360,
    IconSearch,
} from '@tabler/icons';

import { useOrderGlobalState } from '../globalState/currentOrder.state';

import { Navigate } from 'react-router-dom';

import { useState } from 'react';

import { NotificationContainer } from 'react-notifications';

import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';

const OrderManagerment = () => {
    const [isFilterData, setIsFilterData] = useState(false);
    const [dataFilter, setFilterData] = useState([]);

    const [currentOrder, setCurrentOrder] = useOrderGlobalState(
        'currentOrder',
        {},
    );

    const { isLoading, data: orders, error, isError } = useOrder();

    const useUpdatePrintOrderMutation = useUpdatePrintOrder();

    const navigate = useNavigate();

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

    const convertDateToString = (time) => {
        if (
            time !== null &&
            time !== undefined &&
            time.toString().trim() !== ''
        ) {
            let date = new Date(time);
            let year = date.getFullYear();
            let month =
                date.getMonth() + 1 >= 10
                    ? date.getMonth() + 1
                    : `0${date.getMonth() + 1}`;
            let day =
                date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
            let hours =
                date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
            let minute =
                date.getMinutes() >= 10
                    ? date.getMinutes()
                    : `0${date.getMinutes()}`;
            let second =
                date.getSeconds() >= 10
                    ? date.getSeconds()
                    : `0${date.getSeconds()}`;

            return `${day}/${month}/${year} ${hours}:${minute}:${second}`;
        }
        return '';
    };

    const loadOrder = () => {
        if (orders.length > 0) {
            let columns = [
                {
                    name: 'Mã đơn hàng',
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
                    name: 'Tên khách hàng',
                    selector: (row) => row.consumerName,
                    sortable: true,
                    wrap: true,
                },
                {
                    name: 'Tên người tạo (tài khoản)',
                    selector: (row) => row.username,
                    sortable: true,
                    wrap: true,
                },
                {
                    name: 'Ngày tạo đơn hàng',
                    selector: (row) => row.dateCreated,
                    format: (row) =>
                        convertDateToString(new Date(row.dateCreated)),
                    sortable: true,
                    wrap: true,
                },
                {
                    name: 'Ghi chú',
                    selector: (row) => row.note,
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
                            {jwt_decode(localStorage.getItem('token')).role !==
                            'admin' ? (
                                row.status === 1 ? (
                                    <>
                                        <Space w="xs" />
                                        <ActionIcon
                                            color="violet"
                                            variant="filled"
                                            onClick={() =>
                                                onRequestPrintClicked(
                                                    row.orderId,
                                                )
                                            }
                                        >
                                            <IconPrinterOff size={15} />
                                        </ActionIcon>
                                    </>
                                ) : null
                            ) : row.status === 2 ? (
                                <>
                                    <Space w="xs" />
                                    <ActionIcon
                                        color="violet"
                                        variant="filled"
                                        onClick={() =>
                                            onAllowPrintOrderClicked(
                                                row.orderId,
                                            )
                                        }
                                    >
                                        <IconRotate360 size={15} />
                                    </ActionIcon>
                                </>
                            ) : null}
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
        localStorage.setItem('currentOrder', JSON.stringify(find));
        navigate('/');
    };

    const onRequestPrintClicked = (orderId) => {
        Swal.fire({
            title: 'Bạn có chắc yêu cầu in hóa đơn lại ?',
            text: 'Thinking before you click!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0f0',
            confirmButtonText: 'Yêu cầu',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                let find = orders.find((el) => el.orderId === orderId);

                find.allowPrint = 2;
                find.status = 2;

                useUpdatePrintOrderMutation.mutate(find);
            }
        });
    };

    const onAllowPrintOrderClicked = (orderId) => {
        Swal.fire({
            title: 'Bạn có chắc muốn duyệt in lại hóa đơn này?',
            text: 'Thinking before you click!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0f0',
            confirmButtonText: 'Duyệt',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                let find = orders.find((el) => el.orderId === orderId);

                find.allowPrint = 0;
                find.status = 0;

                useUpdatePrintOrderMutation.mutate(find);
            }
        });
    };

    const rightSection = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Kbd>Ctrl</Kbd>
            <span style={{ margin: '0 5px' }}>+</span>
            <Kbd>K</Kbd>
        </div>
    );

    const filterOrder = (consumerName) => {
        if (consumerName !== '') {
            let data = orders.filter(
                (el) =>
                    el.consumerName !== null &&
                    el.consumerName !== undefined &&
                    el.consumerName !== '' &&
                    el.consumerName
                        .toLowerCase()
                        .indexOf(consumerName.toLowerCase()) !== -1 &&
                    el.staffId ===
                        jwt_decode(localStorage.getItem('token')).staffId,
            );
            setIsFilterData(true);
            setFilterData([...data]);
        } else {
            setIsFilterData(false);
            setFilterData([...orders]);
        }
    };

    let filterTimeout;

    const onSearchConsumerNameChange = (e) => {
        clearTimeout(filterTimeout);
        if (!e.target.value) return filterOrder('');

        filterTimeout = setTimeout(() => {
            filterOrder(e.target.value);
        }, 1000);
    };

    return (
        <>
            <NotificationContainer />
            <Grid>
                <Col span={12}>
                    <TextInput
                        placeholder="Tên khách hàng"
                        icon={<IconSearch size={16} />}
                        rightSectionWidth={90}
                        rightSection={rightSection}
                        styles={{ rightSection: { pointerEvents: 'none' } }}
                        onChange={onSearchConsumerNameChange}
                    />
                </Col>
                <Col span={12}>
                    {isFilterData === false ? (
                        localStorage.getItem(
                            'mantine-color-scheme-selling-fruit',
                        ) === '"dark"' ? (
                            <DataTable
                                columns={column}
                                data={dataForTable}
                                theme="dark"
                                pagination
                                paginationPerPage={30}
                                paginationRowsPerPageOptions={[
                                    30, 50, 100, 200, 500,
                                ]}
                            />
                        ) : (
                            <DataTable
                                columns={column}
                                data={dataForTable}
                                pagination
                                paginationPerPage={30}
                                paginationRowsPerPageOptions={[
                                    30, 50, 100, 200, 500,
                                ]}
                            />
                        )
                    ) : localStorage.getItem(
                          'mantine-color-scheme-selling-fruit',
                      ) === '"dark"' ? (
                        <DataTable
                            columns={column}
                            data={dataFilter}
                            theme="dark"
                            pagination
                            paginationPerPage={30}
                            paginationRowsPerPageOptions={[
                                30, 50, 100, 200, 500,
                            ]}
                        />
                    ) : (
                        <DataTable
                            columns={column}
                            data={dataFilter}
                            pagination
                            paginationPerPage={30}
                            paginationRowsPerPageOptions={[
                                30, 50, 100, 200, 500,
                            ]}
                        />
                    )}
                </Col>
            </Grid>
        </>
    );
};

export default OrderManagerment;
