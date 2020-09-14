import React from 'react';
import PopupWithForm from './PopupWithForm'; // !
import ButtonSubmitForm from './ui/ButtonSubmitForm';

function DeletePlacePopup({ isOpen, onClose, onDelete }) {
  return (
    <PopupWithForm
      name="DeleteForm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={onDelete}
    >
      <ButtonSubmitForm text="Да" label="подтвердить" isActive={true} />
    </PopupWithForm>
  );
}

const MemodDeletePlacePopup = React.memo(DeletePlacePopup);
export default MemodDeletePlacePopup;
