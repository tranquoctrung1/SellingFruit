import { useQuery } from 'react-query';
import { getAll } from '../apis/consumer.api';

export const useConsumer = () =>
    useQuery(['consumer'], getAll, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
