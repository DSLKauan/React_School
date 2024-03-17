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
  }

  input {
    height: 25px;
    border: 1px solid ${colors.secColor};
    border-radius: 5px;

    &:focus {
      border-color: blue;
    }
  }
`;
