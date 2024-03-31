import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

// Pages
import Loading from '../../components/Loading';

// CSS
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture } from './styled';

// Actions

export default function Aluno() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', []);

        setFoto(Foto);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255 || nome === '') {
      toast.error('Nome precisa ter entre 3 e 255 caracteres.');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255 || sobrenome === '') {
      toast.error('Sobrenome tem que ter entre 3 e 255 caracteres.');
      formErrors = true;
    }

    if (!isEmail(email) || email === '') {
      toast.error('Insira um e-mail válido.');
      formErrors = true;
    }

    if (!isInt(String(idade)) || idade === '') {
      toast.error('Idade tem que ser um número inteiro. Ex.: 99.');
      formErrors = true;
    }

    if (!isFloat(String(peso)) || peso === '') {
      toast.error('Peso inválido.');
      formErrors = true;
    }

    if (!isFloat(String(altura)) || altura === '') {
      toast.error('Altura inválida.');
      formErrors = true;
    }

    if (formErrors);
    try {
      if (id) {
        // Editando
        setIsLoading(true);

        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso.');

        setIsLoading(false);
      } else {
        // Criando
        setIsLoading(true);

        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado(a) com sucesso.');
        history.push(`/aluno/${data.id}/edit`);

        setIsLoading(false);
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Tente novamente.');
      }

      if (status === 401) {
        dispatch(actions.loginFailure);
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar aluno' : 'Novo Aluno'}</h1>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} /> : <FaUserCircle size="100px" />}

          <Link to={`/fotos/${id}`}>
            <div className="a-edit-photo">Editar</div>
            <FaEdit size="24px" />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <b>Nome:</b>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <b>Sobrenome:</b>
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <b>E-mail:</b>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <b>Idade:</b>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <b>Peso:</b>
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <b>Altura:</b>
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
