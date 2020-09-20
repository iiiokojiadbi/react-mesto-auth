import React, { useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { Button } from './ui';
import compose from '../utils/compose';
import { withEscHandler } from './HOC';

function PopupWithForm({
  name,
  title = '',
  isOpen = false,
  onClose,
  onSubmitForm,
  onOverlayClick,
  children,
}) {
  const popupClasses = classnames({
    popup: true,
    popup_disabled: !isOpen,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitForm();
  };

  return (
    <section
      className={popupClasses}
      id={`popup${name}`}
      onClick={onOverlayClick}
    >
      <div className='popup__container'>
        <Button
          action='close'
          label='закрыть'
          optionalClasses='popup__btn-close'
          onBtnClick={onClose}
        />
        <h3 className='popup__title'>{title}</h3>
        <form
          name={name}
          method='post'
          action='#'
          className='form popup__form'
          onSubmit={handleSubmit}
          noValidate
        >
          {children}
        </form>
      </div>
    </section>
  );
}

export default compose(withEscHandler('popup'))(PopupWithForm);
