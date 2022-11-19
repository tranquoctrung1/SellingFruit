import { Button, Col, Grid, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useOrderDetailGlobalState } from '../globalState/orderDetail.state';

const FormUpdateProductForOrderDetail = ({ product }) => {
    const [errorAmount, setErrorAmount] = useState('');
    const [errorPrice, setErrorPrice] = useState('');

    const [listOrderDetail, setListOrderDetail] = useOrderDetailGlobalState(
        'listOrderDetail',
        [],
    );

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
            price: product.price,
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
            setListOrderDetail([...temp]);
        }
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
                    <Button
                        fullWidth
                        variant="filled"
                        color="green"
                        onClick={onUpdateProductClicked}
                    >
                        Cập nhật
                    </Button>
                </Col>
            </Grid>
        </>
    );
};

export default FormUpdateProductForOrderDetail;
