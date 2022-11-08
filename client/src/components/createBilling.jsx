import {
    Button,
    Center,
    Col,
    Grid,
    Select,
    Space,
    TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';

import { useConsumer } from '../hooks/consumerHooks';
import { useOrder } from '../hooks/orderHooks';

const CreateBilling = () => {
    const form = useForm({
        initialValues: {
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

        validate: {
            orderId: (value) =>
                value.length > 0 ? null : 'Mã đơn hàng không được trống',
            numberOrder: (value) =>
                /^\d+$/.test(value)
                    ? null
                    : 'Số của đơn hàng không được trống và phải là số (0 - 9)',
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
        return <div>Loading ....</div>;
    }

    if (isErrorConsumer && isErrorOrder) {
        return (
            <div>
                Error: {errorConsumer.message} {errorOrder.message}{' '}
            </div>
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

        form.setValues({
            ...form.values,
            orderId: order.orderId,
            numberOrder: order.numberOrder,
            consumerId: order.consumerId,
            consumerName: order.consumerName,
            address: order.address,
            phoneNumber: order.phoneNumber,
            note: order.note,
            totalPrice: order.totalPrice,
        });
    };

    const handleConsumerNameChange = (e) => {
        let consumer = consumers.find((el) => el.consumerName === e);

        form.setValues({
            ...form.values,
            consumerId: consumer.consumerId,
            consumerName: consumer.consumerName,
            address: consumer.address,
            phoneNumber: consumer.phoneNumber,
        });
    };

    const handleOnSubmit = (e) => {
        console.log(form.validate());

        console.log(form.values);
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
                    <Col md={6} sm={12}>
                        <Select
                            withAsterisk
                            label="Mã đơn hàng"
                            placeholder="Mã đơn hàng"
                            searchable
                            creatable
                            nothingFound="Không có đơn hàng"
                            maxDropdownHeight={280}
                            data={listOrderIds}
                            {...form.getInputProps('orderId')}
                            onChange={handleOrderIdChange}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <TextInput
                            withAsterisk
                            label="Số của đơn hàng"
                            placeholder="Nhập số của đơn hàng"
                            {...form.getInputProps('numberOrder')}
                            style={{
                                label: {
                                    marginBottom: '5px',
                                },
                            }}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <Select
                            withAsterisk
                            label="Tên khách hàng"
                            placeholder="Tên khách hàng"
                            searchable
                            nothingFound="Không có khách hàng"
                            maxDropdownHeight={280}
                            data={listConsumerName}
                            {...form.getInputProps('consumerName')}
                            onChange={handleConsumerNameChange}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <TextInput
                            withAsterisk
                            label="Mã khách hàng"
                            placeholder="Mã khách hàng"
                            disabled
                            {...form.getInputProps('consumerId')}
                            style={{
                                label: {
                                    marginBottom: '5px',
                                },
                            }}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <TextInput
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            {...form.getInputProps('phoneNumber')}
                            style={{
                                label: {
                                    marginBottom: '5px',
                                },
                            }}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <TextInput
                            label="Địa chỉ"
                            placeholder="Địa chỉ"
                            {...form.getInputProps('address')}
                            style={{
                                label: {
                                    marginBottom: '5px',
                                },
                            }}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <DatePicker
                            allowFreeInput
                            placeholder="Ngày tạo đơn hàng"
                            label="Ngày tạo đơn hàng"
                            withAsterisk
                            {...form.getInputProps('dateCreated')}
                        />
                    </Col>
                    {/* <Col md={6} sm={12}>
                        <TextInput
                            label="Người giao hàng"
                            placeholder="Người giao hàng"
                            {...form.getInputProps('transpoter')}
                            style={{
                                label: {
                                    marginBottom: '5px',
                                },
                            }}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <TextInput
                            label="Người nhận hàng"
                            placeholder="Người nhận hàng"
                            {...form.getInputProps('receiver')}
                            style={{
                                label: {
                                    marginBottom: '5px',
                                },
                            }}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <TextInput
                            label="Tình trạng đơn hàng"
                            placeholder="Tình trạng đơn hàng"
                            {...form.getInputProps('status')}
                            style={{
                                label: {
                                    marginBottom: '5px',
                                },
                            }}
                        />
                    </Col> */}
                    <Col md={6} sm={12}>
                        <TextInput
                            label="Tổng tiền"
                            placeholder="Tổng tiền"
                            {...form.getInputProps('totalPrice')}
                            style={{
                                label: {
                                    marginBottom: '5px',
                                },
                            }}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <TextInput
                            label="Ghi chú"
                            placeholder="Ghi chú"
                            {...form.getInputProps('note')}
                            style={{
                                label: {
                                    marginBottom: '5px',
                                },
                            }}
                        />
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
