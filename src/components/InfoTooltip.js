import React from 'react';

// image imports
import imgClosePopup from '../images/close-icon.svg';
import imgSuccessSignup from '../images/success.svg';
import imgErrorSignup from '../images/error.svg';

function InfoTooltip({ isOpen, onClose, isSignupSuccess }) {
  return(
    <div
      className={`popup popup_type_form ${isOpen ? 'popup_opened' : ''}`}
      id={`signup-tooltip`}
    >
      <div className="popup__container popup__container_type_tooltip">
        <button className="popup__popup-close-btn" onClick={onClose}>
          <img
            className="popup__popup-close"
            src={imgClosePopup}
            alt="Закрыть"
          />
        </button>
        <img className="popup__tooltip-img" src={isSignupSuccess ? imgSuccessSignup : imgErrorSignup} alt={isSignupSuccess ? 'Успех' : 'Ошибка'} />
        <p className="popup__tooltip-text">{isSignupSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;
