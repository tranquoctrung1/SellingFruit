import { useMutation, useQuery } from 'react-query';
import { Delete, getAll, Insert, Update } from '../apis/provider.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useProvider = () =>
    useQuery(['provider'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useInsertProvider = () => {
    return useMutation(Insert, {
        onMutate: async (res) => {
            await client.cancelQueries('provider');

            const prevProviderData = client.getQueryData(['provider']);
            client.setQueryData(['provider'], (prevData) => [...prevData]);

            return prevProviderData;
        },
        onSuccess: (data, variables, context) => {
            client.setQueryData(['provider'], [...context, variables]);
            NotificationManager.success(
                'Thêm thành công',
                'Thêm nhà cung cấp thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['provider'], [...context]);
            NotificationManager.error('Thêm lỗi', 'Thêm nhà cung cấp lỗi');
        },
    });
};

export const useUpdateProvider = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('provider');

            const prevProviderData = client.getQueryData(['provider']);
            client.setQueryData(['provider'], (prevData) => [...prevData]);

            return prevProviderData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].providerId === variables.providerId) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['provider'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật nhà cung cấp thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['provider'], [...context]);
            NotificationManager.error(
                'Cập nhật lỗi',
                'Cập nhật nhà cung cấp lỗi',
            );
        },
    });
};

export const useDeleteProvider = () => {
    return useMutation(Delete, {
        onMutate: async (res) => {
            await client.cancelQueries('provider');

            const prevProviderData = client.getQueryData(['provider']);
            client.setQueryData(['provider'], (prevData) => [...prevData]);

            return prevProviderData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [];
            for (let item of context) {
                if (item.providerId !== variables) {
                    temp.push(item);
                }
            }
            client.setQueryData(['provider'], [...temp]);
            NotificationManager.success(
                'Xóa thành công',
                'Xóa đơn nhà cung cấp công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['provider'], [...context]);
            NotificationManager.error('Xóa lỗi', 'xóa nhà cung cấp lỗi');
        },
    });
};
