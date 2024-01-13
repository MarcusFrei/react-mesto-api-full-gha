import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onLogout, isAuth, email }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { pathname } = useLocation();
  const changeWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", changeWidth);
    return () => window.removeEventListener("resize", changeWidth);
  }, []);

  const changeHeaderNavBlock = () => {
    switch (pathname) {
      case "/sign-in":
        return (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        );
      case "/sign-up":
        return (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        );
      default:
        break;
    }
  };

  const showNav = () =>
    windowWidth > 720 ? (
      <div className="header__info">
        <span className="header__e-mail">{email} </span>
        <button onClick={onLogout} className="header__logout">
          Выйти
        </button>
      </div>
    ) : (
      <span style={{ color: "green" }}>hamburger</span>
    );

  return (
    <header className="header">
      <img
        className="header__logo"
        src="./images/logo.svg"
        alt="Лого 'Место'"
      />
      {isAuth ? showNav() : changeHeaderNavBlock()}
    </header>
  );
}
