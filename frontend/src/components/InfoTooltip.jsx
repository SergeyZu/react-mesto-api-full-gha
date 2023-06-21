function InfoTooltip({ isOpen, onClose, title, img, alt }) {
  return (
    <section className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <div className="popup__content">
          <img className="popup__icon" src={img} alt={alt} />
          <h2 className="popup__title popup__title_bottom">{title}</h2>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
