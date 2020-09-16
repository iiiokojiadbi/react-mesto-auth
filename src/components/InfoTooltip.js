import React from 'react';
import { Button } from './ui';

import classnames from 'classnames';
import errorImg from './../images/error.svg';
import successImg from './../images/success.svg';

function InfoTooltip({ isOpen, onClose, type = 'success' }) {
  const tooltipClasses = classnames({
    tooltip: true,
    tooltip_disabled: !isOpen,
  });

  const titleText =
    type === 'success'
      ? `Вы успешно
      зарегистрировались!`
      : `Что-то пошло не так! Попробуйте ещё раз.`;

  const imgStatus = type === 'success' ? successImg : errorImg;
  const altStatus = type === 'success' ? 'successImg' : 'errorImg';

  return (
    <section className={tooltipClasses}>
      <div className='tooltip__container'>
        <Button
          action='close'
          label='закрыть'
          optionalClasses='tooltip__btn-close'
          onBtnClick={onClose}
        />
        <img src={imgStatus} alt={altStatus} className='tooltip__img' />
        <h3 className='tooltip__title'>{titleText}</h3>
      </div>
    </section>
  );
}
export default InfoTooltip;
