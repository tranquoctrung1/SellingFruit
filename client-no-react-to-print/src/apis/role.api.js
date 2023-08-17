import axios from 'axios';

import { baseUrlForRole } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForRole}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Insert = async (role) => {
    let url = `${baseUrlForRole}/insert`;

    let result = await axios.post(url, role);

    return result.data;
};

export const Update = async (role) => {
    let url = `${baseUrlForRole}/update`;

    let result = await axios.patch(url, role);

    return result.data;
};

export const Delete = async (role) => {
    let url = `${baseUrlForRole}/delete?role=${role}`;

    let result = await axios.delete(url);

    return result.data;
};
