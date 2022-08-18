import axios from 'axios';

const api = axios.create({
   baseURL: 'https://jesiel-scheduler-api.herokuapp.com/api/'
});

export default api;