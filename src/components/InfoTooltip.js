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
      <div className="popup__container popup__container_type_form">
        <button className="popup__popup-close-btn" onClick={onClose}>
          <img
            className="popup__popup-close"
            src={imgClosePopup}
            alt="Закрыть"
          />
        </button>
        <img src={isSignupSuccess ? imgSuccessSignup : imgErrorSignup} alt={isSignupSuccess ? 'Успех' : 'Ошибка'} />
        <p>{isSignupSuccess ? 'success' : 'not success'}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;
