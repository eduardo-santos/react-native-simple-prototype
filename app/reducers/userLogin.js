import {
  SUBMIT_LOGIN,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  SUBMIT_LOGIN_SUCCESS,
  SUBMIT_LOGIN_ERROR,
  CLEAN_LOGIN,
  CLEAN_MESSAGES,
} from '../actions/userLogin';

const initialState = {
  email: null,
  password: null,
  isSubmiting: false,
  submitSuccessMessage: null,
  submitErrorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
      };
    case SUBMIT_LOGIN_SUCCESS:
      return {
        ...state,
        isSubmiting: false,
        submitSuccessMessage: action.sagaSuccessMessage,
      };
    case SUBMIT_LOGIN_ERROR:
      return {
        ...state,
        isSubmiting: false,
        submitErrorMessage: action.sagaErrorMessage,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        submitSuccessMessage: null,
        submitErrorMessage: null,
        email: action.email,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        submitSuccessMessage: null,
        submitErrorMessage: null,
        password: action.password,
      };
    case CLEAN_LOGIN:
      return {
        ...initialState,
      };
    case CLEAN_MESSAGES:
      return {
        ...state,
        submitSuccessMessage: null,
        submitErrorMessage: null,
      };
    default:
      return state;
  }
};

export default reducer;
