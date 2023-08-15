import { useEffect, useState } from 'react';

import {
    Button,
    Center,
    Col,
    Grid,
    Loader,
    MultiSelect,
    Select,
    Text,
} from '@mantine/core';

import { Controller, useForm } from 'react-hook-form';

import {
    useManageStaff,
    useUpdateManageStaff,
} from '../hooks/manageStaffHooks';

import { useStaff } from '../hooks/staffHooks';
import {
    useStaffManager,
    useUpdateStaffManager,
} from '../hooks/staffManagerHooks';

import Swal from 'sweetalert2';

import { NotificationContainer } from 'react-notifications';

const CreateManageStaff = () => {
    const [errorStaffManagerId, setErrorStaffManagerId] = useState('');

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            staffManagerId: '',
            staffId: [],
        },
    });

    const {
        isLoading: isLoadingManageStaff,
        data: manageStaffs,
        error: errorManageStaff,
        isError: isErrorManageStaff,
    } = useManageStaff();

    const {
        isLoading: isLoadingStaff,
        data: staffs,
        error: errorStaff,
        isError: isErrorStaff,
    } = useStaff();

    const {
        isLoading: isLoadingStaffManager,
        data: staffManagers,
        error: errorStaffManager,
        isError: isErrorStaffManager,
    } = useStaffManager();

    const useUpdateManageStaffMutation = useUpdateManageStaff();

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

    const listStaffManagerId = [];

    const setListStaffManagerId = () => {
        for (let staffManager of staffManagers) {
            let findIndex = staffManagers.indexOf(
                (el) => el.staffManagerId === staffManager.staffManagerId,
            );

            if (findIndex === -1) {
                listStaffManagerId.push(staffManager.staffManagerId);
            }
        }
    };

    useEffect(() => {
        if (staffManagers && staffManagers.length > 0) {
            setListStaffManagerId();
        }
        if (staffs && staffs.length > 0) {
            setListStaffId();
        }
    }, [staffManagers, staffs, manageStaffs]);

    if (isLoadingManageStaff && isLoadingStaff && isLoadingStaffManager) {
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

    if (isErrorManageStaff && isErrorStaff && isErrorStaffManager) {
        return (
            <Grid>
                <Col span={12}>
                    <Center>
                        <Text size="md" color="red" weight={500}>
                            {errorManageStaff.message} {errorStaff.message}{' '}
                            {errorStaffManager.message}
                        </Text>
                    </Center>
                </Col>
            </Grid>
        );
    }

    const onStaffManagerIdChanged = (e) => {
        let find = manageStaffs.find(
            (el) => el.staffManagerId === e.target.value,
        );

        if (find !== undefined) {
            setValue('staffId', find.staffId);
        } else {
            setValue('staffId', []);
        }
    };

    const onUpdateManageStaffClicked = () => {
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
                title: 'Bạn có chắc?',
                text: 'Thinking before update',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cập nhật',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    useUpdateManageStaffMutation.mutate(formValue);
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
                                    Phân quyền nhân viên khách hàng
                                </Text>
                            </Center>
                        </Col>
                        <Col sm={12} md={6}>
                            <Controller
                                name="staffManagerId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Mã nhân viên quản lý"
                                        placeholder="staffManagerId"
                                        searchable
                                        nothingFound="Không có mã nhân viên quản lý"
                                        data={listStaffManagerId}
                                        withAsterisk
                                        {...register('staffManagerId', {
                                            onChange: onStaffManagerIdChanged,
                                        })}
                                        {...field}
                                        error={errorStaffManagerId}
                                    />
                                )}
                            ></Controller>
                        </Col>
                        <Col sm={12} md={6}>
                            <Controller
                                name="staffId"
                                control={control}
                                render={({ field }) => (
                                    <MultiSelect
                                        label="Mã nhân viên"
                                        placeholder="staffId"
                                        searchable
                                        nothingFound="Không có mã nhân viên"
                                        data={listStaffId}
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
                                    onClick={onUpdateManageStaffClicked}
                                >
                                    Cập nhật
                                </Button>
                            </Center>
                        </Col>
                    </Grid>
                </Col>
            </Grid>
        </>
    );
};

export default CreateManageStaff;
