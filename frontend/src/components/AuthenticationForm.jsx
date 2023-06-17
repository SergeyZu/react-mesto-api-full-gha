const AuthenticationForm = ({
  onSubmit,
  title,
  value,
  onChange,
  buttonText,
}) => {
  return (
    <div className="auth">
      <form onSubmit={onSubmit} className="auth__form">
        <h2 className="auth__title">{title}</h2>
        <input
          placeholder="Email"
          id="email-input"
          className="auth__input"
          name="email"
          type="email"
          value={value.email}
          onChange={onChange}
          minLength="5"
          maxLength="40"
          required
        />
        <input
          placeholder="Пароль"
          id="password-input"
          className="auth__input"
          name="password"
          type="password"
          value={value.password}
          onChange={onChange}
          minLength="3"
          maxLength="20"
          required
        />
        <button className="auth__button" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthenticationForm;
