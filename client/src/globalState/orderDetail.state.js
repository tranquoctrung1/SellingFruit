import { useQuery } from 'react-query';

import client from '../client/client';

export const useOrderDetailGlobalState = (key, initialData) => [
    useQuery(key, () => initialData, {
        enabled: false,
        initialData: initialData,
    }).data,
    (value) => {
        client.setQueryData(key, value);
    },
];
