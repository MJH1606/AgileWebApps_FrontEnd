const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:8900', // Change this to your actual API base URL
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

module.exports = instance;
