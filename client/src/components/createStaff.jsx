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

import {
    useDeleteStaff,
    useInsertStaff,
    useStaff,
    useUpdateStaff,
} from '../hooks/staffHooks';

import { Controller, useForm } from 'react-hook-form';

import { useState } from 'react';

import Swal from 'sweetalert2';

import { NotificationContainer } from 'react-notifications';

const CreateStaff = () => {
    const [isInsertMode, setIsInsertMode] = useState(false);
    const [errorStaffId, setErrorStaffId] = useState('');

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            staffId: '',
            fullname: '',
            address: '',
            phone: '',
        },
    });

    const useInsertStaffMutation = useInsertStaff();
    const useUpdateStaffMutation = useUpdateStaff();
    const useDeleteStaffMutation = useDeleteStaff();

    const { isLoading, data: staffs, error, isError } = useStaff();

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

    const listStaffId = [];

    const setListStaffId = () => {
        for (let staff of staffs) {
            let index = listStaffId.indexOf(staff.staffId);
            if (index === -1) {
                listStaffId.push(staff.staffId);
            }
        }
    };

    setListStaffId();

    const checkExistsStaffId = (staffId, data) => {
        let findIndex = data.findIndex((el) => el.staffId === staffId);

        if (findIndex !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const onChangeModeClicked = (e) => {
        setIsInsertMode(e.target.checked);
        reset();
    };

    const onStaffIdBlur = (e) => {
        if (
            e.target.value === null ||
            e.target.value === undefined ||
            e.target.value === ''
        ) {
            setErrorStaffId('M?? nh??n vi??n kh??ng ???????c tr???ng!!!');
        } else if (checkExistsStaffId(e.target.value, staffs) === true) {
            setErrorStaffId('M?? nh??n vi??n ???? t???n t???i!!!');
        } else {
            setErrorStaffId('');
        }
    };

    const onStaffIdChange = (e) => {
        let find = staffs.find((el) => el.staffId === e.target.value);

        if (find !== undefined) {
            setValue('fullname', find.fullname);
            setValue('address', find.address);
            setValue('phone', find.phone);
        }
    };

    const onAddClicked = (e) => {
        const formValue = getValues();

        let isAllow = true;
        if (
            formValue.staffId === null ||
            formValue.staffId === undefined ||
            formValue.staffId === ''
        ) {
            setErrorStaffId('M?? nh??n vi??n kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else if (checkExistsStaffId(formValue.staffId, staffs) === true) {
            setErrorStaffId('M?? nh??n vi??n ???? t???n t???i!!!');
            isAllow = false;
        } else {
            setErrorStaffId('');
        }

        if (isAllow === true) {
            useInsertStaffMutation.mutate(formValue);
        }
    };

    const onUpdateClicked = (e) => {
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
            useUpdateStaffMutation.mutate(formValue);
        }
    };

    const onDeleteClicked = (e) => {
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
                    useDeleteStaffMutation.mutate(formValue.staffId);
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
                            name="staffId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="M?? nh??n vi??n"
                                    label="M?? nh??n vi??n"
                                    withAsterisk
                                    {...register('staffId', {
                                        onBlur: onStaffIdBlur,
                                    })}
                                    {...field}
                                    error={errorStaffId}
                                />
                            )}
                        ></Controller>
                    ) : (
                        <Controller
                            name="staffId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="M?? nh??n vi??n"
                                    placeholder="M?? nh??n vi??n"
                                    searchable
                                    nothingFound="Kh??ng c?? nh??n vi??n"
                                    withAsterisk
                                    data={listStaffId}
                                    {...register('staffId', {
                                        onChange: onStaffIdChange,
                                    })}
                                    {...field}
                                    error={errorStaffId}
                                />
                            )}
                        ></Controller>
                    )}
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="fullname"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="T??n nh??n vi??n"
                                label="T??n nh??n vi??n"
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
                                placeholder="?????a ch???"
                                label="?????a ch???"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="??i???n tho???i"
                                placeholder="??i???n tho???i"
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

export default CreateStaff;
