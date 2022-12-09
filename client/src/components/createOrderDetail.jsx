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

import { useEffect, useState } from 'react';

import { useOrderDetail } from '../hooks/orderDetailHooks';

import UpdateProductForOrderDetail from './updateProductForOrderDetail';

import jwt_decode from 'jwt-decode';

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

    const [listTempOrderDetail, setListTempOrderDetail] = useState([]);

    useEffect(() => {
        let listProductDefaultValue = [];
        if (orderDetail != null && orderDetail !== undefined) {
            if (orderDetail.length > 0) {
                for (let item of orderDetail) {
                    listProductDefaultValue.push(item.productName);
                }
                setListOrderDetail([...orderDetail]);
            } else {
                setListOrderDetail([]);
            }
        } else {
            setListOrderDetail([]);
        }
    }, [orderDetail]);

    //let listTempOrderDetail = [];

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

    const handleProductChange = (e) => {
        setListTempOrderDetail([...e]);
    };

    const isAdmin = () => {
        return jwt_decode(localStorage.getItem('token')).role === 'admin';
    };

    const handleUpdateListProductClick = () => {
        const tempSelectedProduct = [];
        if (listTempOrderDetail.length > 0) {
            for (let item of listTempOrderDetail) {
                let findItem = products.find((el) => el.productName === item);
                if (findItem !== undefined) {
                    let findToCheckDuplicate = listOrderDetail.find(
                        (el) => el.productName === findItem.productName,
                    );
                    if (findToCheckDuplicate === undefined) {
                        findItem.amount = 0;
                        if (!isAdmin()) {
                            findItem.price = 0;
                        }
                        tempSelectedProduct.push(findItem);
                    }
                }
            }
            setListOrderDetail([...listOrderDetail, ...tempSelectedProduct]);
        }
    };

    return (
        <>
            <Grid>
                <Col span={12}>
                    <MultiSelect
                        data={listProducts}
                        label="Chọn sản phẩm"
                        placeholder="Chọn sản phẩm để cập nhật"
                        searchable
                        nothingFound="Không tìm thấy sản phẩm"
                        onChange={handleProductChange}
                    />
                </Col>
                <Col
                    span={12}
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
                        Thêm số lượng sản phẩm
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
