import { useMutation, useQuery } from 'react-query';
import { Update, getAll } from '../apis/manageStaff.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useManageStaff = () =>
    useQuery(['managestaff'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useUpdateManageStaff = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('managestaff');

            const prevManageStaffData = client.getQueryData(['managestaff']);
            client.setQueryData(['managestaff'], (prevManageStaffData) => [
                ...prevManageStaffData,
            ]);

            return prevManageStaffData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].staffManagerId === variables.staffManagerId) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['managestaff'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật phân quyền nhân viên quản lý thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['managestaff'], [...context]);
            NotificationManager.error(
                'Cập nhật lỗi',
                'Cập nhật phân quyền nhân viên quản lý lỗi',
            );
        },
    });
};
