import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    max-width: 20%;
    min-width: 30%;
    margin: auto;
    font-weight: bold;
  }

  input {
    height: 25px;
    border: 1px solid ${colors.secColor};
    border-radius: 5px;

    &:focus {
      border-color: blue;
    }
  }

  button {
    align-self: center;
    margin-top: 10px;
    max-width: 20%;
    min-width: 30%;
  }
`;
