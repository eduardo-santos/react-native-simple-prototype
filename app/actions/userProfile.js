export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const GET_USER_PROFILE_CHANGE_IMAGE = 'GET_USER_PROFILE_CHANGE_IMAGE';
export const USER_PROFILE_LOGOUT = 'USER_PROFILE_LOGOUT';
export const CLEAN_MESSAGES = 'USER_PROFILE_CLEAN_MESSAGES';

export const GET_USER_PROFILE_ERROR = 'GET_USER_PROFILE_ERROR';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_CHANGE_IMAGE_SUCCESS = 'GET_USER_PROFILE_CHANGE_IMAGE_SUCCESS';

export const getUserProfile = email => ({
  type: GET_USER_PROFILE,
  email,
});

export const changeUserProfileImage = base64Image => ({
  type: GET_USER_PROFILE_CHANGE_IMAGE,
  base64Image,
});

export const userProfileLogout = () => ({
  type: USER_PROFILE_LOGOUT,
});

export const cleanUserProfileMessages = () => ({
  type: CLEAN_MESSAGES,
});
