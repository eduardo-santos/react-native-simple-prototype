import { AsyncStorage } from 'react-native';
import Realm from 'realm';

import { UserSchema } from '../realm/models/user';

import { takeEvery, select, put } from 'redux-saga/effects';

import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_CHANGE_IMAGE,
  GET_USER_PROFILE_CHANGE_IMAGE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS,
} from '../actions/userProfile';

function* getUserProfile(action) {
  try {
    const result = yield AsyncStorage.getItem('users').then((users) => {
      if (users) {
        const parsedUsers = JSON.parse(users);

        const userFound = parsedUsers.filter(u => u.email === action.email.toLowerCase());

        if (userFound.length > 0) {
          return { userProfile: userFound[0] };
        }
        return { error: 'Usuário não encontrado.' };
      }
      return { error: 'Usuário não encontrado.' };
    });

    if (result.error) {
      yield put({ type: GET_USER_PROFILE_ERROR, errorMessage: result.error });
    } else {
      yield put({ type: GET_USER_PROFILE_SUCCESS, userProfile: result.userProfile });
    }
  } catch (e) {
    yield put({ type: GET_USER_PROFILE_ERROR, errorMessage: e.message });
  }
}

function* getUserProfileRealm(action) {
  try {
    const result = yield Realm.open({ schema: [UserSchema] })
      .then((realm) => {
        const userFound = realm.objects('User').filtered(`email = '${action.email}'`);

        if (userFound.length > 0) {
          return { userProfile: userFound[0] };
        }

        return { error: 'E-mail e/ou senha inválidos para login.' };
      })
      .catch(error => ({ error: 'Ocorreu um erro ao obter o perfil do usuário.' }));

    if (result.error) {
      yield put({ type: GET_USER_PROFILE_ERROR, errorMessage: result.error });
    } else {
      yield put({ type: GET_USER_PROFILE_SUCCESS, userProfile: result.userProfile });
    }
  } catch (e) {
    yield put({ type: GET_USER_PROFILE_ERROR, errorMessage: e.message });
  }
}

function* changeUserProfileImage(action) {
  try {
    const userEmail = yield select(state => state.userProfile.email);

    const result = yield AsyncStorage.getItem('users').then((users) => {
      if (users) {
        const parsedUsers = JSON.parse(users);

        const userFoundIndex = parsedUsers.findIndex(u => u.email === userEmail.toLowerCase());

        if (userFoundIndex >= 0) {
          parsedUsers[userFoundIndex].profileImage = action.base64Image;

          return AsyncStorage.setItem('users', JSON.stringify(parsedUsers)).then(() => ({
            success: 'Imagem do perfil alterada com sucesso.',
          }));
        }
        return { error: 'Usuário não encontrado.' };
      }
      return { error: 'Nenhum usuário não encontrado.' };
    });

    if (result.error) {
      yield put({ type: GET_USER_PROFILE_ERROR, sagaErrorMessage: result.error });
    } else {
      yield put({
        type: GET_USER_PROFILE_CHANGE_IMAGE_SUCCESS,
        sagaChangeImageSuccessMessage: result.success,
        base64Image: action.base64Image,
      });
    }
  } catch (e) {
    yield put({ type: GET_USER_PROFILE_ERROR, sagaErrorMessage: e.message });
  }
}

function* changeUserProfileImageRealm(action) {
  try {
    const userEmail = yield select(state => state.userProfile.email);

    const result = yield Realm.open({ schema: [UserSchema] })
      .then((realm) => {
        const userFound = realm.objects('User').filtered(`email = '${userEmail.toLowerCase()}'`)[0];

        if (userFound) {
          realm.write(() => {
            userFound.profileImage = action.base64Image;
          });
          return { success: 'Imagem do perfil alterada com sucesso.' };
        }

        return { error: 'Usuário não encontrado.' };
      })
      .catch(error => ({ error: 'Ocorreu um erro ao atualizar a imagem de perfil do usuário.' }));

    if (result.error) {
      yield put({ type: GET_USER_PROFILE_ERROR, sagaErrorMessage: result.error });
    } else {
      yield put({
        type: GET_USER_PROFILE_CHANGE_IMAGE_SUCCESS,
        sagaChangeImageSuccessMessage: result.success,
        base64Image: action.base64Image,
      });
    }
  } catch (e) {
    yield put({ type: GET_USER_PROFILE_ERROR, sagaErrorMessage: e.message });
  }
}

export const userProfileSagas = [
  takeEvery(GET_USER_PROFILE, getUserProfileRealm),
  takeEvery(GET_USER_PROFILE_CHANGE_IMAGE, changeUserProfileImageRealm),
];

export default userProfileSagas;
