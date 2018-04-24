import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_CHANGE_IMAGE,
  GET_USER_PROFILE_CHANGE_IMAGE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS,
  USER_PROFILE_LOGOUT,
  CLEAN_MESSAGES,
} from '../actions/userProfile';

const initialState = {
  profileImage: null,
  name: null,
  email: null,
  cpf: null,
  isLoading: null,
  successMessage: null,
  errorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_PROFILE_CHANGE_IMAGE:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_PROFILE_CHANGE_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.sagaChangeImageSuccessMessage,
        profileImage: action.base64Image,
      };
    case USER_PROFILE_LOGOUT:
      return {
        ...initialState,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...action.userProfile,
        isLoading: false,
      };
    case GET_USER_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.sagaErrorMessage,
      };
    case CLEAN_MESSAGES:
      return {
        ...state,
        successMessage: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default reducer;
