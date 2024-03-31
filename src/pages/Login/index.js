import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';
import history from '../../services/history';

// CSS
import { Container } from '../../styles/GlobalStyles';

// Actions

export default function Login() {
  const dispatch = useDispatch();

  const prevPath = get('location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email) || email === '') {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (password.length < 8 || password.length > 50 || password === '') {
      formErrors = true;
      toast.error('Senha inválida.');
    }

    if (formErrors) {
      return;
    }

    dispatch(actions.loginRequest({ email, password, prevPath }));
    history.push('/alunos');
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          autoComplete="off"
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
          autoComplete="off"
        />

        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
