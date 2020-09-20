import React, { useEffect } from 'react';

const withEscHandler = (overlayClass) => (Wrapped) => (props) => {
  const { isOpen, onClose } = props;

  useEffect(() => {
    const handleEscListener = (evt) => {
      if (evt.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEscListener);

    return () => document.removeEventListener('keydown', handleEscListener);
  }, [isOpen, onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains(overlayClass)) onClose();
  };

  return <Wrapped {...props} onOverlayClick={handleOverlayClick} />;
};

export default withEscHandler;
