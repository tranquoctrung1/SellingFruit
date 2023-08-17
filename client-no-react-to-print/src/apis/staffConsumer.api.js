import axios from 'axios';

import { baseUrlForStaffConsumer } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForStaffConsumer}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Update = async (staffConsumer) => {
    let url = `${baseUrlForStaffConsumer}/update`;

    let result = await axios.post(url, staffConsumer);

    return result.data;
};
