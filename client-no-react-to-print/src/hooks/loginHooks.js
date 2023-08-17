import { useQuery } from 'react-query';
import { postLogin } from '../apis/login.api';

export const useLogin = (login) =>
    useQuery(['login', login], postLogin, {
        enabled: login !== '',
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
