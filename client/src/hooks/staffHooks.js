import { useMutation, useQuery } from 'react-query';
import { Delete, getAll, Insert, Update } from '../apis/staff.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useStaff = () =>
    useQuery(['staff'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useInsertStaff = () => {
    return useMutation(Insert, {
        onMutate: async (res) => {
            await client.cancelQueries('staff');

            const prevStaffData = client.getQueryData(['staff']);
            client.setQueryData(['staff'], (prevData) => [...prevData]);

            return prevStaffData;
        },
        onSuccess: (data, variables, context) => {
            client.setQueryData(['staff'], [...context, variables]);
            NotificationManager.success(
                'Thêm thành công',
                'Thêm nhân viên thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['staff'], [...context]);
            NotificationManager.error('Thêm lỗi', 'Thêm nhân viên lỗi');
        },
    });
};

export const useUpdateStaff = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('staff');

            const prevRoleData = client.getQueryData(['staff']);
            client.setQueryData(['staff'], (prevData) => [...prevData]);

            return prevRoleData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].staffId === variables.staffId) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['staff'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật nhân viên thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['staff'], [...context]);
            NotificationManager.error('Cập nhật lỗi', 'Cập nhật nhân viên lỗi');
        },
    });
};

export const useDeleteStaff = () => {
    return useMutation(Delete, {
        onMutate: async (res) => {
            await client.cancelQueries('staff');

            const prevStaffData = client.getQueryData(['staff']);
            client.setQueryData(['staff'], (prevData) => [...prevData]);

            return prevStaffData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [];
            for (let item of context) {
                if (item.staffId !== variables) {
                    temp.push(item);
                }
            }
            client.setQueryData(['staff'], [...temp]);
            NotificationManager.success(
                'Xóa thành công',
                'Xóa nhân viên thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['staff'], [...context]);
            NotificationManager.error('Xóa lỗi', 'xóa nhân viên lỗi');
        },
    });
};
