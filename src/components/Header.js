import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// image imports
import imgLogo from '../images/logo.svg';

function Header({ onSignout, userEmail, isLoggedIn }) {

  const location = useLocation();

  return (
    <header className="header">
      <img
        className="header__logo"
        src={imgLogo}
        alt="Логотип проекта Mesto"
      />
      {
        isLoggedIn && <nav>
          <span className="header__email">{userEmail}</span>
          <button className="header__button" onClick={onSignout}>Выйти</button>
        </nav>
      }
      {
        !isLoggedIn && location.pathname === '/sign-up' && <Link to="/sign-in" className="header__link">Войти</Link>
      }
      {
        !isLoggedIn && location.pathname === '/sign-in' && <Link to="/sign-up" className="header__link">Регистрация</Link>
      }
    </header>
  );
}

export default Header;
