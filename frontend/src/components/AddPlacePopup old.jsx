import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: title,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="card"
      title="Новое место"
      btnText="Создать"
    >
      <div className="popup__field">
        <input
          id="title-input"
          className="popup__input popup__input_type_card-title"
          name="name"
          type="text"
          value={title || ''}
          onChange={handleTitleChange}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__form-error title-input-error"></span>
      </div>
      <div className="popup__field">
        <input
          id="link-input"
          className="popup__input popup__input_type_link"
          name="link"
          type="url"
          value={link || ''}
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__form-error link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
