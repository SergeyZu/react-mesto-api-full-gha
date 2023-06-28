import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CardsPage from './CardsPage';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth';
import InfoTooltip from './InfoTooltip';
import success from '../images/success.svg';
import fail from '../images/fail.svg';
import Loader from './Loader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [titleTooltip, setTitleTooltip] = useState('');
  const [imageTooltip, setImageTooltip] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);

    if (!token) {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      return;
    }
    auth
      .getUserData(token)
      .then((user) => {
        setUserData(user);
        setIsLoggedIn(true);
        navigate('/cards');
        setEmail(user.email);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, navigate]);

  const registerUser = ({ email, password }) => {
    auth
      .register(email, password)
      .then((res) => {
        setImageTooltip(success);
        setTitleTooltip('Вы успешно зарегистрировались!');
        navigate('/sign-in');
        console.log(res);
      })
      .catch((err) => {
        setImageTooltip(fail);
        setTitleTooltip('Что-то пошло не так! Попробуйте еще раз.');
        console.log(err);
      })
      .finally(() => {
        setIsOpenTooltip(true);
      });
  };

  const loginUser = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setToken(res.token);
        // setEmail(email);
      })
      .catch((err) => {
        setImageTooltip(fail);
        setTitleTooltip('Что-то пошло не так! Попробуйте еще раз.');
        setIsOpenTooltip(true);
        console.log(err);
      });
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken('');
    setUserData({ email: '', password: '' });
    navigate('/sign-in');
  };

  const closeTooltip = () => {
    setIsOpenTooltip(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            !isLoggedIn ? (
              <Navigate to='/sign-in' replace />
            ) : (
              <Navigate to='/cards' replace />
            )
          }
        />
        <Route
          path='/cards'
          element={
            <ProtectedRoute
              component={CardsPage}
              loggedIn={isLoggedIn}
              logOut={logOut}
              userData={userData}
              email={email}
            />
          }
        />
        <Route
          path='/sign-up'
          element={
            <div className='registerContainer'>
              <Register registerUser={registerUser} />
            </div>
          }
        />
        <Route
          path='/sign-in'
          element={
            <div className='loginContainer'>
              <Login loginUser={loginUser} />
            </div>
          }
        />
      </Routes>

      <InfoTooltip
        isOpen={isOpenTooltip}
        onClose={closeTooltip}
        title={titleTooltip}
        img={imageTooltip}
      />
    </>
  );
}

export default App;
