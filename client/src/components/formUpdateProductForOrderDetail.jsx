import {
    ActionIcon,
    Button,
    Col,
    Grid,
    Space,
    Text,
    TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useOrderDetailGlobalState } from '../globalState/orderDetail.state';

import { IconPencil, IconTrash } from '@tabler/icons';

import jwt_decode from 'jwt-decode';

const FormUpdateProductForOrderDetail = ({ product }) => {
    const [errorAmount, setErrorAmount] = useState('');
    const [errorPrice, setErrorPrice] = useState('');

    const [listOrderDetail, setListOrderDetail] = useOrderDetailGlobalState(
        'listOrderDetail',
        [],
    );

    const isAdmin = () => {
        return jwt_decode(localStorage.getItem('token')).role === 'admin';
    };

    const {
        control,
        getValues,
        setValue,
        register,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            productId: product.productId,
            productName: product.productName,
            amount: product.amount || 0,
            price: isAdmin() ? product.price : 0,
            note: product.note,
        },
    });

    const onAmoutdBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorAmount('');
        }
    };

    const onPriceBlur = (e) => {
        if (
            e.target.value != null &&
            e.target.value !== undefined &&
            e.target.value !== ''
        ) {
            setErrorPrice('');
        }
    };

    const onUpdateProductClicked = () => {
        const formValue = getValues();

        let isAllowUpdate = true;

        if (formValue.amount === '') {
            setErrorAmount('Số lượng không được trống!!');
            isAllowUpdate = false;
        } else {
            if (/^\d+$/.test(formValue.amount) === false) {
                setErrorAmount('Số lượng phải là số');
                isAllowUpdate = false;
            } else {
                setErrorAmount('');
            }
        }

        if (formValue.price === '') {
            setErrorPrice('Đơn giá không được trống!!');
            isAllowUpdate = false;
        } else {
            if (/^\d+$/.test(formValue.price) === false) {
                setErrorPrice('Đơn giá phải là số!!');
                isAllowUpdate = false;
            } else {
                setErrorPrice('');
            }
        }

        if (isAllowUpdate === true) {
            let temp = listOrderDetail;
            for (let item of temp) {
                if (item.productId === formValue.productId) {
                    item.amount = formValue.amount;
                    item.price = formValue.price;
                    break;
                }
            }
            setListOrderDetail([]);
            setListOrderDetail([...temp]);
        }
    };

    const onDeleteProductClicked = () => {
        let temp = [];

        for (let item of listOrderDetail) {
            if (item.productId !== product.productId) {
                temp.push(item);
            }
        }

        setListOrderDetail([...temp]);
    };

    return (
        <>
            <Grid
                style={{
                    border: '1px solid #bdc3c7',
                    marginBottom: '15px	',
                    borderRadius: '5px',
                }}
            >
                <Col span={12}>
                    <Text color="smoke" size="sm">
                        {product.productName}
                    </Text>
                </Col>
                <Col xs={12} sm={5}>
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                withAsterisk
                                label="Số lượng"
                                placeholder="Số lượng"
                                {...register('amount', {
                                    onBlur: onAmoutdBlur,
                                })}
                                {...field}
                                error={errorAmount}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col xs={12} sm={5}>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                disabled={!isAdmin()}
                                withAsterisk
                                label="Đơn giá"
                                placeholder="Đơn giá"
                                {...register('price', {
                                    onBlur: onPriceBlur,
                                })}
                                {...field}
                                error={errorPrice}
                            />
                        )}
                    ></Controller>
                </Col>
                <Col
                    xs={12}
                    sm={2}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}
                >
                    <ActionIcon
                        variant="filled"
                        color="green"
                        onClick={onUpdateProductClicked}
                    >
                        <IconPencil size={18} />
                    </ActionIcon>
                    <Space w="xs" />
                    <ActionIcon
                        variant="filled"
                        color="red"
                        onClick={onDeleteProductClicked}
                    >
                        <IconTrash size={18} />
                    </ActionIcon>
                </Col>
            </Grid>
        </>
    );
};

export default FormUpdateProductForOrderDetail;
