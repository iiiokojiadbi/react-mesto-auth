import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import logoHeader from '../images/logo.svg';
import { Button } from './ui';

function Header(props) {
  const { onLogout, history, location, userInfo, loggedIn } = props;
  const isLogin = location.pathname === '/sign-in';
  const isMain = location.pathname === '/';

  return (
    <header className='header'>
      <img
        src={logoHeader}
        alt='Изображение логотипа социальной сети Mesto Russia'
        className='logo header__logo '
      />
      {!loggedIn && (
        <div className='header__nav'>
          <NavLink
            to={isLogin ? '/sign-up' : '/sign-in'}
            className='header__link'
          >
            {isLogin ? 'Регистрация' : 'Войти'}
          </NavLink>
        </div>
      )}
      {isMain && loggedIn && userInfo && (
        <div className='header__nav'>
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
        </div>
      )}
    </header>
  );
}

/* 
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
*/

export default withRouter(Header);
