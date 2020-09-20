import React from 'react';
import { Button } from './ui';

import classnames from 'classnames';
import errorImg from './../images/error.svg';
import successImg from './../images/success.svg';

function optionsInfoTooltip(type) {
  switch (type) {
    case 'error':
      return {
        imgStatus: errorImg,
        altStatus: 'errorImg',
        titleStatus: 'Что-то пошло не так! Попробуйте ещё раз.',
      };
    case 'login':
      return {
        imgStatus: successImg,
        altStatus: 'successImg',
        titleStatus: 'Вы успешно авторизовались!',
      };
    default:
      return {
        imgStatus: successImg,
        altStatus: 'successImg',
        titleStatus: 'Вы успешно зарегистрировались!',
      };
  }
}

function InfoTooltip({ isOpen, onClose, type }) {
  const tooltipClasses = classnames({
    tooltip: true,
    tooltip_disabled: !isOpen,
  });

  const { titleStatus, imgStatus, altStatus } = optionsInfoTooltip(type);

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
        <h3 className='tooltip__title'>{titleStatus}</h3>
      </div>
    </section>
  );
}
export default InfoTooltip;
