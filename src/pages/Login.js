import React from 'react';
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

function Login(props) {
  const { loggedIn, onLoggedIn, checkToken } = props;
  const [, setJwt] = useLocalStorage('jwt');
  const failureStatus = useFailure();
  const successStatus = useSuccess();
  const failureStatusToggle = useFailureToggle();
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
      .loginUser({ email, password })
      .then(({ token }) => {
        setJwt(token);
        onLoggedIn(true);
        successStatusToggle();
        return token;
      })
      .then(checkToken)
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

  if (loggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth'>
      <div className='auth__wrapper'>
        <h3 className='auth__title'>Вход</h3>
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
            text='войти'
            label='войти'
            optionsClasses='btn_auth'
          />
        </form>
        <NavLink to='/sign-up' className='auth__link'>
          Еще не зарегистрированы? Регистрация
        </NavLink>
      </div>
      <InfoTooltip isOpen={successStatus} onClose={successStatusToggle} />
      <InfoTooltip isOpen={failureStatus} onClose={handleClose} type='error' />
    </div>
  );
}

export default Login;
