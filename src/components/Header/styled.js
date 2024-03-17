import styled from 'styled-components';

import * as color from '../../config/colors';

export const Nav = styled.nav`
  display: flex;
  padding: 12px 10px;
  align-items: center;
  justify-content: space-evenly;

  a {
    color: ${color.secColor};
  }
`;
