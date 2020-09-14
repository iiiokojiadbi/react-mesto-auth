import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmitForm from './ui/ButtonSubmitForm';
import InputForm from './ui/InputForm';
import ErrorSpan from './ui/ErrorSpan';

function AddPlacePopup({ isOpen, onClose, onPost }) {
  const [name, setName] = useState();
  const [link, setLink] = useState();
  const [errorName, setErrorName] = useState('');
  const [errorLink, setErrorLink] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setName('');
    setLink('');
    hideErrors();
  }, [isOpen]);

  useEffect(() => {
    if (isNameValid && isLinkValid) setIsValid(true);

    return () => {
      setIsValid(false);
    };
  }, [isNameValid, isLinkValid]);

  const hideErrors = () => {
    setErrorName('');
    setErrorLink('');
    setIsNameValid(false);
    setIsLinkValid(false);
  };

  const handleNameChange = (evt) => {
    const { value, validationMessage, validity } = evt.target;
    setName(value);
    if (validationMessage !== errorName) setErrorName(validationMessage);
    if (validity.valid) setIsNameValid(true);
    else setIsNameValid(false);
  };

  const handleLinkChange = (evt) => {
    const { value, validationMessage, validity } = evt.target;
    setLink(value);
    if (validationMessage !== errorLink) setErrorLink(validationMessage);
    if (validity.valid) setIsLinkValid(true);
    else setIsLinkValid(false);
  };

  const handleSubmit = () => onPost({ name, link });

  return (
    <PopupWithForm
      name="AddForm"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={handleSubmit}
    >
      <label className="form__field">
        <InputForm
          placeholder="Название места"
          name="place"
          required
          length={{ min: 1, max: 30 }}
          value={name}
          onInputChange={handleNameChange}
        />
        <ErrorSpan isActive={isNameValid} errorText={errorName} />
      </label>
      <label className="form__field">
        <InputForm
          type="url"
          placeholder="Ссылка на картинку"
          name="linkPlace"
          required
          value={link}
          onInputChange={handleLinkChange}
        />
        <ErrorSpan isActive={isLinkValid} errorText={errorLink} />
      </label>
      <ButtonSubmitForm text="Создать" label="создать" isActive={isValid} />
    </PopupWithForm>
  );
}

const MemodAddPlacePopup = React.memo(AddPlacePopup);
export default MemodAddPlacePopup;
