import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

// CSS
import { Container } from '../../styles/GlobalStyles';

// Actions

export default function Register() {
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255 || nome === '') {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres.');
    }

    if (!isEmail(email) || email === '') {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (
      !id &&
      (password.length < 8 || password.length > 50 || password === '')
    ) {
      formErrors = true;
      toast.error('Senha deve ter entre 8 e 50 caracteres.');
    }

    if (formErrors) {
      return;
    }

    dispatch(actions.registerRequest({ nome, email, password, id }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Seus dados' : 'Crie sua conta'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            autoComplete="off"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            autoComplete="off"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            autoComplete="off"
          />
        </label>

        <button type="submit">{id ? 'Salvar' : 'Criar'}</button>
      </Form>
    </Container>
  );
}
