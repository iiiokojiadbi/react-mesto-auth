import React, { useEffect, useState, useCallback } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { AdventureBoard, PageNotFound, Register, Login } from './../pages';
import Header from './Header';
import Footer from './Footer';
import { ProtectedRoute } from './HOC';
import useLocalStorage from '../hooks/useLocalStorage';
import InfoTooltips from './InfoTooltip';

import StatusFetchContext from './../contexts/StatusFetchContext';

import api from '../utils/Api';

function App(props) {
  const { history } = props;
  const { pathname } = props.location;
  const [token, setToken] = useLocalStorage('jwt');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  const checkToken = useCallback((token) => {
    api
      .checkUser(`Bearer ${token}`)
      .then(({ data }) => {
        setLoggedIn(true);
        setFetched(true);
        setTokenValid(true);
        setUserInfo(data);
      })
      .catch((err) => {
        console.log('Ошибка', err);
      });
  }, []);

  useEffect(() => {
    if (token && !fetched) {
      checkToken();
    }
  }, [token, loggedIn, pathname, userInfo, fetched, history, checkToken]);

  const handleLogout = () => {
    setToken('');
    setFetched(false);
    setTokenValid(false);
    setLoggedIn(false);
  };

  return (
    <div className='page'>
      <Header userInfo={userInfo} onLogout={handleLogout} loggedIn={loggedIn} />
      <Switch>
        <StatusFetchContext>
          <ProtectedRoute
            exact
            path='/'
            component={AdventureBoard}
            loggedIn={loggedIn}
            tokenValid={tokenValid}
          />
          <Route
            path='/sign-in'
            render={(props) => (
              <Login
                {...props}
                onLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                checkToken={checkToken}
              />
            )}
          />
          <Route
            path='/sign-up'
            render={(props) => (
              <Register
                {...props}
                onLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
              />
            )}
          />
          {/* <Route path='/' exact component={PageNotFound} /> */}
        </StatusFetchContext>
      </Switch>
      <Footer />
      <InfoTooltips />
    </div>
  );
}

export default withRouter(App);
