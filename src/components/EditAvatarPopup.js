import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { ButtonSubmitForm, ErrorSpan } from './ui';

function EditAvatarPopup({ isOpen, onClose, onUpdaterUserAvatar }) {
  const inputUrl = useRef();

  const [avatar, setAvatar] = useState('');
  const [errorAvatar, setErrorAvatar] = useState('');
  const [isAvatarValid, setIsAvatarValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setAvatar('');
    inputUrl.current.value = '';
    hideErrors();
  }, [isOpen]);

  useEffect(() => {
    if (isAvatarValid) setIsValid(true);
    return () => setIsValid(false);
  }, [isAvatarValid]);

  const hideErrors = () => {
    setErrorAvatar('');
    setIsAvatarValid(false);
  };

  const handleUrlChange = () => {
    const { value, validationMessage, validity } = inputUrl.current;
    setAvatar(value);
    if (validationMessage !== errorAvatar) setErrorAvatar(validationMessage);
    if (validity.valid) setIsAvatarValid(true);
    else setIsAvatarValid(false);
  };

  const handleSubmit = () =>
    onUpdaterUserAvatar({
      avatar,
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
        <input
          type='url'
          className='input input_type_hobby form__input'
          placeholder='Ссылка на новый аватар'
          name='urlAvatar'
          id='avatar-input'
          required
          ref={inputUrl}
          onChange={handleUrlChange}
        />
        <ErrorSpan isActive={isAvatarValid} errorText={errorAvatar} />
      </label>
      <ButtonSubmitForm text='Сохранить' label='сохранить' isActive={isValid} />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
