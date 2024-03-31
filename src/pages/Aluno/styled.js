import styled from 'styled-components';
import * as colors from '../../config/colors';

// Icons

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 10px;
    height: 25px;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 3px;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  button {
    width: 200px;
    max-width: 150px;
    min-width: 100px;
    align-self: center;
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  position: relative;
  margin-top: 20px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-size: auto;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: none;
    bottom: -12px;
    color: ${colors.secColor};
    padding: 2px;
  }

  a .a-edit-photo {
    margin-right: 2px;
  }
`;
