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
            setErrorProductId('M?? s???n ph???m kh??ng ???????c tr???ng!!!');
        } else if (checkExistsProductId(e.target.value, products) === true) {
            setErrorProductId('M?? s???n ph???m ???? t???n t???i!!!');
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
            setErrorProductId('M?? s???n ph???m kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else if (
            checkExistsProductId(formValue.productId, products) === true
        ) {
            setErrorProductId('M?? s???n ph???m ???? t???n t???i!!!');
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
            setErrorProductId('M?? s???n ph???m kh??ng ???????c tr???ng!!!');
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
            setErrorProductId('M?? s???n ph???m kh??ng ???????c tr???ng!!!');
            isAllow = false;
        } else {
            setErrorProductId('');
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
                                    placeholder="M?? s???n ph???m"
                                    label="M?? s???n ph???m"
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
                                    label="M?? s???n ph???m"
                                    placeholder="M?? s???n ph???m"
                                    searchable
                                    nothingFound="Kh??ng c?? s???n ph???m"
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
                                placeholder="T??n s???n ph???m"
                                label="T??n s???n ph???m"
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
                                placeholder="????n v??? t??nh"
                                label="????n v??? t??nh"
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
                                label="????n gi??"
                                placeholder="????n gi??"
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

export default CreateProduct;
