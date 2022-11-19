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

import { useConsumer } from '../hooks/consumerHooks';
import {
    useDeleteOrder,
    useInsertOrder,
    useOrder,
    useUpdateOrder,
} from '../hooks/orderHooks';
import CreateOrderDetail from './createOrderDetail';

import 'react-notifications/lib/notifications.css';

import { NotificationContainer } from 'react-notifications';

import { useState } from 'react';

import { useOrderGlobalState } from '../globalState/currentOrder.state';
import { useOrderDetailGlobalState } from '../globalState/orderDetail.state';

import {
    deleteOrderDetail,
    insertOrderDetail,
    updateOrderDetail,
} from '../apis/orderDetail.api';

import Swal from 'sweetalert2';

const CreateBilling = () => {
    const [isInsert, setIsInsert] = useState(false);
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
            status: 0,
            note: '',
        },
    });

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
    } = useConsumer();

    if (isLoadingConsumer && isLoadingOrder) {
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
    };

    const ChangeModeClicked = () => {
        setIsInsert(!isInsert);
        reset((formValue) => ({ ...formValue, orderId: '' }));
    };

    const handleOnSubmit = (e) => {
        const formValue = getValues();
        let isAllowSubmit = true;

        if (formValue.orderId === '') {
            setErrorOrderId('Mã đơn hàng không được bỏ trống!!');
            isAllowSubmit = false;
        } else {
            let findIndexOrderId = listOrderIds.indexOf(formValue.orderId);

            if (findIndexOrderId !== -1) {
                setErrorOrderId('Mã đơn hàng đã tồn tại!!');
                isAllowSubmit = false;
            } else {
                setErrorOrderId('');
            }
        }
        if (formValue.numberOrder === '') {
            setErrorNumberOrder('Số của đơn hàng không được trống!!');
            isAllowSubmit = false;
        } else {
            if (/^\d+$/.test(formValue.numberOrder) == false) {
                setErrorNumberOrder('Số của đơn hàng phải là số!!');
                isAllowSubmit = false;
            } else {
                setErrorNumberOrder('');
            }
        }
        if (formValue.consumerName === '') {
            setErrorConsumerName('Tên khách hàng không được trống!!');
            isAllowSubmit = false;
        } else {
            setErrorConsumerName('');
        }
        if (formValue.consumerId === '') {
            setErrorConsumerId('Mã khách hàng không được trống!!');
            isAllowSubmit = false;
        } else {
            setErrorConsumerId('');
        }
        if (formValue.dateCreated === '') {
            setErrorDateCreated('Ngày tạo đơn hàng không được trống!!');
            isAllowSubmit = false;
        } else {
            setErrorDateCreated('');
        }

        if (isAllowSubmit === true) {
            formValue.dateCreated.setHours(
                formValue.dateCreated.getHours() + 7,
            );
            useInsertOrderMutation.mutate(formValue);
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

            insertOrderDetail(temp);
        }
    };

    const handleOnUpdate = () => {
        const formValue = getValues();

        let isAllowUpdate = true;

        if (formValue.orderId === '') {
            setErrorOrderId('Mã đơn hàng không được bỏ trống!!');
            isAllowUpdate = false;
        }
        if (formValue.numberOrder === '') {
            setErrorNumberOrder('Số của đơn hàng không được trống!!');
            isAllowUpdate = false;
        } else {
            if (/^\d+$/.test(formValue.numberOrder) === false) {
                setErrorNumberOrder('Số của đơn hàng phải là số!!');
                isAllowUpdate = false;
            } else {
                setErrorNumberOrder('');
            }
        }
        if (formValue.consumerName === '') {
            setErrorConsumerName('Tên khách hàng không được trống!!');
            isAllowUpdate = false;
        } else {
            setErrorConsumerName('');
        }
        if (formValue.consumerId === '') {
            setErrorConsumerId('Mã khách hàng không được trống!!');
            isAllowUpdate = false;
        } else {
            setErrorConsumerId('');
        }
        if (formValue.dateCreated === '') {
            setErrorDateCreated('Ngày tạo đơn hàng không được trống!!');
            isAllowUpdate = false;
        } else {
            setErrorDateCreated('');
        }

        if (isAllowUpdate === true) {
            formValue.dateCreated.setHours(
                formValue.dateCreated.getHours() + 7,
            );
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
        }
    };

    const handleOnDelete = () => {
        const formValue = getValues();

        if (formValue.orderId === '') {
            setErrorOrderId('Mã đơn hàng không được bỏ trống!!');
        } else {
            setErrorOrderId('');
            Swal.fire({
                title: 'Bạn có chắc muốn xóa?',
                text: 'Thinking before you click!!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#0f0',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
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
            setErrorOrderId('');
            setSelectedOrderId(e.target.value);
        }
    };

    const onNumberOrderBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorNumberOrder('');
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
                                        withAsterisk
                                        label="Mã đơn hàng"
                                        placeholder="Mã đơn hàng"
                                        searchable
                                        nothingFound="Không có đơn hàng"
                                        maxDropdownHeight={280}
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
                                        withAsterisk
                                        label="Mã đơn hàng"
                                        placeholder="Mã đơn hàng"
                                        error={errorOrderId}
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
                                    withAsterisk
                                    label="Số của đơn hàng"
                                    placeholder="Nhập số của đơn hàng"
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
                                    label="Tên khách hàng"
                                    placeholder="Tên khách hàng"
                                    searchable
                                    nothingFound="Không có khách hàng"
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
                                    label="Mã khách hàng"
                                    placeholder="Mã khách hàng"
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
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
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
                                    label="Địa chỉ"
                                    placeholder="Địa chỉ"
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
                                    defaultValue={dateCreated}
                                    allowFreeInput
                                    placeholder="Ngày tạo đơn hàng"
                                    label="Ngày tạo đơn hàng"
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
                                    label="Tổng tiền"
                                    placeholder="Tổng tiền"
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
                                    label="Ghi chú"
                                    placeholder="Ghi chú"
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
                                        Cập nhật
                                    </Button>
                                    <Space w="md" />
                                    <Button
                                        onClick={handleOnDelete}
                                        color="red"
                                    >
                                        Xóa
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={handleOnSubmit} color="green">
                                    Thêm
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
