import axios from 'axios';

import { baseUrlForProvider } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForProvider}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Insert = async (provider) => {
    let url = `${baseUrlForProvider}/insert`;

    let result = await axios.post(url, provider);

    return result.data;
};

export const Update = async (provider) => {
    let url = `${baseUrlForProvider}/update`;

    let result = await axios.patch(url, provider);

    return result.data;
};

export const Delete = async (providerId) => {
    let url = `${baseUrlForProvider}/delete?providerId=${providerId}`;

    let result = await axios.delete(url);

    return result.data;
};
