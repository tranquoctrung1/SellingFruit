import { useQuery } from 'react-query';
import { getAll } from '../apis/product.api';

export const useProduct = () =>
    useQuery(['product'], getAll, {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
