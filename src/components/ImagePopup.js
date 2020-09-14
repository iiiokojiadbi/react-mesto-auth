import React, { useEffect } from 'react';
import classnames from 'classnames';

import Button from './ui/Button';

function ImagePopup({ name, link, onClose, isOpen }) {
  const popupClasses = classnames({
    popup: true,
    popup_disabled: !isOpen,
  });

  useEffect(() => {
    const handleEscListener = (evt) => {
      if (evt.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEscListener);

    return () => document.removeEventListener('keydown', handleEscListener);
  }, [isOpen, onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains('popup')) onClose();
  };

  return (
    <section
      className={popupClasses}
      id="popupCardPreview"
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <section className="preview-image popup__preview">
          <Button
            action="close"
            label="закрыть"
            optionalClasses="popup__btn-close preview-image__btn-close"
            onBtnClick={onClose}
          />
          <img
            src={link}
            alt={name}
            className="preview-image__img popup__img"
          />
          <h3 className="preview-image__title popup__title">{name}</h3>
        </section>
      </div>
    </section>
  );
}

const MemodImagePopup = React.memo(ImagePopup);
export default MemodImagePopup;
