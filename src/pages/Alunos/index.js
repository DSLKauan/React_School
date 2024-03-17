import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture } from './styled';

// CSS
import { Container } from '../../styles/GlobalStyles';

// Actions

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      setAlunos(response.data);
    }

    getData();
  }, []);

  return (
    <Container>
      <h1>Alunos</h1>

      <AlunoContainer>
        {alunos.map((aluno) => (
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

            <Link to={`/aluno/${aluno.id}`}>
              <FaEdit size={24} />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
