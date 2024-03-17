import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import axios from '../../services/axios';
import { Form } from './styled';

// CSS
import { Container } from '../../styles/GlobalStyles';

// Actions

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

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

    if (password.length < 8 || password.length > 50 || password === '') {
      formErrors = true;
      toast.error('Senha deve ter entre 8 e 50 caracteres.');
    }

    if (formErrors);

    try {
      await axios.post('/users', {
        nome,
        password,
        email,
      });

      toast.success('Conta criada com sucesso.');
      history.push('/login');
    } catch (error) {
      // const status = get(error, 'response.status', 0);
      const errors = get(error, 'response.data.errors', []);

      errors.map((err) => toast.error(err));
    }
  };

  return (
    <Container>
      <h1>Crie sua conta</h1>

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

        <button type="submit">Criar</button>
      </Form>
    </Container>
  );
}
