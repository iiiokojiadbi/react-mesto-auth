import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AdventureBoard, Register, Login } from './../pages';
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
  const [token, setToken, removeToken] = useLocalStorage('jwt');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    let skipCheckTokenAfterDestroy = false;

    if (token && !fetched) {
      api
        .checkUser(`Bearer ${token}`)
        .then(({ data }) => {
          if (skipCheckTokenAfterDestroy) {
            setLoggedIn(true);
            setFetched(true);
            setTokenValid(true);
            setUserInfo(data);
          }
        })
        .catch((err) => {
          if (skipCheckTokenAfterDestroy) {
            console.log(err);
          }
        });
    }

    return () => {
      skipCheckTokenAfterDestroy = true;
    };
  }, [token, loggedIn, pathname, userInfo, fetched, history]);

  const handleLogout = () => {
    setFetched(false);
    setTokenValid(false);
    setLoggedIn(false);
    removeToken();
    history.push('/sign-in');
  };

  const handleLogin = ({ email, password, success, failure }) => {
    api
      .loginUser({ email, password })
      .then(({ token }) => {
        setToken(token);
        setLoggedIn(true);
        success();
        return token;
      })
      .catch((err) => {
        console.log(err);
        failure();
      });
  };

  const handleRegister = ({ email, password, success, failure }) => {
    api
      .regUser({ email, password })
      .then(() => {
        history.push('/sign-in');
        success();
      })
      .catch((err) => {
        console.log(err);
        failure();
      });
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
            requestGetInitialData={api.getInitialData}
            requestUpdateUserInfo={api.updateUserInfo}
            requestUpdateUserAvatar={api.updateUserAvatar}
            requestLikeCard={api.likeCard}
            requestDeleteCard={api.deleteCard}
            requestPostCard={api.postCard}
          />
          <Route
            path='/sign-in'
            render={(props) => (
              <Login {...props} loggedIn={loggedIn} onAuth={handleLogin} />
            )}
          />
          <Route
            path='/sign-up'
            render={(props) => (
              <Register {...props} onAuth={handleRegister} />
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
