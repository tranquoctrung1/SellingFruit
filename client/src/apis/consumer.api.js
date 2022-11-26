import axios from 'axios';
import { baseUrlForConsumer } from './baseUrl';

export const getAll = async () => {
    let url = `${baseUrlForConsumer}/getAll`;

    let result = await axios.get(url);

    return result.data;
};

export const Insert = async (consumer) => {
    let url = `${baseUrlForConsumer}/insert`;

    let result = await axios.post(url, consumer);

    return result.data;
};

export const Update = async (consumer) => {
    let url = `${baseUrlForConsumer}/update`;

    let result = await axios.patch(url, consumer);

    return result.data;
};

export const Delete = async (consumerId) => {
    let url = `${baseUrlForConsumer}/delete?consumerId=${consumerId}`;

    let result = await axios.delete(url);

    return result.data;
};
