import {
    Button,
    Center,
    Checkbox,
    Col,
    Grid,
    Loader,
    NumberInput,
    Select,
    Space,
    Text,
    TextInput,
} from '@mantine/core';

import {
    useDeleteProduct,
    useInsertProduct,
    useProduct,
    useUpdateProduct,
} from '../hooks/productHooks';

import { Controller, useForm } from 'react-hook-form';

import { useState } from 'react';

import Swal from 'sweetalert2';

import { NotificationContainer } from 'react-notifications';

const CreateProduct = () => {
    const [isInsertMode, setIsInsertMode] = useState(false);
    const [errorProductId, setErrorProductId] = useState('');

    const { control, getValues, reset, setValue, register } = useForm({
        defaultValues: {
            productId: '',
            productName: '',
            unit: '',
            price: 0,
            note: '',
        },
    });

    const useInsertProductMutation = useInsertProduct();
    const useUpdateProductMutation = useUpdateProduct();
    const useDeleteProductMutation = useDeleteProduct();

    const { isLoading, data: products, error, isError } = useProduct();

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

    const listProductId = [];

    const setListProductId = () => {
        for (let product of products) {
            let index = listProductId.indexOf(product.productId);
            if (index === -1) {
                listProductId.push(product.productId);
            }
        }
    };

    setListProductId();

    const checkExistsProductId = (productId, data) => {
        let findIndex = data.findIndex((el) => el.productId === productId);

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

    const onProductIdBlur = (e) => {
        if (
            e.target.value === null ||
            e.target.value === undefined ||
            e.target.value === ''
        ) {
            setErrorProductId('Mã sản phẩm không được trống!!!');
        } else if (checkExistsProductId(e.target.value, products) === true) {
            setErrorProductId('Mã sản phẩm đã tồn tại!!!');
        } else {
            setErrorProductId('');
        }
    };

    const onProductIdChange = (e) => {
        let find = products.find((el) => el.productId === e.target.value);

        if (find !== undefined) {
            setValue('productName', find.productName);
            setValue('unit', find.unit);
            setValue('price', find.price === '' ? 0 : find.price);
            setValue('note', find.note);
        }
    };

    const onAddClicked = (e) => {
        const formValue = getValues();

        let isAllow = true;
        if (
            formValue.productId === null ||
            formValue.productId === undefined ||
            formValue.productId === ''
        ) {
            setErrorProductId('Mã sản phẩm không được trống!!!');
            isAllow = false;
        } else if (
            checkExistsProductId(formValue.productId, products) === true
        ) {
            setErrorProductId('Mã sản phẩm đã tồn tại!!!');
            isAllow = false;
        } else {
            setErrorProductId('');
        }

        if (isAllow === true) {
            useInsertProductMutation.mutate(formValue);
        }
    };

    const onUpdateClicked = (e) => {
        const formValue = getValues();

        let isAllow = true;
        if (
            formValue.productId === null ||
            formValue.productId === undefined ||
            formValue.productId === ''
        ) {
            setErrorProductId('Mã sản phẩm không được trống!!!');
            isAllow = false;
        } else {
            setErrorProductId('');
        }

        if (isAllow === true) {
            useUpdateProductMutation.mutate(formValue);
        }
    };

    const onDeleteClicked = (e) => {
        const formValue = getValues();

        let isAllow = true;
        if (
            formValue.productId === null ||
            formValue.productId === undefined ||
            formValue.productId === ''
        ) {
            setErrorProductId('Mã sản phẩm không được trống!!!');
            isAllow = false;
        } else {
            setErrorProductId('');
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
                    useDeleteProductMutation.mutate(formValue.productId);
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
                            name="productId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    placeholder="Mã sản phẩm"
                                    label="Mã sản phẩm"
                                    withAsterisk
                                    {...register('productId', {
                                        onBlur: onProductIdBlur,
                                    })}
                                    {...field}
                                    error={errorProductId}
                                />
                            )}
                        ></Controller>
                    ) : (
                        <Controller
                            name="productId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Mã sản phẩm"
                                    placeholder="Mã sản phẩm"
                                    searchable
                                    nothingFound="Không có sản phẩm"
                                    withAsterisk
                                    data={listProductId}
                                    {...register('productId', {
                                        onChange: onProductIdChange,
                                    })}
                                    {...field}
                                    error={errorProductId}
                                />
                            )}
                        ></Controller>
                    )}
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="productName"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="Tên sản phẩm"
                                label="Tên sản phẩm"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="unit"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                placeholder="Đơn vị tính"
                                label="Đơn vị tính"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col sm={12} md={6}>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Đơn giá"
                                placeholder="Đơn giá"
                                min={0}
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

export default CreateProduct;
