import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AdventureBoard, PageNotFound, Authentication } from './../pages';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className='page'>
      <Header />
      <Switch>
        <Route path='/sign-in' component={Authentication} />
        <Route path='/sign-up' component={Authentication} />
        <Route exact path='/' component={AdventureBoard} />
        <Route path='*' component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
