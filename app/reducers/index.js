import { combineReducers } from 'redux';

import userLogin from './userLogin';
import userRegister from './userRegister';
import userProfile from './userProfile';
import api from './api';

export default combineReducers({
  userLogin,
  userRegister,
  userProfile,
  api,
});
