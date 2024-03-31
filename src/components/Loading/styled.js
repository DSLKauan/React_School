import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: -5px;
  left: -5px;
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  align-items: center;
  color: #fff;
  font-size: 30px;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: transparent;
  }

  .spin-loading {
    width: 50px;
    height: 50px;
    margin-left: 12px;
    border-radius: 50%;
    border: 5px solid #0f2c59;
    border-top-color: transparent;
    z-index: 2;

    animation: spin 2s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
