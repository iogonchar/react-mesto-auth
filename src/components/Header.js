import React from 'react';

// image imports
import imgLogo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={imgLogo}
        alt="Логотип проекта Mesto"
      />
    </header>
  );
}

export default Header;
