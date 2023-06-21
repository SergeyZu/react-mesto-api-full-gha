// import { useState } from 'react';
import useForm from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { form, errors, handleChange } = useForm({
    title: '',
    link: '',
  });

  // // const [title, setTitle] = useState('');
  // // const [link, setLink] = useState('');
  // const [form, setForm] = useState({
  //   title: '',
  //   link: '',
  // });
  // console.log(form);

  // function handleTitleChange(evt) {
  //   setTitle(evt.target.value);
  // }
  // function handleLinkChange(evt) {
  //   setLink(evt.target.value);
  // }
  // function handleChange(evt) {
  //   const input = evt.target;
  //   console.log(input);
  //   setForm({
  //     ...form,
  //     [input.name]: input.value,
  //   });
  // }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: form.title,
      link: form.link,
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
          name="title"
          type="text"
          value={form.title || ''}
          onChange={handleChange}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__form-error_active title-input-error">
          {errors.title}
        </span>
      </div>
      <div className="popup__field">
        <input
          id="link-input"
          className="popup__input popup__input_type_link"
          name="link"
          type="url"
          value={form.link || ''}
          onChange={handleChange}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__form-error_active link-input-error">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
