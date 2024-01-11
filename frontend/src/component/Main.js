import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  onEditAvatarOpen,
  onEditProfileOpen,
  onAddCardOpen,
  cards,
  onDeleteCard,
  onCardLike,
  onCardOpen,
}) => {
  const userInfo = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-pencil">
          <img
            className="profile__image"
            id="profile__image"
            alt="Фотография Жака-Ив Кусто"
            src={userInfo.avatar}
            onClick={onEditAvatarOpen}
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-plus-edit-btn">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Кнопка редактирования профиля"
              onClick={onEditProfileOpen}
            ></button>
          </div>
          <p className="profile__about-yourself"> {userInfo.about}</p>
        </div>
        <button
          onClick={onAddCardOpen}
          className="profile__add-button"
          type="button"
          aria-label="Кнопка добавления карточки"
        ></button>
      </section>
      <section className="gallery">
        <ul className="gallery__blocks">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              //user={userInfo}
              onCardDelete={onDeleteCard}
              onCardLike={onCardLike}
              onCardOpen={onCardOpen}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
