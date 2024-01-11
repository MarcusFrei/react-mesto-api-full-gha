import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import usePopupValidity from "../hooks/usePopupValidity";

const EditAvatarPopup = ({ isOpen, onClose, handleSubmit, isLoading }) => {
  const { values, errors, handleChange, resetValidation, isValid } =
    usePopupValidity({});

  const inputRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    console.log(values);
    // handleSubmit(values);
    handleSubmit({ avatar: inputRef.current.value });
  };

  useEffect(() => {
    // resetValidation();
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitForm}
      name={"edit-avatar"}
      title={"Обновить аватар"}
      isSubmitDisabled={isValid}
      submitText={isLoading ? "Loading" : "Сохранить"}
    >
      <input
        ref={inputRef}
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_picture-profile-link"
        value={values.avatar || ""}
        onChange={handleChange}
        required
      />
      <p className="popup__errors">{errors.avatar || ""}</p>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
