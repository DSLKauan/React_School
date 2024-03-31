import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';
// Pages
import Loading from '../../components/Loading';

// CSS
import { Container } from '../../styles/GlobalStyles';
import { Form, TextoCorInvertida } from './styled';

// Actions

export default function Fotos() {
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));

        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
      }
    };

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);

    if (fileURL) {
      setFoto(fileURL);
    }

    const formData = new FormData();
    formData.append('foto', file);
    formData.append('aluno_id', id);

    try {
      setIsLoading(true);

      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto alterada');

      setIsLoading(false);

      history.push(`/fotos/${id}`);
    } catch (err) {
      setIsLoading(false);

      const { status } = get(err, 'response', '');
      toast.error('Não foi possível alterar foto.');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Fotos</h1>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} /> : <></>}
          <TextoCorInvertida className="choose-photo">Mudar</TextoCorInvertida>
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
