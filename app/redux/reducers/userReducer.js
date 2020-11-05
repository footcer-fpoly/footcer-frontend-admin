import { REDUX } from '../store/types';
const initialState = {
  loggedIn: false,
  userData: {},
  token: '',
  listStadium: {},
  listPosition: { lat: -1, lng: -1 },
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUX.CLEAR_USER_DATA: {
      return initialState;
    }
    case REDUX.LOGGED_IN: {
      return {
        ...state,
        loggedIn: !state.loggedIn,
      };
    }
    case REDUX.UPDATE_USER_DATA: {
      return {
        ...state,
        userData: action.payload,
      };
    }
    case REDUX.UPDATE_USER_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case REDUX.UPDATE_STADIUM: {
      return {
        ...state,
        listStadium: action.payload,
      };
    }
    case REDUX.UPDATE_POSITION: {
      return {
        ...state,
        listPosition: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default userReducer;
