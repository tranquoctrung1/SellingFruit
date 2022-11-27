import { useMutation, useQuery } from 'react-query';
import { Delete, getAll, Insert, Update } from '../apis/product.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useProduct = () =>
    useQuery(['product'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useInsertProduct = () => {
    return useMutation(Insert, {
        onMutate: async (res) => {
            await client.cancelQueries('product');

            const prevProductData = client.getQueryData(['product']);
            client.setQueryData(['product'], (prevData) => [...prevData]);

            return prevProductData;
        },
        onSuccess: (data, variables, context) => {
            client.setQueryData(['product'], [...context, variables]);
            NotificationManager.success(
                'Thêm thành công',
                'Thêm sản phẩm thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['product'], [...context]);
            NotificationManager.error('Thêm lỗi', 'Thêm sản phẩm lỗi');
        },
    });
};

export const useUpdateProduct = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('product');

            const prevProductData = client.getQueryData(['product']);
            client.setQueryData(['product'], (prevData) => [...prevData]);

            return prevProductData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].productId === variables.productId) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['product'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật sản phẩm thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['product'], [...context]);
            NotificationManager.error('Cập nhật lỗi', 'Cập nhật sản phẩm lỗi');
        },
    });
};

export const useDeleteProduct = () => {
    return useMutation(Delete, {
        onMutate: async (res) => {
            await client.cancelQueries('product');

            const prevProductData = client.getQueryData(['product']);
            client.setQueryData(['product'], (prevData) => [...prevData]);

            return prevProductData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [];
            for (let item of context) {
                if (item.productId !== variables) {
                    temp.push(item);
                }
            }
            client.setQueryData(['product'], [...temp]);
            NotificationManager.success(
                'Xóa thành công',
                'Xóa sản phẩm thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['product'], [...context]);
            NotificationManager.error('Xóa lỗi', 'xóa sản phẩm lỗi');
        },
    });
};
