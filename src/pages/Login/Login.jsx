import React from 'react';
import LoginForm from './LoginForm';
import 'antd/dist/reset.css';
import loginImage from '../../assets/login.png';
import accountsData from '../../../database/accountAPI/accounts.json';

const Login = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LoginForm />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={loginImage} alt="Login" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
};

export default Login;
