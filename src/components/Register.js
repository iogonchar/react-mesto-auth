import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onSignup }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSignup({
      email,
      password
    })
  }

  return(
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <label className="form__field">
          <input
            className="form__input form__input_theme_dark"
            id="reg-login"
            name="name"
            type="email"
            placeholder="Email"
            required
            onChange={handleEmailChange}
            value={email || ''}
          />
        </label>
        <label className="form__field">
          <input
            className="form__input form__input_theme_dark"
            id="reg-password"
            name="link"
            placeholder="Пароль"
            required
            type="password"
            onChange={handlePasswordChange}
            value={password || ''}
          />
        </label>
        <button className="form__submit-btn form__submit-btn_theme_dark" type="submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
    </section>
  );
}

export default Register;
