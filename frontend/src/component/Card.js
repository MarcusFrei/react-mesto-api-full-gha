import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardDelete, onCardLike, onCardOpen }) {
  const { likes, link, name, owner, _id } = card;
  const user = useContext(CurrentUserContext);

  const hasLike = () => {
    return likes.some((like) => like._id === user._id);
  };

  //gallery__like-button_active
  return (
    <div className="gallery__block">
      <img
        className="gallery__image"
        alt={name}
        src={link}
        onClick={() => {
          onCardOpen(card);
        }}
      />
      {user._id === owner._id && (
        <button
          className="gallery__block-button-delete"
          aria-label="Кнопка удаления карточки"
          onClick={() => onCardDelete(_id)}
        ></button>
      )}
      <div className="gallery__info">
        <h2 className="gallery__photo-name">{name}</h2>
        <div className="gallery__info_like-block">
          <button
            className={`gallery__like-button ${
              hasLike() && "gallery__like-button_active"
            }`}
            type="button"
            aria-label="Кнопка лайка карточки"
            onClick={() => onCardLike(card)}
          ></button>
          <span className="gallery__like-counter" aria-label={likes.length}>
            {likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
