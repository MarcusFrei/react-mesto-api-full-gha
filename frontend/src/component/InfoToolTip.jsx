import React from "react";

import tickSuccsess from "../images/tick_success.svg";
import crossFail from "../images/cross_fail.svg";
//
const InfoToolTip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <section className={`popup popup_darker ${isOpen && "popup_opened"}`}>
      <div className="popup__auth-container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        {isSuccess ? (
          <>
            <img
              className="popup__auth-container__image"
              alt="Вы успешно зарегестрировались"
              src={tickSuccsess}
            />
            <div className="popup__auth-container__text">
              Вы успешно зарегистрировались!
            </div>
          </>
        ) : (
          <>
            <img
              className="popup__auth-container__image"
              alt="Что-то пошло не так"
              src={crossFail}
            />
            <div className="popup__auth-container__text">
              Что-то пошло не так! Попробуйте&nbsp;ещё&nbsp;раз.
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default InfoToolTip;
