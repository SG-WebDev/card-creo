import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `http://cardcreo.tk/`,
    headers: {
        'Content-Type': 'application/json'
    }
});