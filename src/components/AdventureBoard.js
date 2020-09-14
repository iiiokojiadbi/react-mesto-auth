import React, { useState, useEffect } from 'react';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';

import api from './../utils/Api';

import { CurrentUserContext } from './../contexts/CurrentUserContext';
import { StatusRenderContext } from './../contexts/StatusRenderContext';

function AdventureBoard() {
  const [isRenderer, setIsRenderer] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDeleteCardId, setSelectedDeleteCardId] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialData()
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  const handlePreviewOpen = () => setIsPreviewPopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleDeletePlaceClick = ({ cardId }) => {
    setIsDeletePlacePopupOpen(true);
    setSelectedDeleteCardId(cardId);
  };
  const handleCloseAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsPreviewPopupOpen(false);
  };

  const handleCardClick = (infoCard) => {
    setSelectedCard(infoCard);
    handlePreviewOpen();
  };

  const handleUpdaterUser = ({ name, about }) => {
    setIsRenderer(true);
    api
      .updateUserInfo({ name, about })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleCloseAllPopups();
        setIsRenderer(false);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleUpdaterAvatar = ({ avatar }) => {
    setIsRenderer(true);
    api
      .updateUserAvatar({ avatar })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleCloseAllPopups();
        setIsRenderer(false);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleCardLike = ({ likes, cardId }) => {
    const isLiked = likes.some((owner) => owner._id === currentUser._id);
    api
      .likeCard({ isLiked, cardId })
      .then((likes) => {
        const newCards = cards.map((card) =>
          card._id === cardId ? { ...card, likes: likes } : card
        );
        setCards(newCards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleCardDelete = () => {
    setIsRenderer(true);
    api
      .deleteCard({ cardId: selectedDeleteCardId })
      .then(() => {
        const newCards = cards.filter(
          (card) => card._id !== selectedDeleteCardId
        );
        setCards(newCards);
        handleCloseAllPopups();
        setIsRenderer(false);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleAddPlace = ({ name, link }) => {
    setIsRenderer(true);
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
        setIsRenderer(false);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onConfirmDelete={handleDeletePlaceClick}
        />
        <ImagePopup
          {...selectedCard}
          isOpen={isPreviewPopupOpen}
          onClose={handleCloseAllPopups}
        />
        <StatusRenderContext.Provider value={isRenderer}>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleCloseAllPopups}
            onUpdaterUser={handleUpdaterUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleCloseAllPopups}
            onUpdaterUserAvatar={handleUpdaterAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleCloseAllPopups}
            onPost={handleAddPlace}
          />
          <DeletePlacePopup
            isOpen={isDeletePlacePopupOpen}
            onClose={handleCloseAllPopups}
            onDelete={handleCardDelete}
          />
        </StatusRenderContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default AdventureBoard;
