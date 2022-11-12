import { useMutation, useQuery } from 'react-query';

import { getAll, Insert } from '../apis/order.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useOrder = () =>
    useQuery(['order'], getAll, {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
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
