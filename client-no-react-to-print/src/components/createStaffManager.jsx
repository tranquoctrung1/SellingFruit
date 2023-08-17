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
    useDeleteStaffManager,
    useInsertStaffManager,
    useStaffManager,
    useUpdateStaffManager,
} from '../hooks/staffManagerHooks';

import { Controller, useForm } from 'react-hook-form';

import { useState } from 'react';

import Swal from 'sweetalert2';

import { NotificationContainer } from 'react-notifications';

const CreateStaffManager = () => {
    const [isInsertMode, setIsInsertMode] = useState(false);
    const [errorStaffManagerId, setErrorStaffManagerId] = useState('');

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            staffManagerId: '',
            fullname: '',
            address: '',
            phone: '',
        },
    });

    const useInsertStaffManagerMutation = useInsertStaffManager();
    const useUpdateStaffManagerMutation = useUpdateStaffManager();
    const useDeleteStaffManagerMutation = useDeleteStaffManager();

    const {
        isLoading,
        data: staffManagers,
        error,
        isError,
    } = useStaffManager();

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

    const listStaffManagerId = [];

    const setListStaffManagerId = () => {
        for (let staffManager of staffManagers) {
            let index = listStaffManagerId.indexOf(staffManager.staffManagerId);
            if (index === -1) {
                listStaffManagerId.push(staffManager.staffManagerId);
            }
        }
    };

    setListStaffManagerId();

    const checkExistsStaffManagerId = (staffManagerId, data) => {
        let findIndex = data.findIndex(
            (el) => el.staffManagerId === staffManagerId,
        );

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

    const onStaffManagerIdBlur = (e) => {
        if (
            e.target.value === null ||
            e.target.value === undefined ||
            e.target.value === ''
        ) {
            setErrorStaffManagerId('Mã nhân viên không quản lý được trống!!!');
        } else if (
            checkExistsStaffManagerId(e.target.value, staffManagers) === true
        ) {
            setErrorStaffManagerId('Mã nhân viên quản lý đã tồn tại!!!');
        } else {
            setErrorStaffManagerId('');
        }
    };

    const onStaffManagerIdChange = (e) => {
        let find = staffManagers.find(
            (el) => el.staffManagerId === e.target.value,
        );

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
            formValue.staffManagerId === null ||
            formValue.staffManagerId === undefined ||
            formValue.staffManagerId === ''
        ) {
            setErrorStaffManagerId('Mã nhân viên quản lý không được trống!!!');
            isAllow = false;
        } else if (
            checkExistsStaffManagerId(formValue.staffId, staffManagers) === true
        ) {
            setErrorStaffManagerId('Mã nhân viên quản lý đã tồn tại!!!');
            isAllow = false;
        } else {
            setErrorStaffManagerId('');
        }

        if (isAllow === true) {
            useInsertStaffManagerMutation.mutate(formValue);
        }
    };

    const onUpdateClicked = (e) => {
        const formValue = getValues();

        let isAllow = true;
        if (
            formValue.staffManagerId === null ||
            formValue.staffManagerId === undefined ||
            formValue.staffManagerId === ''
        ) {
            setErrorStaffManagerId('Mã nhân viên quản lý không được trống!!!');
            isAllow = false;
        } else {
            setErrorStaffManagerId('');
        }

        if (isAllow === true) {
            useUpdateStaffManagerMutation.mutate(formValue);
        }
    };

    const onDeleteClicked = (e) => {
        const formValue = getValues();

        let isAllow = true;
        if (
            formValue.staffManagerId === null ||
            formValue.staffManagerId === undefined ||
            formValue.staffManagerId === ''
        ) {
            setErrorStaffManagerId('Mã nhân viên quản lý không được trống!!!');
            isAllow = false;
        } else {
            setErrorStaffManagerId('');
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
                    useDeleteStaffManagerMutation.mutate(
                        formValue.staffManagerId,
                    );
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
                            name="staffManagerId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="Mã nhân viên quản lý"
                                    label="Mã nhân viên quản lý"
                                    withAsterisk
                                    {...register('staffManagerId', {
                                        onBlur: onStaffManagerIdBlur,
                                    })}
                                    {...field}
                                    error={errorStaffManagerId}
                                />
                            )}
                        ></Controller>
                    ) : (
                        <Controller
                            name="staffManagerId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Mã nhân viên quản lý"
                                    placeholder="Mã nhân viên quản lý"
                                    searchable
                                    nothingFound="Không có nhân viên quản lý"
                                    withAsterisk
                                    data={listStaffManagerId}
                                    {...register('staffManagerId', {
                                        onChange: onStaffManagerIdChange,
                                    })}
                                    {...field}
                                    error={errorStaffManagerId}
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
                                placeholder="Tên nhân viên"
                                label="Tên nhân viên"
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
                                placeholder="Địa chỉ"
                                label="Địa chỉ"
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
                                label="Điện thoại"
                                placeholder="Điện thoại"
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

export default CreateStaffManager;
