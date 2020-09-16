import React, { useEffect, useState } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import logoHeader from '../images/logo.svg';
import { Button } from './ui';

function Header(props) {
  console.log(props);
  const { onLogout, userInfo, history, location } = props;
  const isLogin = location.pathname === '/sign-in';
  const linkText = isLogin ? 'Регистрация' : 'Войти';
  const linkPath = isLogin ? '/sign-up' : '/sign-in';

  return (
    <header className='header'>
      <Link to='/'>
        <img
          src={logoHeader}
          alt='Изображение логотипа социальной сети Mesto Russia'
          className='logo header__logo '
        />
      </Link>
      <div className='header__nav'>
        {location.pathname === '/' && userInfo ? (
          <>
            <span className='header__email'>{userInfo.email}</span>
            <Button
              text='Выйти'
              label='выйти'
              action='header'
              onBtnClick={() => {
                onLogout();
                history.push('/sign-in');
              }}
            />
          </>
        ) : (
          <NavLink to={linkPath} className='header__link'>
            {linkText}
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default withRouter(Header);
