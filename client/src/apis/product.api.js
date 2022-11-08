import axios from 'axios';

import { baseUrlForProduct } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForProduct}/getAll`;

    let result = await axios.get(url);

    return result.data;
};
