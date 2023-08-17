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

import { Controller, useForm } from 'react-hook-form';

import { useState } from 'react';

import {
    useConsumer,
    useDeleteConsumer,
    useInsertConsumer,
    useUpdateConsumer,
} from '../hooks/consumerHooks';

import Swal from 'sweetalert2';

import { NotificationContainer } from 'react-notifications';

const CreateConsumer = () => {
    const [isInsertMode, setIsInsertMode] = useState(false);
    const [errorConsumerId, setErrorConsumerId] = useState('');

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            consumerId: '',
            consumerName: '',
            staffId: '',
            staffName: '',
            address: '',
            phoneNumber: '',
            note: '',
        },
    });

    const useInsertConsumerMutation = useInsertConsumer();
    const useUpdateConsumerMutation = useUpdateConsumer();
    const useDeleteConsumerMutation = useDeleteConsumer();

    const { isLoading, data: consumers, error, isError } = useConsumer();

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

    const listConsumerId = [];

    const setListConsumerId = () => {
        for (let consumer of consumers) {
            let index = listConsumerId.indexOf(consumer.consumerId);
            if (index === -1) {
                listConsumerId.push(consumer.consumerId);
            }
        }
    };

    setListConsumerId();

    const onChangeModeClicked = (e) => {
        setIsInsertMode(e.target.checked);
        reset();
    };

    const checkExistsConsumerId = (consumerId, data) => {
        let findIndex = data.findIndex((el) => el.consumerId === consumerId);

        if (findIndex !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const onConsumerIdBlur = (e) => {
        if (
            e.target.value === null ||
            e.target.value === undefined ||
            e.target.value === ''
        ) {
            setErrorConsumerId('Mã khách hàng không được trống!!!');
        } else if (checkExistsConsumerId(e.target.value, consumers) === true) {
            setErrorConsumerId('Mã khách hàng đã trùng!!!');
        } else {
            setErrorConsumerId('');
        }
    };

    const onConsumerIdChange = (e) => {
        let find = consumers.find((el) => el.consumerId === e.target.value);

        if (find !== undefined) {
            setValue('consumerName', find.consumerName);
            setValue('address', find.address);
            setValue('phoneNumber', find.phoneNumber);
            setValue('note', find.note);
        }
    };

    const onAddClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.consumerId === null ||
            formValue.consumerId === undefined ||
            formValue.consumerId === ''
        ) {
            setErrorConsumerId('Mã khách hàng không được trống!!!');
            isAllow = false;
        } else if (
            checkExistsConsumerId(formValue.consumerId, consumers) === true
        ) {
            setErrorConsumerId('Mã khách hàng đã trùng!!!');
            isAllow = false;
        } else {
            setErrorConsumerId('');
        }

        if (isAllow === true) {
            useInsertConsumerMutation.mutate(formValue);
        }
    };

    const onUpdateClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.consumerId === null ||
            formValue.consumerId === undefined ||
            formValue.consumerId === ''
        ) {
            setErrorConsumerId('Mã khách hàng không được trống!!!');
            isAllow = false;
        } else {
            setErrorConsumerId('');
        }

        if (isAllow === true) {
            useUpdateConsumerMutation.mutate(formValue);
        }
    };

    const onDeleteClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.consumerId === null ||
            formValue.consumerId === undefined ||
            formValue.consumerId === ''
        ) {
            setErrorConsumerId('Mã khách hàng không được trống!!!');
            isAllow = false;
        } else {
            setErrorConsumerId('');
        }

        if (isAllow === true) {
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
                    useDeleteConsumerMutation.mutate(formValue.consumerId);
                    reset();
                }
            });
        }
    };

    return (
        <>
            <NotificationContainer />
            <Grid>
                <Col span={12}>
                    <Checkbox
                        label={
                            isInsertMode === true
                                ? 'Insert Mode'
                                : 'Select Mode'
                        }
                        onClick={onChangeModeClicked}
                    ></Checkbox>
                </Col>
                <Col sm={12} md={6}>
                    {isInsertMode === true ? (
                        <Controller
                            name="consumerId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="Mã khách hàng"
                                    label="Mã khách hàng"
                                    withAsterisk
                                    {...register('consumerId', {
                                        onBlur: onConsumerIdBlur,
                                    })}
                                    {...field}
                                    error={errorConsumerId}
                                />
                            )}
                        ></Controller>
                    ) : (
                        <Controller
                            name="consumerId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Mã khách hàng"
                                    placeholder="Mã khách hàng"
                                    searchable
                                    nothingFound="Không có khách hàng"
                                    withAsterisk
                                    data={listConsumerId}
                                    {...register('consumerId', {
                                        onChange: onConsumerIdChange,
                                    })}
                                    {...field}
                                    error={errorConsumerId}
                                />
                            )}
                        ></Controller>
                    )}
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="consumerName"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="Tên khách hàng"
                                label="Tên khách hàng"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="Số điện thoại"
                                label="Số điện thoại"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Địa chỉ"
                                placeholder="Địa chỉ"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col span={12}>
                    <Controller
                        name="note"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="Ghi chú"
                                label="Ghi chú"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col span={12}>
                    {isInsertMode === true ? (
                        <Center>
                            <Button
                                variant="filled"
                                color="green"
                                onClick={onAddClicked}
                            >
                                Thêm
                            </Button>
                        </Center>
                    ) : (
                        <Center>
                            <Button
                                variant="filled"
                                color="blue"
                                onClick={onUpdateClicked}
                            >
                                Sửa
                            </Button>
                            <Space w="md" />
                            <Button
                                variant="filled"
                                color="red"
                                onClick={onDeleteClicked}
                            >
                                Xóa
                            </Button>
                        </Center>
                    )}
                </Col>
            </Grid>
        </>
    );
};

export default CreateConsumer;
