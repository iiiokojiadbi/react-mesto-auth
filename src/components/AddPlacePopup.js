import React, { useEffect } from 'react';
import Validater from '../hooks/useValidater';
import PopupWithForm from './PopupWithForm';
import { InputForm, ErrorSpan, ButtonSubmitForm } from './ui';

function AddPlacePopup({ isOpen, onClose, onPost }) {
  const [
    {
      inputValue: name,
      setInputValue: setName,
      isInputValid: nameValid,
      inputErrorText: nameErrorText,
    },
    checkName,
    resetName,
  ] = Validater('');
  const [
    {
      inputValue: url,
      setInputValue: setUrl,
      isInputValid: urlValid,
      inputErrorText: urlErrorText,
    },
    checkUrl,
    resetUrl,
  ] = Validater('');

  useEffect(() => {
    return () => {
      resetName();
      resetUrl();
    };
  }, [isOpen, resetUrl, resetName]);

  const inputs = {
    place: (value) => setName(value),
    linkPlace: (value) => setUrl(value),
  };

  const checkers = {
    place: (target) => checkName(target),
    linkPlace: (target) => checkUrl(target),
  };

  const handleChangeInput = (evt) => {
    const { value, name, validationMessage, validity } = evt.target;
    const setInput = inputs[name];
    const setChecker = checkers[name];
    setInput(value);
    setChecker({ validationMessage, validity });
  };

  const handleSubmit = () => onPost({ name, link: url });

  return (
    <PopupWithForm
      name='AddForm'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={handleSubmit}
    >
      <label className='form__field'>
        <InputForm
          placeholder='Название места'
          name='place'
          required
          length={{ min: 1, max: 30 }}
          value={name}
          onInputChange={handleChangeInput}
        />
        <ErrorSpan isActive={nameValid} errorText={nameErrorText} />
      </label>
      <label className='form__field'>
        <InputForm
          type='url'
          placeholder='Ссылка на картинку'
          name='linkPlace'
          required
          value={url}
          onInputChange={handleChangeInput}
        />
        <ErrorSpan isActive={urlValid} errorText={urlErrorText} />
      </label>
      <ButtonSubmitForm
        text='Создать'
        label='создать'
        isActive={urlValid && nameValid}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
