import axios from 'axios';

import { NotificationManager } from 'react-notifications';
import { baseUrlForOrderDetail } from './baseUrl';

export const getOrderDetailByOrderId = async (orderId) => {
    let url = `${baseUrlForOrderDetail}/getOrderDetailByOrderId?orderId=${orderId.queryKey[1]}`;

    let result = await axios.get(url);

    return result.data;
};

export const insertOrderDetail = (data) => {
    let url = `${baseUrlForOrderDetail}/insert`;

    axios
        .post(url, data)
        .then((res) => {
            console.log(res.data);
            NotificationManager.success(
                'Thêm thành công',
                'Thêm chi tiết đơn hàng thành công',
            );
        })
        .catch((err) => {
            NotificationManager.error('Thêm lỗi', 'Thêm chi tiết đơn hàng lỗi');
            console.log(err.message);
        });
};
