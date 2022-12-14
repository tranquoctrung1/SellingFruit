import { useEffect, useState } from 'react';

import {
    Button,
    Center,
    Col,
    Grid,
    Loader,
    MultiSelect,
    Select,
    Space,
    Text,
} from '@mantine/core';

import { Controller, useForm } from 'react-hook-form';

import {
    useStaffConsumer,
    useUpdateStaffConsumer,
} from '../hooks/staffConsumerHooks';

import { useConsumer } from '../hooks/consumerHooks';
import { useStaff } from '../hooks/staffHooks';

import Swal from 'sweetalert2';

import { NotificationContainer } from 'react-notifications';

const StaffConsumerPermission = () => {
    const [errorStaffId, setErrorStaffId] = useState('');

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            staffId: '',
            consumerId: [],
        },
    });

    const {
        isLoading: isLoadingStaffConsumer,
        data: staffConsumers,
        error: errorStaffConsumer,
        isError: isErrorStaffConsumer,
    } = useStaffConsumer();

    const {
        isLoading: isLoadingStaff,
        data: staffs,
        error: errorStaff,
        isError: isErrorStaff,
    } = useStaff();

    const {
        isLoading: isLoadingConsumer,
        data: consumers,
        error: errorConsumer,
        isError: isErrorConsumer,
    } = useConsumer();

    const useUpdateStaffConsumerMutation = useUpdateStaffConsumer();

    const listStaffId = [];

    const setListStaffId = () => {
        for (let staff of staffs) {
            let findIndex = staffs.indexOf(
                (el) => el.staffId === staff.staffId,
            );

            if (findIndex === -1) {
                listStaffId.push(staff.staffId);
            }
        }
    };

    const listConsumerId = [];

    const setListConsumerId = () => {
        for (let consumer of consumers) {
            let findIndex = consumers.indexOf(
                (el) => el.consumerId === consumer.consumerId,
            );

            if (findIndex === -1) {
                listConsumerId.push(consumer.consumerId);
            }
        }
    };

    useEffect(() => {
        if (staffs && staffs.length > 0) {
            setListStaffId();
        }
        if (consumers && consumers.length > 0) {
            setListConsumerId();
        }
    }, [staffConsumers, staffs, consumers]);

    if (isLoadingStaffConsumer && isLoadingStaff && isLoadingConsumer) {
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

    if (isErrorStaffConsumer && isErrorStaff && isErrorConsumer) {
        return (
            <Grid>
                <Col span={12}>
                    <Center>
                        <Text size="md" color="red" weight={500}>
                            {errorStaffConsumer.message} {errorStaff.message}{' '}
                            {errorConsumer.message}
                        </Text>
                    </Center>
                </Col>
            </Grid>
        );
    }

    const onStaffIdChanged = (e) => {
        let find = staffConsumers.find((el) => el.staffId === e.target.value);

        if (find !== undefined) {
            setValue('consumerId', find.consumerId);
        }
    };

    const onUpdateStaffConsumerClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.staffId === null ||
            formValue.staffId === undefined ||
            formValue.staffId === ''
        ) {
            setErrorStaffId('M?? nh??n vi??n kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else {
            setErrorStaffId('');
        }

        if (isAllow === true) {
            Swal.fire({
                title: 'B???n c?? ch???c?',
                text: 'Thinking before update',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'C???p nh???t',
                cancelButtonText: 'H???y',
            }).then((result) => {
                if (result.isConfirmed) {
                    useUpdateStaffConsumerMutation.mutate(formValue);
                }
            });
        }
    };

    return (
        <>
            <NotificationContainer />
            <Grid>
                <Col
                    span={12}
                    style={{
                        boxShadow: '0 0 5px 0 rgba(0,0,0, .2)',
                        borderRadius: '10px',
                        padding: '10px',
                        marginBottom: '40px',
                    }}
                >
                    <Grid>
                        <Col spam={12}>
                            <Center>
                                <Text weight={500}>
                                    Ph??n quy???n nh??n vi??n kh??ch h??ng
                                </Text>
                            </Center>
                        </Col>
                        <Col sm={12} md={6}>
                            <Controller
                                name="staffId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="M?? nh??n vi??n"
                                        placeholder="staffId"
                                        searchable
                                        nothingFound="Kh??ng c?? m?? nh??n vi??n"
                                        data={listStaffId}
                                        withAsterisk
                                        {...register('staffId', {
                                            onChange: onStaffIdChanged,
                                        })}
                                        {...field}
                                        error={errorStaffId}
                                    />
                                )}
                            ></Controller>
                        </Col>
                        <Col sm={12} md={6}>
                            <Controller
                                name="consumerId"
                                control={control}
                                render={({ field }) => (
                                    <MultiSelect
                                        label="M?? kh??ch h??ng"
                                        placeholder="consumerId"
                                        searchable
                                        nothingFound="Kh??ng c?? m?? kh??ch h??ng"
                                        data={listConsumerId}
                                        clearButtonLabel="Clear selection"
                                        clearable
                                        {...field}
                                    />
                                )}
                            ></Controller>
                        </Col>
                        <Col span={12}>
                            <Center>
                                <Button
                                    variant="filled"
                                    color="green"
                                    onClick={onUpdateStaffConsumerClicked}
                                >
                                    C???p nh???t
                                </Button>
                            </Center>
                        </Col>
                    </Grid>
                </Col>
            </Grid>
        </>
    );
};

export default StaffConsumerPermission;
