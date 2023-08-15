import axios from 'axios';

import { baseUrlForStaffManager } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForStaffManager}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Insert = async (staff) => {
    let url = `${baseUrlForStaffManager}/insert`;

    let result = await axios.post(url, staff);

    return result.data;
};

export const Update = async (staff) => {
    let url = `${baseUrlForStaffManager}/update`;

    let result = await axios.patch(url, staff);

    return result.data;
};

export const Delete = async (staffManagerId) => {
    let url = `${baseUrlForStaffManager}/delete?staffManagerId=${staffManagerId}`;

    let result = await axios.delete(url);

    return result.data;
};
