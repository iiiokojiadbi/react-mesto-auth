import React, { useContext } from 'react';
import classnames from 'classnames';
import { Button } from './ui';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

function Card({
  name,
  link,
  owner,
  likes,
  _id,
  onCardClick,
  onCardLike,
  onConfirmDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isMyCard = owner._id === currentUser._id;
  const isMyLike = likes.some((owner) => owner._id === currentUser._id);

  const btnLikeClasses = classnames({
    btn_type_like: isMyLike,
    'element__btn-like': true,
  });

  const handleCardClick = () => onCardClick({ name, link });
  const handleCardLike = () => onCardLike({ likes: likes, cardId: _id });
  const handleConfirmDelete = () => onConfirmDelete({ cardId: _id });

  return (
    <div className='element'>
      <img
        src={link}
        alt={name}
        className='element__img'
        onClick={handleCardClick}
      />
      <h2 className='element__title'>{name}</h2>{' '}
      <span className='element__likes'>{likes.length}</span>
      <Button
        action='not-like'
        label='лайкнуть'
        optionalClasses={btnLikeClasses}
        onBtnClick={handleCardLike}
      />
      {isMyCard && (
        <Button
          action='trash'
          label='удалить'
          optionalClasses='element__btn-trash'
          onBtnClick={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Card;
