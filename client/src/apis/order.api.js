import axios from 'axios';
import { baseUrlForOrder } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForOrder}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const getOrderByStaffId = async (role, staffId) => {
    console.log(role, staffId);
    let url = `${baseUrlForOrder}/getOrderByStaffId?role=${role}&staffId=${staffId}`;

    let result = await axios.get(url);

    return result.data;
};

export const getBigestNumberOrder = () => {
    let url = `${baseUrlForOrder}/getBigestNumberOrder`;

    return axios.get(url);
};

export const Insert = async (order) => {
    let url = `${baseUrlForOrder}/Insert`;

    let result = await axios.post(url, order);

    return result.data;
};

export const Update = async (order) => {
    let url = `${baseUrlForOrder}/Update`;

    let result = await axios.patch(url, order);

    return result.data;
};

export const UpdatePrintOrder = async (order) => {
    let url = `${baseUrlForOrder}/updatePrint`;

    let result = await axios.patch(url, order);

    return result.data;
};

export const Delete = async (orderId) => {
    let url = `${baseUrlForOrder}/Delete?orderId=${orderId}`;

    let result = await axios.delete(url);

    return result.data;
};
