import React from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import Login from './components/Login';
import WelcomePage from './components/WelcomePage';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <div className="App">

      {/* PrivateRoutes */}
      <Switch>
        <PrivateRoute exact path="/protected" component={FriendsList} />
        <Route path="/login" component={Login} />
        <Route component={Login} />
      </Switch>

      {/* Routes */}
      <Route exact path="/" component={WelcomePage} />

      {/* NavLinks */}
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}

export default App;
