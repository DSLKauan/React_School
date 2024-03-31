import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  flex-direction: row;
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-inline: 5px;
    padding: 5px 0;
    background-color: white;
    border-radius: 15px;
  }

  div + div {
    border-top: 1px solid rgba(211, 211, 211);
  }

  div span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icons-div {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .icons-div span {
    margin-inline: 5px;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const NovoAluno = styled(Link)`
  display: inline;
  padding: 10px;
  color: #fff;
  background-color: #597d35;
  white-space: nowrap;
  border-radius: 5px;
`;
