import axios from 'axios';
// import {BASE_URL} from '../constants/constants';
const BASE_URL = 'http://footcer.tk';

let API = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export default API;
