import { takeEvery, call, put } from 'redux-saga/effects';

import {
  GET_API_USERS,
  GET_API_TODOS,
  GET_API_POSTS,
  GET_API_COMMENTS,
  GET_API_ALBUMS,
  GET_API_PHOTOS,
  API_ERROR,
  API_SUCCESS_USERS,
  API_SUCCESS_TODOS,
  API_SUCCESS_POSTS,
  API_SUCCESS_COMMENTS,
  API_SUCCESS_ALBUMS,
  API_SUCCESS_PHOTOS,
} from '../actions/api';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const getUsers = () => fetch(`${baseUrl}/users`);
const getToDos = userId => fetch(`${baseUrl}/todos?userId=${userId}`);
const getPosts = userId => fetch(`${baseUrl}/posts?userId=${userId}`);
const getComments = postId => fetch(`${baseUrl}/comments?postId=${postId}`);
const getAlbums = userId => fetch(`${baseUrl}/albums?userId=${userId}`);
const getPhotos = albumId => fetch(`${baseUrl}/photos?albumId=${albumId}`);

function* handleCallResponse(response, actionType) {
  try {
    const result = yield response.json();

    if (result.error) {
      yield put({ type: API_ERROR, sagaErrorMessage: result.error });
    } else {
      yield put({ type: actionType, apiResultData: result });
    }
  } catch (e) {
    yield put({ type: API_ERROR, sagaErrorMessage: e.message });
  }
}

function* getApiUsers() {
  const response = yield call(getUsers);
  yield handleCallResponse(response, API_SUCCESS_USERS);
}

function* getApiToDos(action) {
  const response = yield call(getToDos, action.userId);
  yield handleCallResponse(response, API_SUCCESS_TODOS);
}

function* getApiPosts(action) {
  const response = yield call(getPosts, action.userId);
  yield handleCallResponse(response, API_SUCCESS_POSTS);
}

function* getApiComents(action) {
  const response = yield call(getComments, action.postId);
  yield handleCallResponse(response, API_SUCCESS_COMMENTS);
}

function* getApiAlbums(action) {
  const response = yield call(getAlbums, action.userId);
  yield handleCallResponse(response, API_SUCCESS_ALBUMS);
}

function* getApiPhotos(action) {
  const response = yield call(getPhotos, action.albumId);
  yield handleCallResponse(response, API_SUCCESS_PHOTOS);
}

export const apiSagas = [
  takeEvery(GET_API_USERS, getApiUsers),
  takeEvery(GET_API_TODOS, getApiToDos),
  takeEvery(GET_API_POSTS, getApiPosts),
  takeEvery(GET_API_COMMENTS, getApiComents),
  takeEvery(GET_API_ALBUMS, getApiAlbums),
  takeEvery(GET_API_PHOTOS, getApiPhotos),
];

export default apiSagas;
