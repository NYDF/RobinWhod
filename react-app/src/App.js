import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/loginForm';
import SignUpForm from './components/auth/signupForm/SignUpForm';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import MainPage from './components/DashBoard/MainPage';
import SingleStock from './components/Market/SingleStock';
import Splash from './components/SplashPage/Splash';
import UpdateWatchList from './components/WatchList/UpdateWatchList';
import GetAllStocks from './components/Market/GetAllStocks';
import FourOhFourPage from './components/404Page';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>
        <Route path='/stocks/:symbol' exact={true}>
          <SingleStock />
        </Route>

        <Route path='/stocks' exact={true}>
          <GetAllStocks />
        </Route>

        <Route path='/watchlist/:watchlistId/edit' exact={true}>
          <UpdateWatchList />
        </Route>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute> */}

        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}

        <Route path='/portfolio' exact={true} >
          <MainPage />
        </Route>

        <Route path='/' exact={true} >
          <Splash />
        </Route>

        <Route>
          {/* <h1>THIS IS A 404</h1> */}
          <FourOhFourPage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
