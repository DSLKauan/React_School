import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import axios from '../../../services/axios';
import * as actions from './actions';
import * as types from '../types';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSucess({ ...response.data }));

    toast.success('Login feito com sucesso!');

    axios.defaults.headers.Authorizarion = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (err) {
    toast.error('Uusário ou senha inválidos.');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token');
  if (!token) return;
  axios.defaults.headers.Authorizarion = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });

      toast.success('Conta atualizada.');
      yield put(actions.registerSuccess({ nome, email, password }));
    }
  } catch (e) {
    const errors = get(e, 'response.data.error', []);
    // const status = get(e, 'reponse.status', 0);

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Não foi possível realizar a operaçao.');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
