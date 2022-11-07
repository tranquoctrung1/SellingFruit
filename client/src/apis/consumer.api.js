import axios from 'axios';
import { baseUrlForConsumer } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForConsumer}/getAll`;

    let result = await axios.get(url);

    return result.data;
};
