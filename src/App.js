import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import { GuestOnly, Protector } from './components';

import Auth from './pages/auth';
import Profile from './pages/profile';

function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState('home');

  const handleChange = (event, newValue) => {
    const nav = newValue !== 'home' ? newValue : '';
    navigate(nav);
    setValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Profile</Link> | <Link to="/auth">Auth</Link>
        <Routes>
          <Route element={<Protector />}>
            <Route path="/" element={<Profile />} />
          </Route>
          <Route element={<GuestOnly />}>
            <Route path="auth" element={<Auth />} />
          </Route>
        </Routes>
        <BottomNavigation
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
          onChange={handleChange}
        >
          <BottomNavigation value={value}>
            <BottomNavigationAction
              label="Home"
              value="home"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="Transactions"
              value="transactions"
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
              label="Account"
              value="account"
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
        </BottomNavigation>
      </header>
    </div>
  );
}

export default App;
