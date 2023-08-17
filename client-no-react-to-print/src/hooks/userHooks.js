import { useMutation, useQuery } from 'react-query';
import { Delete, getAll, Insert, Update } from '../apis/user.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useUser = () =>
    useQuery(['user'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useInsertUser = () => {
    return useMutation(Insert, {
        onMutate: async (res) => {
            await client.cancelQueries('user');

            const prevUserData = client.getQueryData(['user']);
            client.setQueryData(['user'], (prevUserData) => [...prevUserData]);

            return prevUserData;
        },
        onSuccess: (data, variables, context) => {
            client.setQueryData(['user'], [...context, variables]);
            NotificationManager.success(
                'Thêm thành công',
                'Thêm tài khoản thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['user'], [...context]);
            NotificationManager.error('Thêm lỗi', 'Thêm tài khoản lỗi');
        },
    });
};

export const useUpdateUser = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('user');

            const prevUserData = client.getQueryData(['user']);
            client.setQueryData(['user'], (prevUserData) => [...prevUserData]);

            return prevUserData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].username === variables.username) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['user'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật tài khoản thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['user'], [...context]);
            NotificationManager.error('Cập nhật lỗi', 'Cập nhật tài khoản lỗi');
        },
    });
};

export const useDeleteUser = () => {
    return useMutation(Delete, {
        onMutate: async (res) => {
            await client.cancelQueries('user');

            const prevUserData = client.getQueryData(['user']);
            client.setQueryData(['user'], (prevUserData) => [...prevUserData]);

            return prevUserData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [];
            for (let item of context) {
                if (item.username !== variables) {
                    temp.push(item);
                }
            }
            client.setQueryData(['user'], [...temp]);
            NotificationManager.success(
                'Xóa thành công',
                'Xóa tài khoản thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['user'], [...context]);
            NotificationManager.error('Xóa lỗi', 'xóa tài khoản lỗi');
        },
    });
};
