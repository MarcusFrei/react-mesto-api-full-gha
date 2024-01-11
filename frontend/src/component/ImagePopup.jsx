import React from "react";

const ImagePopup = ({ isOpen, card, onClose }) => {
  return (
    <section className={`popup popup_darker ${isOpen && "popup_opened"}`}>
      <div className="popup__image-container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__full-image" src={card.link} />
        <p className="popup__image-title">{card.name}</p>
        <h1>HELLO</h1>
      </div>
    </section>
  );
};

export default ImagePopup;
