import React, { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { InputForm, ErrorSpan, ButtonSubmitForm } from './ui';

import { CurrentUserContext } from './../contexts/CurrentUserContext';
import Validater from '../hooks/useValidater';

function EditProfilePopup({ isOpen, onClose, onUpdaterUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [
    {
      inputValue: name,
      setInputValue: setName,
      isInputValid: nameValid,
      inputErrorText: nameErrorText,
    },
    checkName,
    resetName,
  ] = Validater(currentUser.name, true);
  const [
    {
      inputValue: about,
      setInputValue: setAbout,
      isInputValid: aboutValid,
      inputErrorText: aboutErrorText,
    },
    checkAbout,
    resetAbout,
  ] = Validater(currentUser.about, true);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);

    return () => {
      resetName();
      resetAbout();
    };
  }, [
    currentUser.about,
    currentUser.name,
    isOpen,
    resetAbout,
    resetName,
    setAbout,
    setName,
  ]);

  const inputs = {
    name: (value) => setName(value),
    about: (value) => setAbout(value),
  };

  const checkers = {
    name: (target) => checkName(target),
    about: (target) => checkAbout(target),
  };

  const handleChangeInput = (evt) => {
    const { value, name, validationMessage, validity } = evt.target;
    const setInput = inputs[name];
    const setChecker = checkers[name];
    setInput(value);
    setChecker({ validationMessage, validity });
  };

  const handleSubmit = () =>
    onUpdaterUser({
      name,
      about,
    });

  return (
    <PopupWithForm
      name='EditForm'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={handleSubmit}
    >
      <label className='form__field'>
        <InputForm
          placeholder='Введите имя'
          name='name'
          length={{ min: 2, max: 40 }}
          pattern='[А-Яа-яёЁA-Za-z\s-]*'
          required
          value={name}
          onInputChange={handleChangeInput}
        />
        <ErrorSpan isActive={nameValid} errorText={nameErrorText} />
      </label>
      <label className='form__field'>
        <InputForm
          placeholder='Введите хобби'
          name='about'
          length={{ min: 2, max: 200 }}
          required
          value={about}
          onInputChange={handleChangeInput}
        />
        <ErrorSpan isActive={aboutValid} errorText={aboutErrorText} />
      </label>
      <ButtonSubmitForm
        text='Сохранить'
        label='сохранить'
        isActive={nameValid && aboutValid}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
