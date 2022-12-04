import { useMutation, useQuery } from 'react-query';
import {
    Delete,
    getAll,
    getConsumerByStaffId,
    Insert,
    Update,
} from '../apis/consumer.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useConsumer = () =>
    useQuery(['consumer'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useConsumerByStaffId = (role, staffId) =>
    useQuery(['consumer', role, staffId], getConsumerByStaffId, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useInsertConsumer = () => {
    return useMutation(Insert, {
        onMutate: async (res) => {
            await client.cancelQueries('consumer');

            const prevConsumerData = client.getQueryData(['consumer']);
            client.setQueryData(['consumer'], (prevData) => [...prevData]);

            return prevConsumerData;
        },
        onSuccess: (data, variables, context) => {
            client.setQueryData(['consumer'], [...context, variables]);
            NotificationManager.success(
                'Thêm thành công',
                'Thêm khách hàng thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['consumer'], [...context]);
            NotificationManager.error('Thêm lỗi', 'Thêm khách hàng lỗi');
        },
    });
};

export const useUpdateConsumer = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('consumer');

            const prevConsumerData = client.getQueryData(['consumer']);
            client.setQueryData(['consumer'], (prevData) => [...prevData]);

            return prevConsumerData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].consumerId === variables.consumerId) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['consumer'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật khách hàng thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['consumer'], [...context]);
            NotificationManager.error(
                'Cập nhật lỗi',
                'Cập nhật khách hàng lỗi',
            );
        },
    });
};

export const useDeleteConsumer = () => {
    return useMutation(Delete, {
        onMutate: async (res) => {
            await client.cancelQueries('consumer');

            const prevConsumerData = client.getQueryData(['consumer']);
            client.setQueryData(['consumer'], (prevData) => [...prevData]);

            return prevConsumerData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [];
            for (let item of context) {
                if (item.consumerId !== variables) {
                    temp.push(item);
                }
            }
            client.setQueryData(['consumer'], [...temp]);
            NotificationManager.success(
                'Xóa thành công',
                'Xóa đơn khách hàng công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['consumer'], [...context]);
            NotificationManager.error('Xóa lỗi', 'xóa khách hàng lỗi');
        },
    });
};
