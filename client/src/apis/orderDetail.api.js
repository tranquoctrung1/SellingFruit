import axios from 'axios';

import { baseUrlForOrderDetail } from './baseUrl';

export const getOrderDetailByOrderId = async (orderId) => {
    let url = `${baseUrlForOrderDetail}/getOrderDetailByOrderId?orderId=${orderId.queryKey[1]}`;

    let result = await axios.get(url);

    return result.data;
};
