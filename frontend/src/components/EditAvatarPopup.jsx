import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          id="avatar-input"
          className="popup__input popup__input_type_link"
          name="avatar"
          type="url"
          ref={avatarRef}
          placeholder="Вставьте ссылку на аватар"
          required
        />
        <span className="popup__form-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
