import React, { useState } from 'react';
import api from '../services/api';

const AuthForm = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {

        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        response = await api.post('/users/token', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        
      } else {

        const data = { email, password };
        response = await api.post('/users/registration', data);
      }
      
      localStorage.setItem('token', response.data.access_token);
      setMessage('Авторизация успешна!');
      onAuth();
    } catch (error) {
      console.error('Authentication error:', error.response?.data?.detail || error.message);
      setMessage(error.response?.data?.detail || 'Ошибка авторизации. Проверьте данные.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Пароль" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AuthForm;