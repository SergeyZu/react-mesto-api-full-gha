// import { useState } from 'react';
// import * as auth from '../auth';

function PageUnauthorized({
  component,
  title,
  buttonText,
  emailValue,
  passwordValue,
  onChange,
  onSubmit,
  children,
}) {
  // const [formValue, setformValue] = useState({
  //   email: '',
  //   password: '',
  // });

  // let value;

  // function handleChange(evt) {
  //   const { name, value } = evt.target;

  //   setformValue({ ...formValue, [name]: value });
  // }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   const { email, password } = formValue;
  //   auth.register(formValue.email, formValue.password);
  // }

  return (
    <div className="auth">
      {component}
      <form className="auth__form" onSubmit={onSubmit}>
        <h2 className="auth__title">{title}</h2>
        <input
          placeholder="Email"
          id="email-input"
          className="auth__input"
          name="email"
          type="email"
          value={emailValue}
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
          value={passwordValue}
          onChange={onChange}
          minLength="3"
          maxLength="20"
          required
        />
        <button className="auth__button" type="submit">
          {buttonText}
        </button>
        {children}
      </form>
    </div>
  );
}

export default PageUnauthorized;
