import React, { useState } from 'react';
import './index.css'; // Import your CSS file

const Login = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleSignMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="overlay">
    <div className={`cont ${isSignup ? 's--signup' : ''}`}>
      <button className="close-button" onClick={onClose}>
          &times;
        </button>
      <div className="form sign-in">
        <h2>Welcome</h2>
        <label>
          <span>Email</span>
          <input type="email" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" />
        </label>
        <p className="forgot-pass">Forgot password?</p>
        <button type="button" className="submit">
          Sign In
        </button>
      </div>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h3>Don't have an account? Please Sign up!</h3>
          </div>
          <div className="img__text m--in">
            <h3>If you already have an account, just sign in.</h3>
          </div>
          <div className="img__btn" onClick={toggleSignMode}>
            <span className={`m--up ${isSignup ? 'active' : ''}`}>Sign Up</span>
            <span className={`m--in ${!isSignup ? 'active' : ''}`}>Sign In</span>
          </div>
        </div>
        <div className="form sign-up">
          <h2>Create your Account</h2>
          <label>
            <span>Name</span>
            <input type="text" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <button type="button" className="submit">
            Sign Up
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login