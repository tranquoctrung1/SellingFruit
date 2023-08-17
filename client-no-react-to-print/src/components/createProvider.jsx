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
	TextInput
} from '@mantine/core';

import { Controller, useForm } from 'react-hook-form';

import { useState } from 'react';

import {
	useDeleteProvider,
	useInsertProvider,
	useProvider,
	useUpdateProvider
} from '../hooks/providerHooks';

import Swal from 'sweetalert2';

import { NotificationContainer } from 'react-notifications';

const CreateProvider = () => {
    const [isInsertMode, setIsInsertMode] = useState(false);
    const [errorProviderId, setErrorProviderId] = useState('');

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            providerId: '',
            providerName: '',
            address: '',
            phoneNumber: '',
            note: '',
            staffId: '',
        },
    });

    const useInsertProviderMutation = useInsertProvider();
    const useUpdateProviderMutation = useUpdateProvider();
    const useDeleteProviderMutation = useDeleteProvider();

    const { isLoading, data: providers, error, isError } = useProvider();

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

    const listProviderId = [];

    const setListProviderId = () => {
        for (let provider of providers) {
            let index = listProviderId.indexOf(provider.providerId);
            if (index === -1) {
                listProviderId.push(provider.providerId);
            }
        }
    };

    setListProviderId();

    const onChangeModeClicked = (e) => {
        setIsInsertMode(e.target.checked);
        reset();
    };

    const checkExistsProviderId = (providerId, data) => {
        let findIndex = data.findIndex((el) => el.providerId === providerId);

        if (findIndex !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const onProviderIdBlur = (e) => {
        if (
            e.target.value === null ||
            e.target.value === undefined ||
            e.target.value === ''
        ) {
            setErrorProviderId('Mã nhà cung cấp không được trống!!!');
        } else if (checkExistsProviderId(e.target.value, providers) === true) {
            setErrorProviderId('Mã nhà cung cấp đã trùng!!!');
        } else {
            setErrorProviderId('');
        }
    };

    const onProviderIdChange = (e) => {
        let find = providers.find((el) => el.providerId === e.target.value);

        if (find !== undefined) {
            setValue('providerName', find.providerName);
            setValue('address', find.address);
            setValue('phoneNumber', find.phoneNumber);
            setValue('note', find.note);
        }
    };

    const onAddClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.providerId === null ||
            formValue.providerId === undefined ||
            formValue.providerId === ''
        ) {
            setErrorProviderId('Mã nhà cung cấp không được trống!!!');
            isAllow = false;
        } else if (
            checkExistsProviderId(formValue.providerId, providers) === true
        ) {
            setErrorProviderId('Mã nhà cung cấp đã trùng!!!');
            isAllow = false;
        } else {
            setErrorProviderId('');
        }

        if (isAllow === true) {
            useInsertProviderMutation.mutate(formValue);
        }
    };

    const onUpdateClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.providerId === null ||
            formValue.providerId === undefined ||
            formValue.providerId === ''
        ) {
            setErrorProviderId('Mã nhà cung cấp không được trống!!!');
            isAllow = false;
        } else {
            setErrorProviderId('');
        }

        if (isAllow === true) {
            useUpdateProviderMutation.mutate(formValue);
        }
    };

    const onDeleteClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.providerId === null ||
            formValue.providerId === undefined ||
            formValue.providerId === ''
        ) {
            setErrorProviderId('Mã nhà cung cấp không được trống!!!');
            isAllow = false;
        } else {
            setErrorProviderId('');
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
                    useDeleteProviderMutation.mutate(formValue.providerId);
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
                            name="providerId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="Mã nhà cung cấp"
                                    label="Mã nhà cung cấp"
                                    withAsterisk
                                    {...register('providerId', {
                                        onBlur: onProviderIdBlur,
                                    })}
                                    {...field}
                                    error={errorProviderId}
                                />
                            )}
                        ></Controller>
                    ) : (
                        <Controller
                            name="providerId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Mã nhà cung cấp"
                                    placeholder="Mã nhà cung cấp"
                                    searchable
                                    nothingFound="Không có nhà cung cấp"
                                    withAsterisk
                                    data={listProviderId}
                                    {...register('providerId', {
                                        onChange: onProviderIdChange,
                                    })}
                                    {...field}
                                    error={errorProviderId}
                                />
                            )}
                        ></Controller>
                    )}
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="providerName"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="Tên nhà cung cấp"
                                label="Tên nhà cung cấp"
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

export default CreateProvider;
