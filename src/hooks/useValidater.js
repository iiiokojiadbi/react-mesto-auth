import { useState, useEffect, useCallback } from 'react';

export const useValidater = (initialValue, valid = false) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [inputErrorText, setInputErrorText] = useState('');
  const [isInputValid, setIsInputValid] = useState(valid);
  const [target, setTarget] = useState(null);
  const [validationActive, setValidationActive] = useState(false);

  const doCheckValid = useCallback((targetInput) => {
    if (targetInput) {
      setTarget(targetInput);
      setValidationActive(true);
    }
  }, []);

  const resetErrors = useCallback(() => {
    setInputErrorText('');
  }, []);

  useEffect(() => {
    if (inputValue === '') {
      resetErrors();
      setValidationActive(false);
    }

    if (validationActive) {
      const { validationMessage, validity } = target;
      if (validationMessage !== inputErrorText) {
        setInputErrorText(validationMessage);
      }
      if (validity.valid) {
        setIsInputValid(true);
      } else {
        setIsInputValid(false);
      }
    }
  }, [inputErrorText, inputValue, resetErrors, target, validationActive]);

  return [
    { inputValue, setInputValue, isInputValid, inputErrorText },
    doCheckValid,
  ];
};
