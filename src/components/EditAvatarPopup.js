import React, { useEffect } from 'react';
import Validater from '../hooks/useValidater';
import PopupWithForm from './PopupWithForm';
import { ButtonSubmitForm, ErrorSpan } from './ui';

function EditAvatarPopup({ isOpen, onClose, onUpdaterUserAvatar }) {
  const [
    { inputValue, setInputValue, isInputValid, inputErrorText },
    doCheckValid,
    reset,
  ] = Validater('');

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const handleUrlChange = (evt) => {
    setInputValue(evt.target.value);
    doCheckValid(evt.target);
  };

  const handleSubmit = () => onUpdaterUserAvatar({ avatar: inputValue });

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
          value={inputValue}
          onChange={handleUrlChange}
        />
        <ErrorSpan isActive={isInputValid} errorText={inputErrorText} />
      </label>
      <ButtonSubmitForm
        text='Сохранить'
        label='сохранить'
        isActive={isInputValid}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
