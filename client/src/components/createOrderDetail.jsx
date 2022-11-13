import {
    Button,
    Center,
    Col,
    Grid,
    Loader,
    MultiSelect,
    Text,
} from '@mantine/core';
import { useOrderDetailGlobalState } from '../globalState/orderDetail.state';
import { useProduct } from '../hooks/productHooks';

import { useState } from 'react';

import { useOrderDetail } from '../hooks/orderDetailHooks';

import UpdateProductForOrderDetail from './updateProductForOrderDetail';

const CreateOrderDetail = ({ orderId }) => {
    const { isLoading, data: products, error, isError } = useProduct();

    const {
        isLoading: isLoadingOrderDetail,
        IsError: isErrorOrderDetail,
        data: orderDetail,
        error: errorOrderDetail,
    } = useOrderDetail(orderId);

    const [listOrderDetail, setListOrderDetail] = useOrderDetailGlobalState(
        'listOrderDetail',
        [],
    );

    let listTempOrderDetail = [];

    if (isLoading && isLoadingOrderDetail) {
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

    if (isError && isErrorOrderDetail) {
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

    let listProducts = [];
    if (products != null && products !== undefined) {
        if (products.length > 0) {
            for (let product of products) {
                let findIndex = listProducts.indexOf(product.productName);

                if (findIndex === -1) {
                    listProducts.push(product.productName);
                }
            }
        }
    }

    let listProductDefaultValue = [];
    if (orderDetail != null && orderDetail !== undefined) {
        if (orderDetail.length > 0) {
            for (let item of orderDetail) {
                listProductDefaultValue.push(item.productName);
            }

            setListOrderDetail([...orderDetail]);
        }
    }

    const handleProductChange = (e) => {
        listTempOrderDetail = e;
    };

    const handleUpdateListProductClick = () => {
        const tempSelectedProduct = [];

        if (listTempOrderDetail.length > 0) {
            for (let item of listTempOrderDetail) {
                let findItem = products.find((el) => el.productName === item);
                console.log(findItem);
                if (findItem !== undefined) {
                    tempSelectedProduct.push(findItem);
                }
            }
            setListOrderDetail([...tempSelectedProduct]);
        }
    };

    return (
        <>
            <Grid>
                <Col span={9}>
                    <MultiSelect
                        data={listProducts}
                        label="Chọn sản phẩm"
                        placeholder="Chọn sản phẩm để cập nhật"
                        searchable
                        nothingFound="Không tìm thấy sản phẩm"
                        onChange={handleProductChange}
                        defaultValue={listProductDefaultValue}
                    />
                </Col>
                <Col
                    span={3}
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
                        onClick={handleUpdateListProductClick}
                    >
                        Cập nhật SP
                    </Button>
                </Col>

                <Col span={12}>
                    <UpdateProductForOrderDetail />
                </Col>
            </Grid>
        </>
    );
};

export default CreateOrderDetail;
