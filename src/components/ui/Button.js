import React from 'react';
import classnames from 'classnames';

function Button({ action, label, onBtnClick, optionalClasses }) {
  const btnClasses = classnames({
    btn: true,
    [`btn_type_${action}`]: action || false,
    [`${optionalClasses}`]: optionalClasses,
  });

  return (
    <button
      type='button'
      aria-label={label}
      className={btnClasses}
      onClick={onBtnClick}
    ></button>
  );
}

export default Button;
