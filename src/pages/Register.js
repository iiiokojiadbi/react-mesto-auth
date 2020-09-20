import React from 'react';
import { NavLink } from 'react-router-dom';

import { InputForm, ButtonSubmitForm, ErrorSpan } from './../components/ui';
import InfoTooltip from './../components/InfoTooltip';
import compose from '../utils/compose';
import { AuthContainer } from '../components/containers';

function Register({
  history,
  requestRegist,
  password,
  passwordValid,
  passwordErrorText,
  email,
  emailValid,
  emailErrorText,
  handleChangeInput,
  successStatus,
  failureStatus,
  successStatusToggle,
  failureStatusToggle,
  handleClose,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    requestRegist({ email, password })
      .then((data) => {
        history.push('/sign-in');
        successStatusToggle();
      })
      .catch((err) => {
        console.log(err);
        failureStatusToggle();
      });
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

export default compose(AuthContainer)(Register);
