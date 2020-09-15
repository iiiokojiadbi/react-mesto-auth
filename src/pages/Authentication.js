import React from 'react';
import { NavLink } from 'react-router-dom';
import { useValidater } from '../hooks/useValidater';
import { InputForm, ButtonSubmitForm, ErrorSpan } from './../components/ui';

function getPageOptions(isLogin) {
  if (isLogin) {
    return {
      title: 'Вход',
      buttonText: 'войти',
      linkText: 'Еще не зарегистрированы? Регистрация',
      linkUrl: '/sign-up',
    };
  } else {
    return {
      title: 'Регистрация',
      buttonText: 'зарегистрироваться',
      linkText: 'Уже зарегистрированы? Войти',
      linkUrl: '/sign-in',
    };
  }
}

function Authentication(props) {
  const isLogin = props.match.path === '/sign-in';
  const pageOptions = getPageOptions(isLogin);

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
    console.log({ email, password });
  };

  return (
    <div className='auth'>
      <div className='auth__wrapper'>
        <h3 className='auth__title'>{pageOptions.title} </h3>
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
            <ErrorSpan isActive={emailValid} errorText={emailErrorText} />
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
            text={pageOptions.buttonText}
            label={pageOptions.buttonText}
            optionsClasses='btn_auth'
          />
        </form>
        <NavLink to={pageOptions.linkUrl} className='auth__link'>
          {pageOptions.linkText}
        </NavLink>
      </div>
    </div>
  );
}

export default Authentication;
