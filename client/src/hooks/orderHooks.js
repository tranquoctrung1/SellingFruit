import { useMutation, useQuery } from 'react-query';

import { Delete, getAll, Insert, Update } from '../apis/order.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useOrder = () =>
    useQuery(['order'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useInsertOrder = () => {
    return useMutation(Insert, {
        onMutate: async (res) => {
            await client.cancelQueries('order');

            const prevOrderData = client.getQueryData(['order']);
            client.setQueryData(['order'], (prevData) => [...prevData]);

            return prevOrderData;
        },
        onSuccess: (data, variables, context) => {
            client.setQueryData(['order'], [...context, variables]);
            NotificationManager.success(
                'Thêm thành công',
                'Thêm đơn hàng thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['order'], [...context]);
            NotificationManager.error('Thêm lỗi', 'Thêm đơn hàng lỗi');
        },
    });
};

export const useUpdateOrder = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('order');

            const prevOrderData = client.getQueryData(['order']);
            client.setQueryData(['order'], (prevData) => [...prevData]);

            return prevOrderData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].orderId === variables.orderId) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['order'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật đơn hàng thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['order'], [...context]);
            NotificationManager.error('Cập nhật lỗi', 'Cập nhật đơn hàng lỗi');
        },
    });
};

export const useDeleteOrder = () => {
    return useMutation(Delete, {
        onMutate: async (res) => {
            await client.cancelQueries('order');

            const prevOrderData = client.getQueryData(['order']);
            client.setQueryData(['order'], (prevData) => [...prevData]);

            return prevOrderData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [];
            for (let item of context) {
                if (item.orderId !== variables.orderId) {
                    temp.push(item);
                }
            }

            client.setQueryData(['order'], [...temp]);
            NotificationManager.success(
                'Xóa thành công',
                'Xóa đơn hàng thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['order'], [...context]);
            NotificationManager.error('Xóa lỗi', 'xóa đơn hàng lỗi');
        },
    });
};
