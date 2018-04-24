export const SUBMIT_LOGIN = 'LOGIN_SUBMIT';
export const CHANGE_EMAIL = 'LOGIN_CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'LOGIN_CHANGE_PASSWORD';
export const CLEAN_LOGIN = 'CLEAN_LOGIN';
export const CLEAN_MESSAGES = 'LOGIN_CLEAN_MESSAGES';

export const SUBMIT_LOGIN_ERROR = 'LOGIN_SUBMIT_ERROR';
export const SUBMIT_LOGIN_SUCCESS = 'LOGIN_SUBMIT_SUCCESS';

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const changeEmail = email => ({
  type: CHANGE_EMAIL,
  email,
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password,
});

export const cleanLogin = () => ({
  type: CLEAN_LOGIN,
});

export const cleanLoginMessages = () => ({
  type: CLEAN_MESSAGES,
});
