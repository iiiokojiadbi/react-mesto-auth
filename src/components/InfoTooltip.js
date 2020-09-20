import React from 'react';
import { Button } from './ui';

import classnames from 'classnames';
import { optionsInfoTooltip } from '../constants';

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
