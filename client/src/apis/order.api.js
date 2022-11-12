import axios from 'axios';
import { baseUrlForOrder } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForOrder}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Insert = async (order) => {
    let url = `${baseUrlForOrder}/Insert`;

    let result = await axios.post(url, order);

    return result.data;
};
