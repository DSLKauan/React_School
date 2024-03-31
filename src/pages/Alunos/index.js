import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';

// Pages
import Loading from '../../components/Loading';

// CSS
import { Container } from '../../styles/GlobalStyles';

// Actions

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
  };

  const handleDelete = async (id, index) => {
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);

      const novosAlunos = [...alunos];
      setAlunos(novosAlunos);
      novosAlunos.splice(index, 1);

      setIsLoading(false);
    } catch (err) {
      const errors = get(err, 'reponse.data.errors', []);
      const status = get(err, 'reponse.status', 0);

      errors.map((error) => toast.error(error));
      if (status === 401) {
        toast.error('Você precisa fazer login.');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno.');
      }

      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Adicionar aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div className="main" key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt={aluno.nome} crossOrigin="" />
              ) : (
                <FaUserCircle size={40} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <div className="icons-div">
              <span>
                <Link to={`/aluno/${aluno.id}/edit`}>
                  <FaEdit size={24} fill="#000" />
                </Link>
              </span>

              <span>
                <Link
                  to={`/aluno/${aluno.id}/delete`}
                  onClick={handleDeleteAsk}
                >
                  <FaWindowClose size={20} />
                </Link>
              </span>

              <span>
                <FaExclamation
                  className="exclamation-icon"
                  size={18}
                  display="block"
                  cursor="pointer"
                  onClick={() => handleDelete(aluno.id, index)}
                  fill="#ff0000"
                />
              </span>
            </div>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
