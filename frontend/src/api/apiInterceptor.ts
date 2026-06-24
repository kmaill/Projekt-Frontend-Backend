import axios from "axios";

export const apiInterceptor = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

apiInterceptor.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

apiInterceptor.interceptors.response.use((response) => {
    return response;
}, (err) => {
    if(err.response && err.response.status === 401) {
        console.error(err.message);
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return Promise.reject(err);
});