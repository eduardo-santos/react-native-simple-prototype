import {
  GET_API_USERS,
  GET_API_TODOS,
  GET_API_POSTS,
  GET_API_COMMENTS,
  GET_API_ALBUMS,
  GET_API_PHOTOS,
  API_RESET_TODOS,
  API_RESET_POSTS,
  API_RESET_COMMENTS,
  API_RESET_ALBUMS,
  API_RESET_PHOTOS,
  CLEAN_MESSAGES,
  API_ERROR,
  API_SUCCESS_USERS,
  API_SUCCESS_TODOS,
  API_SUCCESS_POSTS,
  API_SUCCESS_COMMENTS,
  API_SUCCESS_ALBUMS,
  API_SUCCESS_PHOTOS,
} from '../actions/api';

const initialState = {
  isLoading: false,
  errorMessage: null,
  successMessage: null,
  apiUsersResultData: [],
  apiToDosResultData: [],
  apiPostsResultData: [],
  apiCommentsResultData: [],
  apiAlbumsResultData: [],
  apiPhotosResultData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_USERS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_API_TODOS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_API_POSTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_API_COMMENTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_API_ALBUMS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_API_PHOTOS:
      return {
        ...state,
        isLoading: true,
      };
    case API_RESET_TODOS:
      return {
        ...state,
        apiToDosResultData: [],
      };
    case API_RESET_POSTS:
      return {
        ...state,
        apiPostsResultData: [],
      };
    case API_RESET_COMMENTS:
      return {
        ...state,
        apiCommentsResultData: [],
      };
    case API_RESET_ALBUMS:
      return {
        ...state,
        apiAlbumsResultData: [],
      };
    case API_RESET_PHOTOS:
      return {
        ...state,
        apiPhotosResultData: [],
      };
    case API_SUCCESS_USERS:
      return {
        ...state,
        apiUsersResultData: action.apiResultData,
        isLoading: false,
      };
    case API_SUCCESS_TODOS:
      return {
        ...state,
        apiToDosResultData: action.apiResultData,
        isLoading: false,
      };
    case API_SUCCESS_POSTS:
      return {
        ...state,
        apiPostsResultData: action.apiResultData,
        isLoading: false,
      };
    case API_SUCCESS_COMMENTS:
      return {
        ...state,
        apiCommentsResultData: action.apiResultData,
        isLoading: false,
      };
    case API_SUCCESS_ALBUMS:
      return {
        ...state,
        apiAlbumsResultData: action.apiResultData,
        isLoading: false,
      };
    case API_SUCCESS_PHOTOS:
      return {
        ...state,
        apiPhotosResultData: action.apiResultData,
        isLoading: false,
      };
    case API_ERROR:
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
