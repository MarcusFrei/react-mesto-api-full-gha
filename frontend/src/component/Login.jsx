import React, { useState } from "react";
import { auth } from "../api/auth";

const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };
  return (
    <main className="login-page">
      <form onSubmit={handleSubmit} className="login-page__form">
        <h1 className="login-page__title">Вход</h1>
        <input
          onChange={handleEmailChange}
          className="login-page__input"
          placeholder="Email"
          name="email"
          type="email"
          value={email}
        />
        <input
          onChange={handlePasswordChange}
          className="login-page__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={password}
        />
        <button type="submit" className="login-page__submit-btn">
          Войти
        </button>
      </form>
    </main>
  );
};

export default Login;
