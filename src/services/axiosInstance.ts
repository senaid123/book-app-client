import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl !== ""  ? apiUrl : 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
