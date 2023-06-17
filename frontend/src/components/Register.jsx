import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AuthenticationForm from './AuthenticationForm';

const Register = ({ registerUser }) => {
  const [formValue, setFormValue] = useState({ email: '', password: '' });

  const handleChange = (evt) => {
    const input = evt.target;

    setFormValue({ ...formValue, [input.name]: input.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(formValue);
  };

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/sign-in');
  };

  return (
    <div className="auth">
      <Header onClick={goToLogin} buttonText={'Войти'} />
      <AuthenticationForm
        onSubmit={handleSubmit}
        title={'Регистрация'}
        value={formValue}
        onChange={handleChange}
        buttonText={'Зарегистрироваться'}
      />
      <div className="auth__text-block">
        <p className="auth__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
