import React from 'react';
import Validater from '../../hooks/useValidater';
import {
  Failure,
  FailureToggle,
  Success,
  SuccessToggle,
} from './../../contexts/StatusFetchContext';

const AuthContainer = (Component) => (props) => {
  const failureStatus = Failure();
  const successStatus = Success();
  const failureStatusToggle = FailureToggle();
  const successStatusToggle = SuccessToggle();

  const [
    {
      inputValue: email,
      setInputValue: setEmail,
      isInputValid: emailValid,
      inputErrorText: emailErrorText,
    },
    checkEmail,
  ] = Validater('');
  const [
    {
      inputValue: password,
      setInputValue: setPassword,
      isInputValid: passwordValid,
      inputErrorText: passwordErrorText,
    },
    checkPassword,
  ] = Validater('');

  const inputs = {
    email: (value) => setEmail(value),
    password: (value) => setPassword(value),
  };

  const checkers = {
    email: (target) => checkEmail(target),
    password: (target) => checkPassword(target),
  };

  const handleChangeInput = (evt) => {
    const { value, name, validationMessage, validity } = evt.target;
    const setInput = inputs[name];
    const setChecker = checkers[name];
    setInput(value);
    setChecker({ validationMessage, validity });
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    failureStatusToggle();
  };

  return (
    <Component
      {...props}
      email={email}
      emailValid={emailValid}
      emailErrorText={emailErrorText}
      password={password}
      passwordValid={passwordValid}
      passwordErrorText={passwordErrorText}
      handleChangeInput={handleChangeInput}
      successStatus={successStatus}
      failureStatus={failureStatus}
      successStatusToggle={successStatusToggle}
      failureStatusToggle={failureStatusToggle}
      handleClose={handleClose}
    />
  );
};

export default AuthContainer;
