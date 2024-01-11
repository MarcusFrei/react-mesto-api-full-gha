const PopupWithForm = ({
  isOpen,
  onSubmit,
  name,
  onClose,
  children,
  title,
  isSubmitDisabled,
  submitText,
}) => {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Кнопка закрытия попапа для редактирования информации"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__info-container popup__form"
          name="popup inputs"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            id="submit-profile"
            className="popup__save-button"
            type="submit"
            disabled={!isSubmitDisabled}
            // onClick={onSubmit}
          >
            {submitText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopupWithForm;
