import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import usePopupValidity from "../hooks/usePopupValidity";

const AddCardPopup = ({ isOpen, onClose, handleSubmit, isLoading }) => {
  const { values, errors, handleChange, resetValidation, setValues, isValid } =
    usePopupValidity({});

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  useEffect(() => {
    resetValidation();
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitForm}
      name={"edit-user-info"}
      title={"Новое место"}
      isSubmitDisabled={isValid}
      submitText={isLoading ? "Loading" : "Сохранить"}
    >
      <div className="popup__info-container-error">
        <input
          type="text"
          placeholder="Название"
          name="name"
          className="popup__input popup__input_picture-title"
          required
          minLength="2"
          maxLength="30"
          value={values.name || ""}
          onChange={handleChange}
        />
        <p className="popup__errors">{errors.name || ""}</p>
      </div>
      <div className="popup__info-container-error">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          className="popup__input popup__input_picture-link"
          required
          value={values.link || ""}
          onChange={handleChange}
        />

        <p className="popup__errors">{errors.link || ""}</p>
      </div>
    </PopupWithForm>
  );
};

export default AddCardPopup;
