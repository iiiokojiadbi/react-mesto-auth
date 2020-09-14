import React from 'react';

function ErrorSpan({ isActive, errorText }) {
  return (
    <span
      className={`form__input-error ${!isActive && 'form__input-error_active'}`}
    >
      {errorText}
    </span>
  );
}

export default ErrorSpan;
