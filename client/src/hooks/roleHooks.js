import { useMutation, useQuery } from 'react-query';
import { Delete, getAll, Insert, Update } from '../apis/role.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useRole = () =>
    useQuery(['role'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useInsertRole = () => {
    return useMutation(Insert, {
        onMutate: async (res) => {
            await client.cancelQueries('role');

            const prevRoleData = client.getQueryData(['role']);
            client.setQueryData(['role'], (prevData) => [...prevData]);

            return prevRoleData;
        },
        onSuccess: (data, variables, context) => {
            client.setQueryData(['role'], [...context, variables]);
            NotificationManager.success(
                'Thêm thành công',
                'Thêm quyền thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['role'], [...context]);
            NotificationManager.error('Thêm lỗi', 'Thêm quyền lỗi');
        },
    });
};

export const useUpdateRole = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('role');

            const prevRoleData = client.getQueryData(['role']);
            client.setQueryData(['role'], (prevData) => [...prevData]);

            return prevRoleData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].role === variables.role) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['role'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật quyền thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['role'], [...context]);
            NotificationManager.error('Cập nhật lỗi', 'Cập nhật quyền lỗi');
        },
    });
};

export const useDeleteRole = () => {
    return useMutation(Delete, {
        onMutate: async (res) => {
            await client.cancelQueries('role');

            const prevRoleData = client.getQueryData(['role']);
            client.setQueryData(['role'], (prevData) => [...prevData]);

            return prevRoleData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [];
            for (let item of context) {
                if (item.role !== variables) {
                    temp.push(item);
                }
            }
            client.setQueryData(['role'], [...temp]);
            NotificationManager.success(
                'Xóa thành công',
                'Xóa quyền thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['role'], [...context]);
            NotificationManager.error('Xóa lỗi', 'xóa quyền lỗi');
        },
    });
};
