import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { InputForm, ButtonSubmitForm } from './../components/ui';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='auth'>
      <div className='auth__wrapper'>
        <h3 className='auth__title'>{pageOptions.title} </h3>
        <form
          method='post'
          action='#'
          className='form form_type_auth auth__form'
          noValidate
        >
          <label className='form__field form__field_auth'>
            <InputForm
              placeholder='Email'
              name='email'
              required
              value={email}
              onInputChange={() => {}}
            />
          </label>
          <label className='form__field form__field_auth'>
            <InputForm
              placeholder='Пароль'
              name='password'
              required
              value={password}
              onInputChange={() => {}}
            />
          </label>
          <ButtonSubmitForm
            text={pageOptions.buttonText}
            label={pageOptions.buttonText}
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
