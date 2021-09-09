import React from 'react';

function Register() {
  return(
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="form">
        <label className="form__field">
          <input
            className="form__input form__input_theme_dark"
            id="place"
            name="name"
            type="email"
            placeholder="Email"
            required
          />
        </label>
        <label className="form__field">
          <input
            className="form__input form__input_theme_dark"
            id="place-img"
            name="link"
            placeholder="Пароль"
            required
            type="text"
          />
        </label>
        <button className="form__submit-btn form__submit-btn_theme_dark" type="submit">Зарегистрироваться</button>
      </form>
    </section>
  );
}

export default Register;
