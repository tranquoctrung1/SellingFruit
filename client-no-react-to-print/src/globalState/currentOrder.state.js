import { useQuery } from 'react-query';

import client from '../client/client';

export const useOrderGlobalState = (key, initialData) => [
    useQuery(key, () => initialData, {
        enabled: false,
        initialData: initialData,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    }).data,
    (value) => {
        client.setQueryData(key, value);
    },
];
