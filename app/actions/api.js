export const GET_API_USERS = 'GET_API_USERS';
export const GET_API_TODOS = 'GET_API_TODOS';
export const GET_API_POSTS = 'GET_API_POSTS';
export const GET_API_COMMENTS = 'GET_API_COMMENTS';
export const GET_API_ALBUMS = 'GET_API_ALBUMS';
export const GET_API_PHOTOS = 'GET_API_PHOTOS';

export const API_RESET_TODOS = 'API_RESET_TODOS';
export const API_RESET_POSTS = 'API_RESET_POSTS';
export const API_RESET_COMMENTS = 'API_RESET_COMMENTS';
export const API_RESET_ALBUMS = 'API_RESET_ALBUMS';
export const API_RESET_PHOTOS = 'API_RESET_PHOTOS';

export const CLEAN_MESSAGES = 'API_CLEAN_MESSAGES';

export const API_ERROR = 'API_ERROR';
export const API_SUCCESS_USERS = 'API_SUCCESS_USERS';
export const API_SUCCESS_TODOS = 'API_SUCCESS_TODOS';
export const API_SUCCESS_POSTS = 'API_SUCCESS_POSTS';
export const API_SUCCESS_COMMENTS = 'API_SUCCESS_COMMENTS';
export const API_SUCCESS_ALBUMS = 'API_SUCCESS_ALBUMS';
export const API_SUCCESS_PHOTOS = 'API_SUCCESS_PHOTOS';

export const getApiUsers = () => ({
  type: GET_API_USERS,
});

export const getApiToDos = userId => ({
  type: GET_API_TODOS,
  userId,
});

export const getApiPosts = userId => ({
  type: GET_API_POSTS,
  userId,
});

export const getApiComments = postId => ({
  type: GET_API_COMMENTS,
  postId,
});

export const getApiAlbums = userId => ({
  type: GET_API_ALBUMS,
  userId,
});

export const getApiPhotos = albumId => ({
  type: GET_API_PHOTOS,
  albumId,
});

export const apiResetTodos = () => ({
  type: API_RESET_TODOS,
});

export const apiResetPosts = () => ({
  type: API_RESET_POSTS,
});

export const apiResetComments = () => ({
  type: API_RESET_COMMENTS,
});

export const apiResetAlbums = () => ({
  type: API_RESET_ALBUMS,
});

export const apiResetPhotos = () => ({
  type: API_RESET_PHOTOS,
});

export const cleanApiMessages = () => ({
  type: CLEAN_MESSAGES,
});
