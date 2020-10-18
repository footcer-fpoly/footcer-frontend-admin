import Axios from 'axios';
import API from '../../server/api';
import {REDUX} from '../store/types';

export const SignIn = (phone, password, onSuccess = () => {}) => {
  return (dispatch, store) => {
    return API.post('/users/sign-in-phone', {
      phone: phone,
      password: password,
    })
      .then(({data}) => {
        const obj = data?.data;
        Axios.defaults.headers.common.Authorization = `Bearer ${obj.token}`;
        API.defaults.headers.common.Authorization = `Bearer ${obj.token}`;
        dispatch({type: REDUX.UPDATE_USER_DATA, payload: obj});
        dispatch({type: REDUX.UPDATE_USER_TOKEN, payload: obj.token});
        dispatch({type: REDUX.LOGGED_IN});
        onSuccess();
      })
      .catch((onError) => {
        console.log('SignIn -> onError', onError);
      });
  };
};
