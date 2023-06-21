import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        name="profile"
        title="Редактировать профиль"
        btnText="Сохранить"
        onSubmit={handleSubmit}
      >
        <div className="popup__field">
          <input
            placeholder="Имя"
            id="name-input"
            className="popup__input popup__input_type_name"
            name="name"
            type="text"
            value={name || ''}
            onChange={handleNameChange}
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__form-error name-input-error"></span>
        </div>
        <div className="popup__field">
          <input
            placeholder="Занятие"
            id="about-input"
            className="popup__input popup__input_type_about"
            name="about"
            type="text"
            value={description || ''}
            onChange={handleDescriptionChange}
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__form-error about-input-error"></span>
        </div>
      </PopupWithForm>
    </CurrentUserContext.Provider>
  );
}

export default EditProfilePopup;
