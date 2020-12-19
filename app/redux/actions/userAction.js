import Axios from 'axios';
import { Message } from '../../components/Message';
import Spinner from '../../components/Spinner';
import API from '../../server/api';
import { REDUX } from '../store/types';
import { store as Store } from '../store';

export const SignIn = (phone, password, onSuccess = () => {}) => {
  return (dispatch, store) => {
    const domain = Store?.getState()?.userReducer?.domain;
    console.log('🚀 ~ file: userAction.js ~ line 10 ~ return ~ domain', domain);
    return API.post(`${domain}/users/sign-in-phone`, {
      phone: phone,
      password: password.toLowerCase(),
    })
      .then(({ data }) => {
        const obj = data?.data;
        if (obj.role === 1) {
          Axios.defaults.headers.common.Authorization = `Bearer ${obj.token}`;
          API.defaults.headers.common.Authorization = `Bearer ${obj.token}`;
          dispatch({ type: REDUX.UPDATE_USER_DATA, payload: obj });
          dispatch({ type: REDUX.UPDATE_USER_TOKEN, payload: obj.token });
          dispatch({ type: REDUX.LOGGED_IN });
          onSuccess();
        } else if (obj.role === 2) {
          Axios.defaults.headers.common.Authorization = `Bearer ${obj.token}`;
          API.defaults.headers.common.Authorization = `Bearer ${obj.token}`;
          dispatch({ type: REDUX.UPDATE_USER_DATA, payload: obj });
          dispatch({ type: REDUX.UPDATE_USER_TOKEN, payload: obj.token });
          dispatch({ type: REDUX.LOGGED_IN });
          onSuccess();
        } else {
          Message('Bạn không phải là chủ sân');
          Spinner.hide();
        }
      })
      .catch((onError) => {
        Spinner.hide();
        console.log('SignIn -> onError', JSON.stringify(onError));
        Message('Vui lòng kiểm tra thông tin đăng nhập');
      });
  };
};
