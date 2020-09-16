import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { AdventureBoard, PageNotFound, Authentication } from './../pages';
import Header from './Header';
import Footer from './Footer';
import { ProtectedRoute } from './HOC';
import useLocalStorage from '../hooks/useLocalStorage';

import api from '../utils/Api';

function App(props) {
  const { history } = props;
  const [token, setToken] = useLocalStorage('jwt');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    if (token && !fetched) {
      api
        .checkUser(`Bearer ${token}`)
        .then(({ data }) => {
          setLoggedIn(true);
          setFetched(true);
          setUserInfo(data);
        })
        .catch((err) => {
          setValidToken(false);
          console.log('Ошибка', err);
        });
    }
  }, [token, loggedIn, history, userInfo, fetched]);

  const handleLogout = () => {
    setToken('');
    setValidToken(false);
    setFetched(false);
    setLoggedIn(false);
  };

  return (
    <div className='page'>
      <Header userInfo={userInfo} onLogout={handleLogout} />
      <Switch>
        <ProtectedRoute
          exact
          path='/'
          component={AdventureBoard}
          loggedIn={loggedIn}
        />
        <Route
          path='/sign-in'
          render={(props) =>
            loggedIn ? (
              <Redirect to='/' />
            ) : (
              <Authentication
                {...props}
                onLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
              />
            )
          }
        />
        <Route
          path='/sign-up'
          render={(props) => (
            <Authentication
              {...props}
              onLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          )}
        />
        <Route path='*' component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

console.log({ _id: '5f6117726ea136001299e470', email: 'klerc21@yandex.ru' });
console.log({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Z…5NjR9.PrAflQOTJHV6tCyWHaCJKJHS3K7nRVWgxb_wMToAzuA',
});

export default withRouter(App);
