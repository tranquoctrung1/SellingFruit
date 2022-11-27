import axios from 'axios';

import { baseUrlForUser } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForUser}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Insert = async (user) => {
    let url = `${baseUrlForUser}/insert`;

    let result = await axios.post(url, user);

    return result.data;
};

export const Update = async (user) => {
    let url = `${baseUrlForUser}/update`;

    let result = await axios.patch(url, user);

    return result.data;
};

export const Delete = async (username) => {
    let url = `${baseUrlForUser}/delete?username=${username}`;

    let result = await axios.delete(url);

    return result.data;
};
