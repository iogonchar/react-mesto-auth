// image imports
import imgClosePopup from '../images/close-icon.svg';

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div
      className={`popup popup_type_form ${isOpen ? 'popup_opened' : ''}`}
      id={`popup-place`}
    >
      <div className="popup__container popup__container_type_slide">
        <button className="popup__popup-close-btn" onClick={onClose}>
          <img
            className="popup__popup-close"
            src={imgClosePopup}
            alt="Закрыть"
          />
        </button>
        <img className="popup__img" src={card.link} alt={card.name} />
        <p className="popup__text">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
