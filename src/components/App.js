import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

// component imports
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

// context imports
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// utils imports
import api from '../utils/api';
import auth from '../utils/auth'
import InfoTooltip from './InfoTooltip';

function App() {
  // history
  const history = useHistory();

  // auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [userEmail, setUserEmail] = useState(null);

  // popup state
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  // card state
  const [selectedCard, setSelectedCard] = useState({});

  // popup open handlers
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // popup close handler
  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  // current user state
  const [currentUser, setCurrentUser] = useState({});

  // cards state
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getCards() ])
      .then((values) => {
        const [user, cards] = values;

        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, []);

  // like card
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  // delete card
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(err));
  }

  // update user profile
  function handleUpdateUser(userInfo) {
    api.updateUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // update user avatar
  function handleUpdateAvatar(data) {
    return api.updateUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // add new card
  function handleAddPlace(cardData) {
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  // register
  function handleSignup(userData) {
    auth.signup(userData)
      .then(res => {
        setIsSignupSuccess(true);
      })
      .catch(err => {
        setIsSignupSuccess(false);
      })
      .finally(setIsInfoTooltipOpen(true))
  }

  // login
  function handleSignin(userData) {
    auth.signin(userData)
      .then(res => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        history.push('/');
      })
      .catch(err => console.log(err))
  }

  // logout
  function handleSignout() {
    setUserEmail(null);
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  // token check
    useEffect(() => {
    if (localStorage.getItem('jwt')) {
      auth.checkToken(localStorage.getItem('jwt'))
        .then(res => {
          setUserEmail(res.data.email);
          setIsLoggedIn(true);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onSignout={handleSignout} userEmail={userEmail} isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/sign-up">
            <Register
              onSignup={handleSignup}
            />
          </Route>

          <Route exact path="/sign-in">
            <Login
              onSignin={handleSignin}
            />
          </Route>

          <ProtectedRoute
            path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        { isLoggedIn && <Footer /> }

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSignupSuccess={isSignupSuccess}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
