import React, {Suspense, useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import Layout from './hoc/layout/Layout';

import Login from './containers/Auth/Login/Login';
import SignUp from './containers/Auth/SignUp/SignUp';

import Logout from './containers/Auth/Logout/Logout';
import VerifyEmail from './containers/Auth/VerifyEmail/VerifyEmail';
import RecoverPassword from './containers/Auth/RecoverPassword/RecoverPassword';
import Profile from './containers/Auth/Profile/Profile';
import Loader from './components/UI/Loader/Loader';
import Library from './containers/Library/Library';

const App = ({loggedIn, emailVerified}) => {
  let routes;

  useEffect(() => {
    document.title = "Wiki ems";
  }, []);

  if (loggedIn && !emailVerified) {
    routes = (
      <Switch>
        <Route exact path='/verify-email' component={VerifyEmail} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/logout' component={Logout} />
        <Redirect to='/verify-email' />
      </Switch>
    );
  } else if (loggedIn && emailVerified) {
    routes = (
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/' component={Library} />
          <Route exact path='/profile'>
            <Profile loggedIn={loggedIn} />
          </Route>
          <Route exact path='/logout' component={Logout} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/recover" component={RecoverPassword} />
        <Redirect to='/login' />
      </Switch>
    );
  }

  return (
    <Layout>
      {routes}
    </Layout>
  );
};

const mapStateToProps = ({firebase}) => ({
  loggedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified
});

export default connect(mapStateToProps)(App);
