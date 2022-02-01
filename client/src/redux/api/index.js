import axios from 'axios';

const api = axios.create({
   // baseURL: 'https://server.lamngo.work/',
    // baseURL: 'http://18.212.26.65:3000',
    baseURL: 'http://localhost:3000',
    timeout: 1000
})

export default api;