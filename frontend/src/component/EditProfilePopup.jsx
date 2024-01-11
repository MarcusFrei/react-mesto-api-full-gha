import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import usePopupValidity from "../hooks/usePopupValidity";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, handleSubmit, isLoading }) => {
  const { values, errors, handleChange, resetValidation, setValues, isValid } =
    usePopupValidity({});

  const userInfo = useContext(CurrentUserContext);
  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  useEffect(() => {
    resetValidation();
    if (userInfo) {
      setValues(userInfo);
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitForm}
      name={"edit-user-info"}
      title={"Редактировать профиль"}
      isSubmitDisabled={isValid}
      submitText={isLoading ? "Loading" : "Сохранить"}
    >
      <div className="popup__info-container-error">
        <input
          type="text"
          placeholder="Имя"
          name="name"
          className="popup__input popup__input_type_name"
          required
          minLength="2"
          maxLength="40"
          value={values.name || ""}
          onChange={handleChange}
        />
        <p className="popup__errors">{errors.name || ""}</p>
      </div>
      <div className="popup__info-container-error">
        <input
          type="text"
          placeholder="О себе"
          name="about"
          className="popup__input popup__input_type_about"
          required
          minLength="2"
          maxLength="200"
          value={values.about || ""}
          onChange={handleChange}
        />
        <p className="popup__errors">{errors.about || ""}</p>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
