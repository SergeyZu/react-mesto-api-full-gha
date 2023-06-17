import PopupWithForm from './PopupWithForm';
import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useForm from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { form, setForm, errors, handleChange } = useForm({
    name: '',
    description: '',
  });
  console.log(form);
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // function handleNameChange(evt) {
  //   setName(evt.target.value);
  // }

  // function handleDescriptionChange(evt) {
  //   setDescription(evt.target.value);
  // }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  // useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser, isOpen]);
  useEffect(() => {
    setForm({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, setForm]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: form.name,
      about: form.description,
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
            value={form.name || ''}
            onChange={handleChange}
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__form-error_active name-input-error">
            {errors.name}
          </span>
        </div>
        <div className="popup__field">
          <input
            placeholder="Занятие"
            id="about-input"
            className="popup__input popup__input_type_about"
            name="description"
            type="text"
            value={form.description || ''}
            onChange={handleChange}
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__form-error_active about-input-error">
            {errors.description}
          </span>
        </div>
      </PopupWithForm>
    </CurrentUserContext.Provider>
  );
}

export default EditProfilePopup;
