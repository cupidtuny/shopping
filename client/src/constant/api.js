import axios from "axios";
import serverUrl from './config';

const AUTH_TOKEN = localStorage.getItem("token");

const api = axios.create({
    baseURL: serverUrl,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

api.defaults.headers.common['Authorization'] = AUTH_TOKEN;
console.log(AUTH_TOKEN);
export default api;