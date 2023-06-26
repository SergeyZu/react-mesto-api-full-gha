import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && 'card__like_clicked'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className='card'>
      <img
        className='card__image'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={`card__trash ${!isOwn && 'card__hide-trash'}`}
        type='button'
        onClick={handleDeleteClick}
      ></button>
      <div className='card__bottom'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__like-block'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          ></button>
          <div className='card__likes-qty'>{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
