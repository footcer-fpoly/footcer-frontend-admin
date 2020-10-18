/// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import userReducer from './userReducer';
/// Redux: Root Reducer
const reducers = combineReducers({
  userReducer: persistReducer(
    {
      key: 'userReducer',
      storage: AsyncStorage,
    },
    userReducer,
  ),
});
// Exports
export default reducers;
