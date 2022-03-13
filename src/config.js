require('dotenv').config()

const BASE_URL_TEST = 'http://localhost:8081/api';
const BASE_URL_PROD = "https://mkkbackend.herokuapp.com/api/";

module.exports = {
  API: BASE_URL_PROD,
};