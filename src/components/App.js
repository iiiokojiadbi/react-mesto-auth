import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdventureBoard from './AdventureBoard';
import PageNotFound from './PageNotFound';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <Switch>
        <Route exact path="/">
          <AdventureBoard />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
