import axios from "axios";
import serverUrl from './config';

const api = axios.create({
    baseURL: serverUrl,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
});

api.interceptors.request.use(function (config) {
    const AUTH_TOKEN = window.localStorage.getItem("token");
    if (AUTH_TOKEN) {
        return {
            ...config,
            headers:{
                ...config.headers,
                Authorization : `Bearer ${AUTH_TOKEN}`
            }

        }
    }
}, function (error) {
    return Promise.reject(error)
});

export default api;
