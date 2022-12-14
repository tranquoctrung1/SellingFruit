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
    useDeleteUser,
    useInsertUser,
    useUpdateUser,
    useUser,
} from '../hooks/userHooks';

import { useRole } from '../hooks/roleHooks';

import { useStaff } from '../hooks/staffHooks';

import { Controller, useForm } from 'react-hook-form';

import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

import { NotificationContainer } from 'react-notifications';

const CreateUser = () => {
    const [isInsertMode, setIsInsertMode] = useState(false);
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isDisabledStaff, setIsDisabledStaff] = useState(false);

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            username: '',
            password: '',
            staffId: '',
            role: '',
        },
    });

    const useInsertUserMutation = useInsertUser();
    const useUpdateUserMutation = useUpdateUser();
    const useDeleteUserMutation = useDeleteUser();

    const {
        isLoading: isLoadingUser,
        data: users,
        error: errorUser,
        isError: isErrorUser,
    } = useUser();

    const {
        isLoading: isLoadingRole,
        data: roles,
        error: errorRole,
        isError: isErrorRole,
    } = useRole();

    const {
        isLoading: isLoadingStaff,
        data: staffs,
        error: errorStaff,
        isError: isErrorStaff,
    } = useStaff();

    const listUsername = [];

    const setListUserName = () => {
        for (let user of users) {
            let index = listUsername.indexOf(user.username);
            if (index === -1) {
                listUsername.push(user.username);
            }
        }
    };

    const listRole = [];

    const setListRole = () => {
        for (let role of roles) {
            let index = listRole.indexOf(role.role);
            if (index === -1) {
                let obj = { value: role.role, label: role.name };
                listRole.push(obj);
            }
        }
    };

    const listStaffId = [];

    const setListStaffId = () => {
        for (let staff of staffs) {
            let index = listStaffId.indexOf(staff.staffId);
            if (index === -1) {
                listStaffId.push(staff.staffId);
            }
        }
    };

    if (isLoadingUser || isLoadingRole || isLoadingStaff) {
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

    if (isErrorUser && isErrorRole && isErrorStaff) {
        return (
            <Grid>
                <Col span={12}>
                    <Center>
                        <Text size="md" color="red" weight={500}>
                            {errorUser.message} {errorRole.message}{' '}
                            {errorStaff.message}
                        </Text>
                    </Center>
                </Col>
            </Grid>
        );
    }

    setListRole();
    setListUserName();
    setListStaffId();

    const checkExistsUsername = (username, data) => {
        let findIndex = data.findIndex((el) => el.username === username);

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

    const onUsernameBlur = (e) => {
        if (
            e.target.value === null ||
            e.target.value === undefined ||
            e.target.value === ''
        ) {
            setErrorUsername('T??n t??i kho???n kh??ng ???????c tr???ng!!!');
        } else if (checkExistsUsername(e.target.value, users) === true) {
            setErrorUsername('T??n t??i kho???n ???? t???n t???i!!!');
        } else {
            setErrorUsername('');
        }
    };

    const onUsernameChange = (e) => {
        let find = users.find((el) => el.username === e.target.value);

        if (find !== undefined) {
            setValue('role', find.role);
            setValue('staffId', find.staffId);

            if (find.role === 'admin') {
                setIsDisabledStaff(true);
            } else if (find.role === 'staff') {
                setIsDisabledStaff(false);
            }
        }
    };

    const onPasswordBlur = (e) => {
        if (
            e.target.value === null ||
            e.target.value === undefined ||
            e.target.value === ''
        ) {
            setErrorPassword('M???t kh???u kh??ng ???????c tr???ng!!!');
        } else {
            setErrorPassword('');
        }
    };

    const onRoleChanged = (e) => {
        if (e.target.value === 'admin') {
            setIsDisabledStaff(true);
        } else if (e.target.value === 'staff') {
            setIsDisabledStaff(false);
        }
    };

    const onAddClicked = (e) => {
        const formValue = getValues();

        let isAllow = true;
        if (
            formValue.username === null ||
            formValue.username === undefined ||
            formValue.username === ''
        ) {
            setErrorUsername('T??n t??i kho???n kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else if (checkExistsUsername(formValue.username, users) === true) {
            setErrorUsername('T??n t??i kho???n ???? t???n t???i!!!');
            isAllow = false;
        } else {
            setErrorUsername('');
        }

        if (
            formValue.password === null ||
            formValue.password === undefined ||
            formValue.password === ''
        ) {
            setErrorPassword('M???t kh???u kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else {
            setErrorPassword('');
        }

        if (isAllow === true) {
            useInsertUserMutation.mutate(formValue);
        }
    };

    const onUpdateClicked = (e) => {
        const formValue = getValues();

        let isAllow = true;
        if (
            formValue.username === null ||
            formValue.username === undefined ||
            formValue.username === ''
        ) {
            setErrorUsername('T??n t??i kho???n kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else {
            setErrorUsername('');
        }
        if (
            formValue.password === null ||
            formValue.password === undefined ||
            formValue.password === ''
        ) {
            setErrorPassword('M???t kh???u kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else {
            setErrorPassword('');
        }

        if (isAllow === true) {
            useUpdateUserMutation.mutate(formValue);
        }
    };

    const onDeleteClicked = (e) => {
        const formValue = getValues();

        let isAllow = true;
        if (
            formValue.username === null ||
            formValue.username === undefined ||
            formValue.username === ''
        ) {
            setErrorUsername('T??n t??i kho???n kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else {
            setErrorUsername('');
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
                    useDeleteUserMutation.mutate(formValue.username);
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
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="T??n t??i kho???n "
                                    label="T??n t??i kho???n"
                                    withAsterisk
                                    {...register('username', {
                                        onBlur: onUsernameBlur,
                                    })}
                                    {...field}
                                    error={errorUsername}
                                />
                            )}
                        ></Controller>
                    ) : (
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="T??n t??i kho???n"
                                    placeholder="T??n t??i kho???n"
                                    searchable
                                    nothingFound="Kh??ng c?? t??i kho???n"
                                    withAsterisk
                                    data={listUsername}
                                    {...register('username', {
                                        onChange: onUsernameChange,
                                    })}
                                    {...field}
                                    error={errorUsername}
                                />
                            )}
                        ></Controller>
                    )}
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="M???t kh???u"
                                label="M???t kh???u"
                                withAsterisk
                                {...register('password', {
                                    onBlur: onPasswordBlur,
                                })}
                                {...field}
                                error={errorPassword}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Quy???n"
                                placeholder="Quy???n"
                                data={listRole}
                                {...register('role', {
                                    onChange: onRoleChanged,
                                })}
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="staffId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="M?? nh??n vi??n"
                                placeholder="M?? nh??n vi??n"
                                searchable
                                nothingFound="Kh??ng m?? nh??n vi??n"
                                disabled={isDisabledStaff}
                                data={listStaffId}
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

export default CreateUser;
