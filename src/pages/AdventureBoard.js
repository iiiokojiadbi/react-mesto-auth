import React, { useState, useEffect } from 'react';
import Main from './../components/Main';
import ImagePopup from './../components/ImagePopup';
import EditProfilePopup from './../components/EditProfilePopup';
import EditAvatarPopup from './../components/EditAvatarPopup';
import AddPlacePopup from './../components/AddPlacePopup';
import DeletePlacePopup from './../components/DeletePlacePopup';

import { CurrentUserContext } from './../contexts/CurrentUserContext';
import { StatusRenderContext } from './../contexts/StatusRenderContext';

import InfoTooltip from '../components/InfoTooltip';
import { Success, SuccessToggle } from '../contexts/StatusFetchContext';

function AdventureBoard({
  requestGetInitialData,
  requestUpdateUserInfo,
  requestUpdateUserAvatar,
  requestLikeCard,
  requestDeleteCard,
  requestPostCard,
}) {
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

  const successStatus = Success();
  const successStatusToggle = SuccessToggle();

  useEffect(() => {
    requestGetInitialData()
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, [requestGetInitialData]);

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
    requestUpdateUserInfo({ name, about })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleCloseAllPopups();
        setIsRenderer(false);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleUpdaterAvatar = ({ avatar }) => {
    setIsRenderer(true);
    requestUpdateUserAvatar({ avatar })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleCloseAllPopups();
        setIsRenderer(false);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleCardLike = ({ likes, cardId }) => {
    const isLiked = likes.some((owner) => owner._id === currentUser._id);
    requestLikeCard({ isLiked, cardId })
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
    requestDeleteCard({ cardId: selectedDeleteCardId })
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
    requestPostCard({ name, link })
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
          <InfoTooltip
            isOpen={successStatus}
            onClose={successStatusToggle}
            type='login'
          />
        </StatusRenderContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default AdventureBoard;
