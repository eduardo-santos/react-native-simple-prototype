export const GET_INITIAL_STATE = 'REGISTER_GET_INITIAL_STATE';
export const SUBMIT_REGISTER = 'REGISTER_SUBMIT';
export const CHANGE_BASE64_IMAGE = 'REGISTER_CHANGE_BASE64_IMAGE';
export const CHANGE_NAME = 'REGISTER_CHANGE_NAME';
export const CHANGE_EMAIL = 'REGISTER_CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'REGISTER_CHANGE_PASSWORD';
export const CHANGE_CPF = 'REGISTER_CHANGE_CPF';
export const CLEAN_MESSAGES = 'REGISTER_CLEAN_MESSAGES';

export const SUBMIT_REGISTER_ERROR = 'REGISTER_SUBMIT_ERROR';
export const SUBMIT_REGISTER_SUCCESS = 'REGISTER_SUBMIT_SUCCESS';

export const getInitialState = () => ({
  type: GET_INITIAL_STATE,
});

export const submitRegister = () => ({
  type: SUBMIT_REGISTER,
});

export const changeBase64Image = profileImage => ({
  type: CHANGE_BASE64_IMAGE,
  profileImage,
});

export const changeName = name => ({
  type: CHANGE_NAME,
  name,
});

export const changeEmail = email => ({
  type: CHANGE_EMAIL,
  email,
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password,
});

export const changeCpf = cpf => ({
  type: CHANGE_CPF,
  cpf,
});

export const cleanRegisterMessages = () => ({
  type: CLEAN_MESSAGES,
});
