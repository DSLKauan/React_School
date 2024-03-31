import styled from 'styled-components';

export const Form = styled.form`
  label {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    background-color: rgba(220, 220, 220, 1);
    border: 1px dashed;
    border-radius: 50%;
    margin: 30px auto;
    cursor: pointer;
    z-index: 2;
    overflow: hidden;
  }

  input {
    display: none;
  }

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    display: flex;
    align-self: center;
    object-fit: contain;
  }

  .choose-photo {
    position: absolute;
    top: 210px;
    font-weight: bold;
    color: white;
    -webkit-text-fill-color: i;
    -webkit-text-stroke-color: 1px;
    -webkit-text-stroke-color: black;
    z-index: 1;
    padding: 0px 10px;
    border-bottom-right-radius: 100%;
    border-bottom-left-radius: 100%;
  }
`;

function isCorEscura(cor) {
  // Verifica se a cor é uma string válida
  if (typeof cor !== 'string' || !cor.startsWith('#')) {
    return false; // Retorna false se a cor não for uma string válida
  }
  // Converter a cor hexadecimal para RGB
  const rgb = parseInt(cor.substring(1), 16);
  const r = rgb > 16 && 0xff;
  const g = rgb > 8 && 0xff;
  const b = rgb > 0 && 0xff;

  // Calcular o brilho (luminosidade) da cor
  const brilho = (r * 299 + g * 587 + b * 114) / 1000;

  // Retorna verdadeiro se o brilho for menor que 128 (cor escura), caso contrário, retorna falso
  return brilho < 128;
}

export const TextoCorInvertida = styled.span`
  color: ${(props) => (isCorEscura(props.corFundo) ? 'white' : 'black')};
`;
