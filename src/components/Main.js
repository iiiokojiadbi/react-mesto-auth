import React, { useContext } from 'react';
import Card from './Card';
import { Button } from './ui';

import { CurrentUserContext } from './../contexts/CurrentUserContext';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onConfirmDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <img
          className='profile__photo'
          src={currentUser.avatar}
          alt='Фотография пользователя'
        />
        <Button
          action='update'
          label='обновить'
          optionalClasses='profile__btn-update'
          onBtnClick={onEditAvatar}
        />
        <div className='profile__info'>
          <h2 className='profile__user-name'>{currentUser.name}</h2>
          <Button
            action='edit'
            label='редактировать'
            optionalClasses='profile__btn-edit'
            onBtnClick={onEditProfile}
          />
          <p className='profile__user-hobby'>{currentUser.about}</p>
        </div>
        <Button
          action='add'
          label='добавить'
          optionalClasses='profile__btn-add'
          onBtnClick={onAddPlace}
        />
      </section>
      <section className='elements'>
        {cards.map((card, index) => {
          return (
            <Card
              key={`${index}-${card._id}`}
              {...card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onConfirmDelete={onConfirmDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
