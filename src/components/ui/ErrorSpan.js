import React from 'react';

function ErrorSpan({ isActive, errorText, optionsClasses = '' }) {
  return (
    <span
      className={`form__input-error ${
        !isActive && 'form__input-error_active'
      } ${optionsClasses}`}
    >
      {errorText}
    </span>
  );
}

export default ErrorSpan;
