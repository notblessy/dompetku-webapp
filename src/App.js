import { Link, Route, Routes } from 'react-router-dom';
import { GuestOnly, Protector } from './components';
import Auth from './pages/auth';
import Profile from './pages/profile';
import './App.css';

function App() {
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
      </header>
    </div>
  );
}

export default App;
