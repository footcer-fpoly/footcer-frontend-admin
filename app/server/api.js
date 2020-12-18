import axios from 'axios';
// import {BASE_URL} from '../constants/constants';
// import GLOBAL_STATE from '../utils/state_global';
// import { getDomains } from '../App';
// console.log('🚀 ~ file: api.js ~ line 4 ~ GLOBAL_STATE', getDomains);
const BASE_URL = 'http://footcer.tk';
let API = axios.create({
  // baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export default API;
