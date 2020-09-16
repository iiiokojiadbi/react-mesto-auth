import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useValidater } from '../hooks/useValidater';

import { InputForm, ButtonSubmitForm, ErrorSpan } from './../components/ui';
import useLocalStorage from './../hooks/useLocalStorage';
import InfoTooltip from './../components/InfoTooltip';

import {
  useFailure,
  useFailureToggle,
  useSuccess,
  useSuccessToggle,
} from '../contexts/StatusFetchContext';

import api from '../utils/Api';

function Register(props) {
  const { history } = props;
  const failureStatus = useFailure();
  const failureStatusToggle = useFailureToggle();
  const successStatus = useSuccess();
  const successStatusToggle = useSuccessToggle();

  const [
    {
      inputValue: email,
      setInputValue: setEmail,
      isInputValid: emailValid,
      inputErrorText: emailErrorText,
    },
    checkEmail,
  ] = useValidater('');
  const [
    {
      inputValue: password,
      setInputValue: setPassword,
      isInputValid: passwordValid,
      inputErrorText: passwordErrorText,
    },
    checkPassword,
  ] = useValidater('');

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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    api
      .regUser({ email, password })
      .then((data) => {
        console.log(data);
        history.push('/sign-in');
        successStatusToggle();
      })
      .catch((err) => {
        console.log(err);
        failureStatusToggle();
      });
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    failureStatusToggle();
  };

  return (
    <div className='auth'>
      <div className='auth__wrapper'>
        <h3 className='auth__title'>Регистрация</h3>
        <form
          method='post'
          action='#'
          className='form form_type_auth auth__form'
          noValidate
          onSubmit={handleSubmit}
        >
          <label className='form__field form__field_auth'>
            <InputForm
              type='email'
              placeholder='Email'
              name='email'
              required
              value={email}
              onInputChange={handleChangeInput}
              optionClasses='auth__input'
            />
            <ErrorSpan
              isActive={emailValid}
              errorText={emailErrorText}
              optionsClasses='form__input-error_auth'
            />
          </label>
          <label className='form__field form__field_auth'>
            <InputForm
              type='password'
              placeholder='Пароль'
              name='password'
              required
              value={password}
              onInputChange={handleChangeInput}
              optionClasses='auth__input'
            />
            <ErrorSpan isActive={passwordValid} errorText={passwordErrorText} />
          </label>
          <ButtonSubmitForm
            isActive={emailValid && passwordValid}
            text='зарегистрироваться'
            label='зарегистрироваться'
            optionsClasses='btn_auth'
          />
        </form>
        <NavLink to='/sign-in' className='auth__link'>
          Уже зарегистрированы? Войти
        </NavLink>
      </div>
      <InfoTooltip isOpen={successStatus} onClose={successStatusToggle} />
      <InfoTooltip isOpen={failureStatus} onClose={handleClose} type='error' />
    </div>
  );
}

export default Register;
