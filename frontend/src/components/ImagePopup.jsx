import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_image ${card.link && "popup_opened"} `}
    >
      <div className="popup__container popup__container_type_image">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__title popup__title_type_image">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
