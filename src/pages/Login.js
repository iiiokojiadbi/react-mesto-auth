import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { InputForm, ButtonSubmitForm, ErrorSpan } from './../components/ui';
import useLocalStorage from './../hooks/useLocalStorage';
import InfoTooltip from './../components/InfoTooltip';
import { AuthContainer } from '../components/containers';
import compose from '../utils/compose';

function Login({
  loggedIn,
  onLoggedIn,
  requestСheckToken,
  requestLogin,
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
  const [, setJwt] = useLocalStorage('jwt');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    requestLogin({ email, password })
      .then(({ token }) => {
        setJwt(token);
        onLoggedIn(true);
        successStatusToggle();
        return token;
      })
      .then(requestСheckToken)
      .catch((err) => {
        console.log(err);
        failureStatusToggle();
      });
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

export default compose(AuthContainer)(Login);
