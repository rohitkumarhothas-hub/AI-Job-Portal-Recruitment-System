import axios from "axios";

const api = axios.create({

  baseURL: "https://ai-job-portal-recruitment-system.onrender.com",

  timeout: 60000

});


// Automatically attach JWT token to every request

api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");


    if (token) {

      config.headers.Authorization = `Bearer ${token}`;

    }


    return config;

  },


  (error) => {

    return Promise.reject(error);

  }

);


export default api;