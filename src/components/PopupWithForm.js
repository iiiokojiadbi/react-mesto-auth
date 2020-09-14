import React, { useEffect, useCallback } from 'react';
import classnames from 'classnames';

import Button from './ui/Button';

function PopupWithForm({
  name,
  title,
  isOpen = false,
  onClose,
  onSubmitForm,
  children,
}) {
  const popupClasses = classnames({
    popup: true,
    popup_disabled: !isOpen,
  });

  const linkClose = useCallback(onClose);

  useEffect(() => {
    const handleEscListener = (evt) => {
      if (evt.key === 'Escape') linkClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEscListener);

    return () => {
      document.removeEventListener('keydown', handleEscListener);
    };
  }, [isOpen, linkClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains('popup')) onClose(); // ???
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitForm();
  };

  return (
    <section
      className={popupClasses}
      id={`popup${name}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <Button
          action="close"
          label="закрыть"
          optionalClasses="popup__btn-close"
          onBtnClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form
          name={name}
          method="post"
          action="#"
          className="form popup__form"
          onSubmit={handleSubmit}
          noValidate
        >
          {children}
        </form>
      </div>
    </section>
  );
}

const MemodPopupWithForm = React.memo(PopupWithForm);
export default MemodPopupWithForm;
