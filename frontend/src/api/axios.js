import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.APP_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
});

export default api;