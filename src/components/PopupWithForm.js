// image imports
import imgClosePopup from '../images/close-icon.svg';

function PopupWithForm({ title, name, buttonText, isOpen, onClose, onSubmit, children }) {
  return (
    <div
      className={`popup popup_type_form ${isOpen ? 'popup_opened' : ''}`}
      id={`popup-${name}`}
    >
      <div className="popup__container popup__container_type_form">
        <button className="popup__popup-close-btn" onClick={onClose}>
          <img
            className="popup__popup-close"
            src={imgClosePopup}
            alt="Закрыть"
          />
        </button>

        <h2 className="popup__title">{title}</h2>

        <form
          className="popup__form"
          name={`popup-${name}-form`}
          id={`popup-${name}-form`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__form-submit-btn" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
