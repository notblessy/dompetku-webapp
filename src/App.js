import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  CssBaseline,
} from '@mui/material';

import { GuestOnly, Protector } from './components';

import Auth from './pages/auth';
import Profile from './pages/profile';
import { useCookies } from 'react-cookie';

function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState('home');

  const [cookies] = useCookies();

  const handleChange = (event, newValue) => {
    const nav = newValue !== 'home' ? newValue : '';
    navigate(nav);
    setValue(newValue);
  };

  return (
    <div className="App">
      <CssBaseline />
      <header className="App-header">
        {/* <Link to="/">Profile</Link> | <Link to="/auth">Auth</Link> */}
        <Container maxWidth="sm">
          <Routes>
            <Route element={<Protector />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<GuestOnly />}>
              <Route path="auth" element={<Auth />} />
            </Route>
          </Routes>
        </Container>
        {cookies?.accessToken ? (
          <BottomNavigation
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={3}
            onChange={handleChange}
          >
            <BottomNavigation value={value} sx={{ width: 500 }}>
              <BottomNavigationAction
                label="Home"
                value="home"
                icon={<HomeIcon />}
              />
              <BottomNavigationAction
                label="Transaction"
                value="transaction"
                icon={<PaidIcon />}
              />
              <BottomNavigationAction
                label="Wallets"
                value="wallets"
                icon={<CreditCardIcon />}
              />
              <BottomNavigationAction
                label="Budgets"
                value="budgets"
                icon={<AccountBalanceIcon />}
              />
              <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={<AccountCircleIcon />}
              />
            </BottomNavigation>
          </BottomNavigation>
        ) : null}
      </header>
    </div>
  );
}

export default App;
