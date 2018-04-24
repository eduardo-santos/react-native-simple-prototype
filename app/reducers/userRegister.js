import {
  GET_INITIAL_STATE,
  SUBMIT_REGISTER,
  CHANGE_BASE64_IMAGE,
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_CPF,
  SUBMIT_REGISTER_SUCCESS,
  SUBMIT_REGISTER_ERROR,
  CLEAN_MESSAGES,
} from '../actions/userRegister';

const initialState = {
  profileImage: null,
  name: 'edu santos',
  email: 'edu@teste.com',
  password: '123456',
  cpf: '40120584875',
  isSubmiting: false,
  submitSuccessMessage: null,
  submitErrorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INITIAL_STATE:
      return {
        ...initialState,
      };
    case SUBMIT_REGISTER:
      return {
        ...state,
      };
    case SUBMIT_REGISTER_SUCCESS:
      return {
        ...state,
        isSubmiting: false,
        submitSuccessMessage: action.sagaSuccessMessage,
      };
    case SUBMIT_REGISTER_ERROR:
      return {
        ...state,
        isSubmiting: false,
        submitErrorMessage: action.sagaErrorMessage,
      };
    case CHANGE_BASE64_IMAGE:
      return {
        ...state,
        submitSuccessMessage: null,
        submitErrorMessage: null,
        profileImage: action.profileImage,
      };
    case CHANGE_NAME:
      return {
        ...state,
        submitSuccessMessage: null,
        submitErrorMessage: null,
        name: action.name,
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
    case CHANGE_CPF:
      return {
        ...state,
        submitSuccessMessage: null,
        submitErrorMessage: null,
        cpf: action.cpf,
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
