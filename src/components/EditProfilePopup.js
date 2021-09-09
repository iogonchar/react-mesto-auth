import React, { useEffect, useState, useContext } from 'react';

// component imports
import PopupWithForm from "./PopupWithForm";

// context imports
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input form__input_theme_light"
          id="author"
          name="author"
          placeholder="Имя"
          type="text"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__form-input-error author-input-error"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_theme_light"
          id="about-author"
          name="about"
          placeholder="Занятие"
          type="text"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="popup__form-input-error about-author-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
