import React from 'react';

// context imports
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `places__delete-card-btn ${isOwn ? '' : 'places__delete-card-btn_hidden'}`
  );

  const cardLikeButtonClassName = (
    `places__like-card-btn ${isLiked ? 'places__like-card-btn_liked' : ''}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="places__card">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img className="places__img" src={card.link} alt={card.name} onClick={handleCardClick} />
      <h2 className="places__title">{card.name}</h2>
      <div className="places__like-wrapper">
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <span className="places__likes-count">{card.likes.length}</span>
      </div>
    </li>
  );
}

export default Card;
