import React from 'react';
import classnames from 'classnames';

function InputForm({
  type = 'text',
  placeholder,
  name,
  required = false,
  length = { min: 0, max: 500 },
  pattern = '.*',
  value = '',
  onInputChange,
  optionClasses,
}) {
  const inputClasses = classnames({
    input: true,
    input__form: true,
    [optionClasses]: optionClasses,
  });

  return (
    <input
      type={type}
      className={inputClasses}
      placeholder={placeholder}
      name={name}
      required={required}
      minLength={length.min}
      maxLength={length.max}
      pattern={pattern}
      value={value}
      onChange={onInputChange}
    />
  );
}

export default InputForm;
