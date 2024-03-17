import React from 'react';
// React Router DOM
import { Link } from 'react-router-dom';
// ICONS
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
// Componentes estilizados
import { Nav } from './styled';

export default function Header() {
  return (
    <Nav>
      <Link to="/">
        <FaHome size={21} />
      </Link>

      <Link to="/register">
        <FaUserAlt size={17} />
      </Link>

      <Link to="/login">
        <FaSignInAlt size={21} />
      </Link>
    </Nav>
  );
}
