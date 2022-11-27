import axios from 'axios';

import { baseUrlForStaff } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForStaff}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Insert = async (staff) => {
    let url = `${baseUrlForStaff}/insert`;

    let result = await axios.post(url, staff);

    return result.data;
};

export const Update = async (staff) => {
    let url = `${baseUrlForStaff}/update`;

    let result = await axios.patch(url, staff);

    return result.data;
};

export const Delete = async (staffId) => {
    let url = `${baseUrlForStaff}/delete?staffId=${staffId}`;

    let result = await axios.delete(url);

    return result.data;
};
