import axios from 'axios';
import { baseUrlForOrder } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForOrder}/getAll`;

    let result = await axios.get(url);

    return result.data;
};
