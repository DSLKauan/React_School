import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// React Router DOM
import { Link } from 'react-router-dom';
// ICONS
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaPowerOff,
  FaCircle,
} from 'react-icons/fa';
// Componentes estilizados
import { Nav } from './styled';

// Todo o resto
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push('/home');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={21} />
      </Link>

      <Link to="/register">
        <FaUserAlt size={17} />
      </Link>

      {isLoggedIn ? (
        <Link to="/" onClick={handleLogout}>
          <FaPowerOff size={21} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={21} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={21} color="#fff" />}
    </Nav>
  );
}
