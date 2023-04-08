import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { ProtectedRouteElement } from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //pr12
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);
  const navigate = useNavigate();
  const [isSignPopupOpen, setSignPopupOpen] = useState(false);
  const [email, setEmail] = useState('')

  useEffect(() => {
    auth.checkAuth()
      .then((data) => {
        setIsLoggedIn(true);
        setEmail(data.email);
        navigate('/', { replace: true })
      })
      .catch(err => console.log(err));
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getDefaultCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSignPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id))
      })
      .catch(err => console.log(err))
  }

  function handleUpdateUser(data) {
    api
      .editUserProfile(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddCardSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleSignup(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          console.log(res);
          setSignSuccess(true);
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setSignSuccess(false);
      })
      .finally(() => setSignPopupOpen(true))
  }

  function handleSignin(password, email) {
    auth
      .signin(password, email)
      .then((res) => {
        if (res) {
          setEmail(email);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setSignSuccess(false);
        setSignPopupOpen(true);
      })
  }

  function handleSignout() {
    auth.signout()
      .then(() => {
        setEmail('');
        setIsLoggedIn(false);
        navigate('/sign-in');
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">

        <Header
          email={email}
          onClick={handleSignout}
        />
        <Routes>
          <Route path='/'
            element={
              <ProtectedRouteElement
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                isLoggedIn={isLoggedIn} />
            } />
          <Route path='/sign-up'
            element={
              <Register
                onSignup={handleSignup} />
            } />
          <Route path='/sign-in'
            element={
              <Login
                onSignin={handleSignin} />
            } />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit} />

        <DeleteCardPopup />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isSignPopupOpen}
          onClose={closeAllPopups}
          signupSuccess={signSuccess}
          tooltip={signSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
