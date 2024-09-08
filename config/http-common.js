const axios = require('axios');

//Base URL to call
const axiosInstance = axios.create({
    baseURL: "http://localhost:8900",
    headers: {
        "Content-type": "application/json"
    }
});

module.exports = axiosInstance;