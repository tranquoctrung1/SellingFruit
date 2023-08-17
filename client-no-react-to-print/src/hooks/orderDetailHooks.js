import { useQuery } from 'react-query';
import { getOrderDetailByOrderId } from '../apis/orderDetail.api';

export const useOrderDetail = (orderId) =>
    useQuery(['orderDetail', orderId], getOrderDetailByOrderId, {
        enabled: orderId !== '',
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
