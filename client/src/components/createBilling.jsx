import {
    Button,
    Center,
    Checkbox,
    Col,
    Grid,
    Loader,
    Select,
    Space,
    Text,
    TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Controller, useForm } from 'react-hook-form';

import { useConsumer, useConsumerByStaffId } from '../hooks/consumerHooks';
import {
    useDeleteOrder,
    useInsertOrder,
    useOrder,
    useOrderByStaffId,
    useUpdateOrder,
} from '../hooks/orderHooks';
import CreateOrderDetail from './createOrderDetail';

import 'react-notifications/lib/notifications.css';

import { NotificationContainer } from 'react-notifications';

import { useEffect, useState } from 'react';

import { useOrderGlobalState } from '../globalState/currentOrder.state';
import { useOrderDetailGlobalState } from '../globalState/orderDetail.state';

import {
    deleteOrderDetail,
    insertOrderDetail,
    updateOrderDetail,
} from '../apis/orderDetail.api';

import Swal from 'sweetalert2';

import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

import { getBigestNumberOrder } from '../apis/order.api';

const CreateBilling = () => {
    const [isInsert, setIsInsert] = useState(true);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [errorOrderId, setErrorOrderId] = useState('');
    const [errorNumberOrder, setErrorNumberOrder] = useState('');
    const [errorConsumerId, setErrorConsumerId] = useState('');
    const [errorConsumerName, setErrorConsumerName] = useState('');
    const [errorDateCreated, setErrorDateCreated] = useState('');
    const [dateCreated, setDateCreated] = useState(null);

    const useInsertOrderMutation = useInsertOrder();
    const useUpdateOrderMutation = useUpdateOrder();
    const useDeleteOrderMutation = useDeleteOrder();

    const [listOrderDetail, setListOrderDetail] = useOrderDetailGlobalState(
        'listOrderDetail',
        [],
    );

    const [currentOrder, setCurrentOrder] = useOrderGlobalState(
        'currentOrder',
        {},
    );

    const {
        control,
        getValues,
        setValue,
        register,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            orderId: '',
            consumerId: '',
            consumerName: '',
            address: '',
            phoneNumber: '',
            numberOrder: '',
            dateCreated: new Date(Date.now()),
            totalPrice: 0,
            receiver: '',
            transpoter: '',
            status: 2,
            note: '',
            username: '',
            staffName: '',
            staffId: '',
            allowPrint: 2,
        },
    });

    useEffect(() => {
        if (Object.keys(currentOrder).length !== 0) {
            let order = currentOrder;
            if (order != null && order !== undefined) {
                setValue('orderId', order.orderId);
                setValue('numberOrder', order.numberOrder);
                setValue('consumerId', order.consumerId);
                setValue('consumerName', order.consumerName);
                setValue('address', order.address);
                setValue('phoneNumber', order.phoneNumber);
                setValue('dateCreated', new Date(order.dateCreated));
                setDateCreated(new Date(order.dateCreated));
                setValue('totalPrice', order.totalPrice);
                setValue('note', order.note);
                setValue('username', order.username);
                setValue('staffName', order.staffName);
                setValue('staffId', order.staffId);
                setValue('allowPrint', order.allowPrint);

                setSelectedOrderId(order.orderId);
            }
        }
    }, [currentOrder]);

    const {
        isLoading: isLoadingOrder,
        data: orders,
        error: errorOrder,
        isError: isErrorOrder,
    } = useOrder();
    const {
        isLoading: isLoadingConsumer,
        data: consumers,
        error: errorConsumer,
        isError: isErrorConsumer,
    } = useConsumerByStaffId(
        jwt_decode(localStorage.getItem('token')).role,
        jwt_decode(localStorage.getItem('token')).staffId,
    );

    if (isLoadingConsumer || isLoadingOrder) {
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

    if (isErrorConsumer && isErrorOrder) {
        return (
            <Grid>
                <Col span={12}>
                    <Center>
                        <Text size="md" color="red" weight={500}>
                            {errorOrder.message} {errorConsumer.message}
                        </Text>
                    </Center>
                </Col>
            </Grid>
        );
    }

    let listOrderIds = [];
    if (orders != null && orders !== undefined) {
        if (orders.length > 0) {
            for (let order of orders) {
                let findIndex = listOrderIds.indexOf(order.orderId);

                if (findIndex === -1) {
                    listOrderIds.push(order.orderId);
                }
            }
        }
    }

    let listConsumerName = [];

    if (consumers != null && consumers !== undefined) {
        if (consumers.length > 0) {
            for (let consumer of consumers) {
                let findIndex = listConsumerName.indexOf(consumer.consumerName);

                if (findIndex === -1) {
                    listConsumerName.push(consumer.consumerName);
                }
            }
        }
    }

    const handleOrderIdChange = (e) => {
        let order = orders.find((el) => el.orderId === e.target.value);

        if (order !== undefined) {
            setValue('orderId', order.orderId);
            setValue('numberOrder', order.numberOrder);
            setValue('consumerId', order.consumerId);
            setValue('consumerName', order.consumerName);
            setValue('address', order.address);
            setValue('phoneNumber', order.phoneNumber);
            setValue('dateCreated', new Date(order.dateCreated));
            setDateCreated(new Date(order.dateCreated));
            setValue('totalPrice', order.totalPrice);
            setValue('note', order.note);
            setValue('username', order.username);
            setValue('staffName', order.staffName);
            setValue('staffId', order.staffId);
            setValue('username', order.username);
            setValue('staffName', order.staffName);
            setValue('staffId', order.staffId);
            setValue('allowPrint', order.allowPrint);
            setSelectedOrderId(order.orderId);

            setCurrentOrder(order);
        }
    };

    const handleConsumerNameChange = (e) => {
        let consumer = consumers.find((el) => el.consumerName === e);

        setValue('consumerId', consumer.consumerId);
        setValue('consumerName', consumer.consumerName);
        setValue('address', consumer.address);
        setValue('phoneNumber', consumer.phoneNumber);

        setSelectedOrderId(consumer.consumerId);
    };

    const ChangeModeClicked = () => {
        setIsInsert(!isInsert);
        //reset((formValue) => ({ ...formValue, orderId: '' }));
        reset();
    };

    const handleOnSubmit = (e) => {
        const formValue = getValues();
        let isAllowSubmit = true;

        // if (formValue.orderId === '') {
        //     setErrorOrderId('M?? ????n h??ng kh??ng ???????c b??? tr???ng!!');
        //     isAllowSubmit = false;
        // } else {
        //     let findIndexOrderId = listOrderIds.indexOf(formValue.orderId);

        //     if (findIndexOrderId !== -1) {
        //         setErrorOrderId('M?? ????n h??ng ???? t???n t???i!!');
        //         isAllowSubmit = false;
        //     } else {
        //         setErrorOrderId('');
        //     }
        // }
        // if (formValue.numberOrder === '') {
        //     setErrorNumberOrder('S??? c???a ????n h??ng kh??ng ???????c tr???ng!!');
        //     isAllowSubmit = false;
        // } else {
        //     if (/^\d+$/.test(formValue.numberOrder) == false) {
        //         setErrorNumberOrder('S??? c???a ????n h??ng ph???i l?? s???!!');
        //         isAllowSubmit = false;
        //     } else {
        //         setErrorNumberOrder('');
        //     }
        // }
        if (formValue.consumerName === '') {
            setErrorConsumerName('T??n kh??ch h??ng kh??ng ???????c tr???ng!!');
            isAllowSubmit = false;
        } else {
            setErrorConsumerName('');
        }
        if (formValue.consumerId === '') {
            setErrorConsumerId('M?? kh??ch h??ng kh??ng ???????c tr???ng!!');
            isAllowSubmit = false;
        } else {
            setErrorConsumerId('');
        }
        if (formValue.dateCreated === '') {
            setErrorDateCreated('Ng??y t???o ????n h??ng kh??ng ???????c tr???ng!!');
            isAllowSubmit = false;
        } else {
            setErrorDateCreated('');
        }

        if (isAllowSubmit === true) {
            const token = localStorage.getItem('token');

            if (!token) {
                return <Navigate to="/login" />;
            } else {
                let decodeToken = jwt_decode(token);

                if (!decodeToken.username) {
                    return <Navigate to="/login" />;
                } else {
                    let date = new Date(formValue.dateCreated);
                    date = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        7,
                        0,
                        0,
                    );
                    formValue.dateCreated = date;

                    formValue.orderId = `${decodeToken.username}`;
                    formValue.username = decodeToken.username;
                    formValue.staffId = decodeToken.staffId;
                    formValue.staffName = decodeToken.staffName;
                    let temp = [];

                    for (let item of listOrderDetail) {
                        let obj = {};
                        obj.orderId = formValue.orderId;
                        obj.productId = item.productId;
                        obj.productName = item.productName;
                        obj.amount = item.amount;
                        obj.price = item.price;
                        obj.note = item.note;

                        temp.push(obj);
                    }

                    formValue.listOrderDetail = [...temp];

                    useInsertOrderMutation.mutate(formValue);

                    //insertOrderDetail(temp);
                    //setCurrentOrder(formValue);
                }
            }
        }
    };

    const handleOnUpdate = () => {
        const formValue = getValues();

        let isAllowUpdate = true;

        // if (formValue.orderId === '') {
        //     setErrorOrderId('M?? ????n h??ng kh??ng ???????c b??? tr???ng!!');
        //     isAllowUpdate = false;
        // }
        // if (formValue.numberOrder === '') {
        //     setErrorNumberOrder('S??? c???a ????n h??ng kh??ng ???????c tr???ng!!');
        //     isAllowUpdate = false;
        // } else {
        //     if (/^\d+$/.test(formValue.numberOrder) === false) {
        //         setErrorNumberOrder('S??? c???a ????n h??ng ph???i l?? s???!!');
        //         isAllowUpdate = false;
        //     } else {
        //         setErrorNumberOrder('');
        //     }
        // }
        if (formValue.consumerName === '') {
            setErrorConsumerName('T??n kh??ch h??ng kh??ng ???????c tr???ng!!');
            isAllowUpdate = false;
        } else {
            setErrorConsumerName('');
        }
        if (formValue.consumerId === '') {
            setErrorConsumerId('M?? kh??ch h??ng kh??ng ???????c tr???ng!!');
            isAllowUpdate = false;
        } else {
            setErrorConsumerId('');
        }
        if (formValue.dateCreated === '') {
            setErrorDateCreated('Ng??y t???o ????n h??ng kh??ng ???????c tr???ng!!');
            isAllowUpdate = false;
        } else {
            setErrorDateCreated('');
        }

        if (isAllowUpdate === true) {
            let date = new Date(formValue.dateCreated);
            date = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                7,
                0,
                0,
            );
            formValue.dateCreated = date;

            useUpdateOrderMutation.mutate(formValue);

            let temp = [];

            for (let item of listOrderDetail) {
                let obj = {};
                obj.orderId = formValue.orderId;
                obj.productId = item.productId;
                obj.productName = item.productName;
                obj.amount = item.amount;
                obj.price = item.price;
                obj.note = item.note;

                temp.push(obj);
            }
            updateOrderDetail(temp, formValue.orderId);
            setCurrentOrder(formValue);
        }
    };

    const handleOnDelete = () => {
        const formValue = getValues();

        if (formValue.orderId === '') {
            setErrorOrderId('M?? ????n h??ng kh??ng ???????c b??? tr???ng!!');
        } else {
            setErrorOrderId('');
            Swal.fire({
                title: 'B???n c?? ch???c mu???n x??a?',
                text: 'Thinking before you click!!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#0f0',
                confirmButtonText: 'X??a',
                cancelButtonText: 'H???y',
            }).then((result) => {
                if (result.isConfirmed) {
                    useDeleteOrderMutation.mutate(formValue.orderId);
                    deleteOrderDetail(formValue.orderId);
                    setListOrderDetail([]);
                    setCurrentOrder({});

                    reset();
                }
            });
        }
    };

    const onOrderIdBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            //setErrorOrderId('');
            //setSelectedOrderId(e.target.value);
        }
    };

    const onNumberOrderBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            //setErrorNumberOrder('');
        }
    };

    const onConsumerNameBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorConsumerName('');
        }
    };

    const onConsumerIdBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorConsumerId('');
        }
    };

    const onDateCreatedBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorDateCreated('');
        }
    };

    const isAdmin = () => {
        return jwt_decode(localStorage.getItem('token')).role === 'admin';
    };

    return (
        <div className="form-create-bill">
            <NotificationContainer />
            <form>
                <Grid>
                    <Col span={12}>
                        <Checkbox
                            label={
                                isInsert === false
                                    ? 'Select Mode'
                                    : 'Insert Mode'
                            }
                            checked={isInsert}
                            onChange={ChangeModeClicked}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        {isInsert === false ? (
                            <Controller
                                name="orderId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        //withAsterisk
                                        label="M?? ????n h??ng"
                                        placeholder="M?? ????n h??ng"
                                        searchable
                                        nothingFound="Kh??ng c?? ????n h??ng"
                                        maxDropdownHeight={280}
                                        disabled={true}
                                        data={listOrderIds}
                                        {...register('orderId', {
                                            onChange: handleOrderIdChange,
                                            onBlur: onOrderIdBlur,
                                        })}
                                        {...field}
                                        error={errorOrderId}
                                    />
                                )}
                            ></Controller>
                        ) : (
                            <Controller
                                name="orderId"
                                control={control}
                                render={({ field }) => (
                                    <TextInput
                                        //withAsterisk
                                        label="M?? ????n h??ng"
                                        placeholder="M?? ????n h??ng"
                                        error={errorOrderId}
                                        disabled={true}
                                        {...register('orderId', {
                                            onBlur: onOrderIdBlur,
                                        })}
                                        {...field}
                                        style={{
                                            label: {
                                                marginBottom: '5px',
                                            },
                                        }}
                                    />
                                )}
                            ></Controller>
                        )}
                    </Col>
                    <Col md={6} sm={12}>
                        <Controller
                            name="numberOrder"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    // withAsterisk
                                    label="S??? c???a ????n h??ng"
                                    placeholder="Nh???p s??? c???a ????n h??ng"
                                    disabled={true}
                                    error={errorNumberOrder}
                                    {...field}
                                    {...register('numberOrder', {
                                        onBlur: onNumberOrderBlur,
                                    })}
                                    style={{
                                        label: {
                                            marginBottom: '5px',
                                        },
                                    }}
                                />
                            )}
                        ></Controller>
                    </Col>
                    <Col md={6} sm={12}>
                        <Controller
                            name="consumerName"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    withAsterisk
                                    label="T??n kh??ch h??ng"
                                    placeholder="T??n kh??ch h??ng"
                                    searchable
                                    nothingFound="Kh??ng c?? kh??ch h??ng"
                                    maxDropdownHeight={280}
                                    data={listConsumerName}
                                    {...register('consumerName', {
                                        onBlur: onConsumerNameBlur,
                                    })}
                                    {...field}
                                    onChange={handleConsumerNameChange}
                                    error={errorConsumerName}
                                />
                            )}
                        ></Controller>
                    </Col>
                    <Col md={6} sm={12}>
                        <Controller
                            name="consumerId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    withAsterisk
                                    label="M?? kh??ch h??ng"
                                    placeholder="M?? kh??ch h??ng"
                                    disabled
                                    {...field}
                                    {...register('consumerId', {
                                        onBlur: onConsumerIdBlur,
                                    })}
                                    error={errorConsumerId}
                                    style={{
                                        label: {
                                            marginBottom: '5px',
                                        },
                                    }}
                                />
                            )}
                        ></Controller>
                    </Col>
                    <Col md={6} sm={12}>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="S??? ??i???n tho???i"
                                    placeholder="Nh???p s??? ??i???n tho???i"
                                    {...field}
                                    style={{
                                        label: {
                                            marginBottom: '5px',
                                        },
                                    }}
                                />
                            )}
                        ></Controller>
                    </Col>
                    <Col md={6} sm={12}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="?????a ch???"
                                    placeholder="?????a ch???"
                                    {...field}
                                    style={{
                                        label: {
                                            marginBottom: '5px',
                                        },
                                    }}
                                />
                            )}
                        ></Controller>
                    </Col>
                    <Col span={12}>
                        <Controller
                            name="dateCreated"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    disabled={!isAdmin()}
                                    defaultValue={dateCreated}
                                    allowFreeInput
                                    placeholder="Ng??y t???o ????n h??ng"
                                    label="Ng??y t???o ????n h??ng"
                                    withAsterisk
                                    {...register('dateCreated', {
                                        onBlur: onDateCreatedBlur,
                                    })}
                                    error={errorDateCreated}
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </Col>
                    {/* <Col md={6} sm={12}>
                        <Controller
                            name="totalPrice"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="T???ng ti???n"
                                    placeholder="T???ng ti???n"
                                    {...field}
                                    style={{
                                        label: {
                                            marginBottom: '5px',
                                        },
                                    }}
                                />
                            )}
                        ></Controller>
                    </Col> */}
                    <Col span={12}>
                        <Controller
                            name="note"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Ghi ch??"
                                    placeholder="Ghi ch??"
                                    {...field}
                                    style={{
                                        label: {
                                            marginBottom: '5px',
                                        },
                                    }}
                                />
                            )}
                        ></Controller>
                    </Col>
                    {selectedOrderId !== '' &&
                    selectedOrderId != null &&
                    selectedOrderId !== undefined ? (
                        <Col span={12}>
                            <CreateOrderDetail orderId={getValues().orderId} />
                        </Col>
                    ) : null}

                    <Col span={12}>
                        <Center>
                            {isInsert === false ? (
                                <>
                                    <Button
                                        onClick={handleOnUpdate}
                                        color="blue"
                                    >
                                        C???p nh???t
                                    </Button>
                                    {jwt_decode(localStorage.getItem('token'))
                                        .role === 'admin' ? (
                                        <>
                                            <Space w="md" />
                                            <Button
                                                onClick={handleOnDelete}
                                                color="red"
                                            >
                                                X??a
                                            </Button>
                                        </>
                                    ) : null}
                                </>
                            ) : (
                                <Button onClick={handleOnSubmit} color="green">
                                    Th??m
                                </Button>
                            )}
                        </Center>
                    </Col>
                </Grid>
            </form>
        </div>
    );
};

export default CreateBilling;
