import React from 'react';

function InputForm({
  type = 'text',
  placeholder,
  name,
  required = false,
  length = { min: 0, max: 500 },
  pattern = '.*',
  value = '',
  onInputChange,
}) {
  return (
    <input
      type={type}
      className="input form__input"
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

const MemodInputForm = React.memo(InputForm);
export default MemodInputForm;
