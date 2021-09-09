import React from 'react';

// image imports
import imgLogo from '../images/logo.svg';

function Header({ onSignout }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={imgLogo}
        alt="Логотип проекта Mesto"
      />
      <button onClick={onSignout}>Выйти</button>
    </header>
  );
}

export default Header;
