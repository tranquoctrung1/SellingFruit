import { useMutation, useQuery } from 'react-query';
import { getAll, Update } from '../apis/staffConsumer.api';

import { NotificationManager } from 'react-notifications';
import client from '../client/client';

export const useStaffConsumer = () =>
    useQuery(['staffconsumer'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

export const useUpdateStaffConsumer = () => {
    return useMutation(Update, {
        onMutate: async (res) => {
            await client.cancelQueries('staffconsumer');

            const prevStaffConsumerData = client.getQueryData([
                'staffconsumer',
            ]);
            client.setQueryData(['staffconsumer'], (prevData) => [...prevData]);

            return prevStaffConsumerData;
        },
        onSuccess: (data, variables, context) => {
            let temp = [...context];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].staffId === variables.staffId) {
                    temp[i] = { ...variables };
                    break;
                }
            }
            client.setQueryData(['staffconsumer'], [...temp]);
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật phân quyền nhân viên thành công',
            );
        },
        onError: (error, variables, context) => {
            client.setQueryData(['staffconsumer'], [...context]);
            NotificationManager.error(
                'Cập nhật lỗi',
                'Cập nhật phân quyền nhân viên lỗi',
            );
        },
    });
};
