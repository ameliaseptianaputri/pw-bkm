import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // ganti IP sesuai backend kamu
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      console.log('Token yang dikirim:', token); // Cek token yang dikirim
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
export default api;
