import axios from "axios";

const AUTH_TOKEN = localStorage.getItem("token");

const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

api.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default api;