require('dotenv').config()

const BASE_URL_TEST = 'http://localhost:8081/api';
const BASE_URL_PROD = "https://mkkbackend.herokuapp.com/api/";

module.exports = {
    
    API: process.env.NODE_ENV === 'development' ? BASE_URL_TEST :BASE_URL_PROD
}