import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

function App() {
  const ctx = useContext(AuthContext)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          {!ctx.isLoggedIn && <AuthPage />}
          {ctx.isLoggedIn && <Redirect to='/profile' />}
        </Route>
        {ctx.isLoggedIn && <Route path='/profile'>
          <UserProfile />
        </Route>}
        <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
