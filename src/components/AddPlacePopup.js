import React, { useEffect, useState } from 'react';

// component imports
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input form__input_theme_light"
          id="place"
          name="name"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name || ''}
        />
        <span className="popup__form-input-error place-input-error"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_theme_light"
          id="place-img"
          name="link"
          placeholder="Ссылка на картинку"
          required
          type="url"
          onChange={handleLinkChange}
          value={link || ''}
        />
        <span className="popup__form-input-error place-img-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
