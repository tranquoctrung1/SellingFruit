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
            setErrorConsumerId('M?? kh??ch h??ng kh??ng ???????c tr???ng!!!');
        } else if (checkExistsConsumerId(e.target.value, consumers) === true) {
            setErrorConsumerId('M?? kh??ch h??ng ???? tr??ng!!!');
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
            setErrorConsumerId('M?? kh??ch h??ng kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else if (
            checkExistsConsumerId(formValue.consumerId, consumers) === true
        ) {
            setErrorConsumerId('M?? kh??ch h??ng ???? tr??ng!!!');
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
            setErrorConsumerId('M?? kh??ch h??ng kh??ng ???????c tr???ng!!!');
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
            setErrorConsumerId('M?? kh??ch h??ng kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else {
            setErrorConsumerId('');
        }

        if (isAllow === true) {
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
                                    placeholder="M?? kh??ch h??ng"
                                    label="M?? kh??ch h??ng"
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
                                    label="M?? kh??ch h??ng"
                                    placeholder="M?? kh??ch h??ng"
                                    searchable
                                    nothingFound="Kh??ng c?? kh??ch h??ng"
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
                                placeholder="T??n kh??ch h??ng"
                                label="T??n kh??ch h??ng"
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
                                placeholder="S??? ??i???n tho???i"
                                label="S??? ??i???n tho???i"
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
                                label="?????a ch???"
                                placeholder="?????a ch???"
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
                                placeholder="Ghi ch??"
                                label="Ghi ch??"
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
                                Th??m
                            </Button>
                        </Center>
                    ) : (
                        <Center>
                            <Button
                                variant="filled"
                                color="blue"
                                onClick={onUpdateClicked}
                            >
                                S???a
                            </Button>
                            <Space w="md" />
                            <Button
                                variant="filled"
                                color="red"
                                onClick={onDeleteClicked}
                            >
                                X??a
                            </Button>
                        </Center>
                    )}
                </Col>
            </Grid>
        </>
    );
};

export default CreateConsumer;
