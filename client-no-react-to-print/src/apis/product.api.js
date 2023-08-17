import axios from 'axios';

import { baseUrlForProduct } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForProduct}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Insert = async (product) => {
    let url = `${baseUrlForProduct}/insert`;

    let result = await axios.post(url, product);

    return result.data;
};

export const Update = async (product) => {
    let url = `${baseUrlForProduct}/update`;

    let result = await axios.patch(url, product);

    return result.data;
};

export const Delete = async (productId) => {
    let url = `${baseUrlForProduct}/delete?productId=${productId}`;

    let result = await axios.delete(url);

    return result.data;
};
