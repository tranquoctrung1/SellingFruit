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
import { useOrder } from '../hooks/orderHooks';
import CreateOrderDetail from './createOrderDetail';

import { useState } from 'react';

const CreateBilling = () => {
    const [isInsert, setIsInsert] = useState(false);

    const { control, getValues, setValue } = useForm({
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
        let order = orders.find((el) => el.orderId === e);

        if (order !== undefined) {
            setValue('orderId', order.orderId);
            setValue('numberOrder', order.numberOrder);
            setValue('consumerId', order.consumerId);
            setValue('consumerName', order.consumerName);
            setValue('address', order.address);
            setValue('phoneNumber', order.phoneNumber);
            setValue('dateCreated', order.dateCreated);
            setValue('totalPrice', order.totalPrice);
            setValue('note', order.note);
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
    };

    const handleOrderIdBlur = (e) => {
        let findIndex = listOrderIds.indexOf(e.target.value);

        if (findIndex !== -1) {
        }
    };

    const handleOnSubmit = (e) => {
        console.log(getValues());
    };

    const handleOnUpdate = () => {
        console.log('update');
    };

    const handleOnDelete = () => {
        console.log('delte');
    };

    return (
        <div className="form-create-bill">
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
                                        onChange={handleOrderIdChange}
                                        {...field}
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
                                        onBlur={handleOrderIdBlur}
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
                                    {...field}
                                    onChange={handleConsumerNameChange}
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
                    <Col md={6} sm={12}>
                        <Controller
                            name="dateCreated"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    allowFreeInput
                                    placeholder="Ngày tạo đơn hàng"
                                    label="Ngày tạo đơn hàng"
                                    withAsterisk
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </Col>
                    <Col md={6} sm={12}>
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
                    </Col>
                    <Col md={6} sm={12}>
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
                    <Col span={12}>
                        <CreateOrderDetail orderId={getValues('orderId')} />
                    </Col>
                    <Col span={12}>
                        <Center>
                            <Button onClick={handleOnSubmit} color="green">
                                Thêm
                            </Button>
                            <Space w="md" />
                            <Button onClick={handleOnUpdate} color="blue">
                                Cập nhật
                            </Button>
                            <Space w="md" />
                            <Button onClick={handleOnDelete} color="red">
                                Xóa
                            </Button>
                        </Center>
                    </Col>
                </Grid>
            </form>
        </div>
    );
};

export default CreateBilling;
