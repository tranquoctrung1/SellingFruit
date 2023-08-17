import axios from 'axios';

import { baseUrlForManageStaff } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForManageStaff}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Update = async (manageStaff) => {
    let url = `${baseUrlForManageStaff}/update`;

    let result = await axios.post(url, manageStaff);

    return result.data;
};
