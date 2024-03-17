import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    height: 35px;
    margin: 10px 4px;
    padding: 8px;
    border: 1px solid ${colors.secColor};
    border-radius: 4px;

    &:focus {
      border-color: blue;
    }
  }

  button {
    min-width: 100px;
    margin-top: 14px;
    align-self: self-start;
  }
`;
