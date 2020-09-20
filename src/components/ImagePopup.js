import React from 'react';
import classnames from 'classnames';

import { Button } from './ui';
import { withEscHandler } from './HOC';
import compose from './../utils/compose';

function ImagePopup({ name, link, onClose, isOpen, onOverlayClick }) {
  const popupClasses = classnames({
    popup: true,
    popup_disabled: !isOpen,
  });

  return (
    <section
      className={popupClasses}
      id='popupCardPreview'
      onClick={onOverlayClick}
    >
      <div className='popup__container'>
        <section className='preview-image popup__preview'>
          <Button
            action='close'
            label='закрыть'
            optionalClasses='popup__btn-close preview-image__btn-close'
            onBtnClick={onClose}
          />
          <img
            src={link}
            alt={name}
            className='preview-image__img popup__img'
          />
          <h3 className='preview-image__title popup__title'>{name}</h3>
        </section>
      </div>
    </section>
  );
}

export default compose(withEscHandler('popup'))(ImagePopup);
