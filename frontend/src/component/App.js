import { useEffect, useState } from "react";
import "../../src/App.css";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup";
import { api } from "../api/Api";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import { auth } from "../api/auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditAvatarOpened, setIsEditAvatarOpened] = useState(false);
  const [isEditProfileOpened, setIsEditProfileOpened] = useState(false);
  const [isAddCardOpened, setIsAddCardOpened] = useState(false);
  const [isCardPopupOpened, setIsCardPopupOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentOpenCard, setCurrentOpenCard] = useState({});
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const isPopupsOpened =
    isEditAvatarOpened ||
    isEditProfileOpened ||
    isAddCardOpened ||
    isCardPopupOpened ||
    isTooltipOpen;
  const navigate = useNavigate();

  const getData = () => {
    api
      .getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((e) => console.log(e));
    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log(token);
    if (token) {
      auth
        .checkToken(token)
        .then(({ data }) => {
          setIsAuth(true);
          navigate("/");
          getData();

          setEmail(data.email);
        })
        .catch((e) => {
          console.log(e);
          navigate("/sign-in")});
    } else {
      navigate("/sign-in");
    }
  }, []);

  useEffect(() => {
    if (isPopupsOpened) {
      document.addEventListener("keydown", closePopupByEsape);
      document.addEventListener("mousedown", closePopupByOverlay);
    }
    return () => {
      document.removeEventListener("keydown", closePopupByEsape);
      document.removeEventListener("mousedown", closePopupByOverlay);
    };
  }, [isPopupsOpened]);

  function closePopupByEsape(e) {
    if (e.key === "Escape") {
      console.log("escape");
      closeAllPopups();
    }
  }

  function closePopupByOverlay(e) {
    if (e.target.classList.contains("popup_opened")) {
      console.log("over close");
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpened(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpened(true);
  }

  function handleToolTipOpen() {
    setIsTooltipOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardOpened(true);
  }

  function handleOpenCardClick(card) {
    setIsCardPopupOpened(true);
    setCurrentOpenCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarOpened(false);
    setIsEditProfileOpened(false);
    setIsAddCardOpened(false);
    setIsCardPopupOpened(false);
    setIsTooltipOpen(false);
  }

  function updateAvatar(obj) {
    console.log("api avatar");
    setIsLoading(true);
    api
      .updateAvatar(obj)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }

  function addCard(obj) {
    console.log(obj);
    setIsLoading(true);
    api
      .sendNewCard(obj)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }

  function updateUserInfo(obj) {
    console.log("api profile");
    setIsLoading(true);
    api
      .editProfile(obj)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }

  function deleteCard(id) {
    console.log(id);
    setIsLoading(true);
    api
      .deleteCard(id)
      .then((data) => {
        console.log(data);
        const tempCards = cards.filter((card) => card._id !== id);
        setCards(tempCards);

        closeAllPopups();
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }

  function setLike(card) {
    const isCardLiked = card.likes.some((elem) => elem._id === currentUser._id);

    if (!isCardLiked) {
      api
        .setLike(card._id)
        .then((data) => {
          console.log(data);
          const tempCards = cards.map((card) =>
            card._id === data._id ? data : card
          );
          setCards(tempCards);
        })
        .catch((e) => console.log(e));
    } else {
      api
        .deleteLike(card._id)
        .then((data) => {
          console.log(data);
          const tempCards = cards.map((card) =>
            card._id === data._id ? data : card
          );
          setCards(tempCards);
        })
        .catch((e) => console.log(e));
    }
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        setEmail(data.data.email);
        setIsRegistrationSuccessful(true);
        navigate("/sign-in");
      })
      .catch((e) => setIsRegistrationSuccessful(false))
      .finally(() => handleToolTipOpen());
  }

  const handleAuth = ({ email, password }) => {
    console.log(email);
    console.log(password);
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsRegistrationSuccessful(true);
        setEmail(email);
        setIsAuth(true);
        getData();
        navigate("/");
      })
      .catch((e) => {
        setIsRegistrationSuccessful(false);
        handleToolTipOpen();
      });
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setIsAuth(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <InfoToolTip
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isRegistrationSuccessful}
      />
      <ImagePopup
        card={currentOpenCard}
        isOpen={isCardPopupOpened}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        handleSubmit={updateAvatar}
        isOpen={isEditAvatarOpened}
        onClose={closeAllPopups}
        isLoading={isLoading}
      />

      <EditProfilePopup
        handleSubmit={updateUserInfo}
        isOpen={isEditProfileOpened}
        onClose={closeAllPopups}
        isLoading={isLoading}
        //userInfo={currentUser}
      />

      <AddCardPopup
        handleSubmit={addCard}
        isOpen={isAddCardOpened}
        onClose={closeAllPopups}
        isLoading={isLoading}
      />

      <Header isAuth={isAuth} email={email} onLogout={logout} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              onEditAvatarOpen={handleEditAvatarClick}
              onEditProfileOpen={handleEditProfileClick}
              onAddCardOpen={handleAddCardClick}
              onDeleteCard={deleteCard}
              onCardLike={setLike}
              onCardOpen={handleOpenCardClick}
              cards={cards}
              loggedIn={isAuth}
            />
          }
        />
        <Route path="/sign-in" element={<Login onSubmit={handleAuth} />} />
        <Route
          path="/sign-up"
          element={<Register onSubmit={handleRegister} />}
        />
      </Routes>

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
