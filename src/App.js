import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
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
import Wallet from './pages/wallets';

function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState(window.location.pathname.substr(1));

  const [cookies] = useCookies();

  const handleChange = (event, newValue) => {
    const nav = newValue !== 'home' ? newValue : 'home';
    navigate(nav);
    setValue(newValue);
  };

  return (
    <div className="App">
      <CssBaseline />
      <header className="App-header">
        <Container maxWidth="xs" sx={{ px: 1, pb: 20 }}>
          <Routes>
            <Route element={<Protector />}>
              <Route path="/wallets" element={<Wallet />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<GuestOnly />}>
              <Route path="auth" element={<Auth />} />
            </Route>
          </Routes>
        </Container>
        {cookies?.accessToken ? (
          <BottomNavigation
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              maxWidth: '100%',
              boxShadow: 3,
            }}
            onChange={handleChange}
          >
            <BottomNavigation
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                maxWidth: 500,
                margin: '0 auto',
              }}
              value={value}
            >
              <BottomNavigationAction
                label="Home"
                value="home"
                icon={<HomeIcon />}
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
