import styled from 'styled-components';

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
`;

export const ProfilePicture = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
