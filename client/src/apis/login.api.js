import axios from 'axios';
import { baseUrlForLogin } from './baseUrl';

export const postLogin = (login) => {
    let url = `${baseUrlForLogin}`;

    return axios.post(url, login);
};
