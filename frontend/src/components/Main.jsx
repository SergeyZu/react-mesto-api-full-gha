import { useContext } from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile page__profile'>
        <div className='profile__content'>
          <div className='profile__avatar-container'>
            <img
              className='profile__avatar'
              src={currentUser.avatar}
              alt='Аватар'
              onClick={onEditAvatar}
            />
            <div className='profile__avatar-edit-button-container'>
              <div className='profile__avatar-edit-button'></div>
            </div>
          </div>
          <div className='profile__text-block'>
            <h1 className='profile__title'>{currentUser.name}</h1>
            <button
              className='profile__edit-button'
              type='button'
              onClick={onEditProfile}
            ></button>
            <p className='profile__subtitle'>{currentUser.about}</p>
          </div>
        </div>

        <button
          className='profile__add-button'
          type='button'
          onClick={onAddPlace}
        ></button>
      </section>
      <section className='page__cards'>
        <ul className='cards'>
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
