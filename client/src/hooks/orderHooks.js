import { useQuery } from 'react-query';

import { getAll } from '../apis/order.api';

export const useOrder = () =>
    useQuery(['order'], getAll, {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
