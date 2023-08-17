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

export const updateOrderDetail = (data, orderId) => {
    let url = `${baseUrlForOrderDetail}/update`;
    let obj = {};
    obj.data = data;
    obj.orderId = orderId;
    axios
        .patch(url, obj)
        .then((res) => {
            NotificationManager.success(
                'Cập nhật thành công',
                'Cập nhật chi tiết đơn hàng thành công',
            );
        })
        .catch((err) => {
            NotificationManager.error(
                'Cập nhật lỗi',
                'Cập nhật chi tiết đơn hàng lỗi',
            );
            console.log(err.message);
        });
};

export const deleteOrderDetail = (orderId) => {
    let url = `${baseUrlForOrderDetail}/delete?orderId=${orderId}`;

    axios
        .delete(url)
        .then((res) => {
            NotificationManager.success(
                'Xóa thành công',
                'Xóa chi tiết đơn hàng thành công',
            );
        })
        .catch((err) => {
            NotificationManager.error('Xóa lỗi', 'Xóa chi tiết đơn hàng lỗi');
            console.log(err.message);
        });
};
