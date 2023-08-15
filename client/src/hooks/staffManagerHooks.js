import { useMutation, useQuery } from 'react-query';
import { Delete, Insert, Update, getAll } from '../apis/staffManager.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useStaffManager = () =>
    useQuery(['staffmanager'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useInsertStaffManager = () => {
    return useMutation(Insert, {
        onMutate: async (res) => {
            await client.cancelQueries('staffmanager');

            const prevStaffManagerData = client.getQueryData(['staffmanager']);
            client.setQueryData(['staffmanager'], (prevStaffManagerData) => [
                ...prevStaffManagerData,
            ]);

            return prevStaffManagerData;
        },
        onSuccess: (data, variables, context) => {
            client.setQueryData(['staffmanager'], [...context, variables]);
            NotificationManager.success(
                'Thêm thành công',
                'Thêm nhân viên quản lý thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['staffmanager'], [...context]);
            NotificationManager.error('Thêm lỗi', 'Thêm nhân viên quản lý lỗi');
        },
    });
};

export const useUpdateStaffManager = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('staffmanager');

            const prevStaffManagerData = client.getQueryData(['staffmanager']);
            client.setQueryData(['staffmanager'], (prevStaffManagerData) => [
                ...prevStaffManagerData,
            ]);

            return prevStaffManagerData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].staffManagerId === variables.staffManagerId) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['staff'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật nhân viên quản lý thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['staffmanager'], [...context]);
            NotificationManager.error(
                'Cập nhật lỗi',
                'Cập nhật nhân viên quản lý lỗi',
            );
        },
    });
};

export const useDeleteStaffManager = () => {
    return useMutation(Delete, {
        onMutate: async (res) => {
            await client.cancelQueries('staffmanager');

            const prevStaffManagerData = client.getQueryData(['staffmanager']);
            client.setQueryData(['staffmanager'], (prevStaffManagerData) => [
                ...prevStaffManagerData,
            ]);

            return prevStaffManagerData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [];
            for (let item of context) {
                if (item.staffManagerId !== variables) {
                    temp.push(item);
                }
            }
            client.setQueryData(['staffmanager'], [...temp]);
            NotificationManager.success(
                'Xóa thành công',
                'Xóa nhân viên quản lý thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['staffmanager'], [...context]);
            NotificationManager.error('Xóa lỗi', 'xóa nhân viên quản lý lỗi');
        },
    });
};
