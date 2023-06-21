import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AuthenticationForm from './AuthenticationForm';

const Login = ({ loginUser }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const input = evt.target;

    setFormValue({
      ...formValue,
      [input.name]: input.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser(formValue);
  };

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/sign-up');
  };

  return (
    <div className="auth">
      <Header onClick={goToRegister} buttonText={'Регистрация'} />
      <AuthenticationForm
        onSubmit={handleSubmit}
        title={'Вход'}
        value={formValue}
        onChange={handleChange}
        buttonText={'Войти'}
      />
    </div>
  );
};

export default Login;
