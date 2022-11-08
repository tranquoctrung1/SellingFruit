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

import { useEffect } from 'react';

const CreateOrderDetail = ({ orderId }) => {
    const { isLoading, data: products, error, isError } = useProduct();

    const [orderDetail, setOrderDetail] = useOrderDetailGlobalState(
        'orderDetail',
        [],
    );

    useEffect(() => {
        console.log(orderId.value);
    }, [orderId.value]);

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
        console.log(e);
    };

    const handleUpdateListProductClick = () => {
        console.log();
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
                        defaultValue={[listProducts[0], listProducts[1]]}
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
            </Grid>
        </>
    );
};

export default CreateOrderDetail;
