import useSWR from 'swr';
import { createContext, useContext, useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import api from '../utils/api';
import useToast from './toast';

const AuthCtx = createContext({
  loading: false,
  user: null,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['dompetku']);

  const [user, setUser] = useState();

  const { data: res } = useSWR(() =>
    cookies?.accessToken ? '/profile' : null
  );

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onLogin = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const { data: res } = await api.post('/login', data);

        if (res.token) {
          setCookie('access_token', res.token, { path: '/' });
          setUser(res.user);
          setTimeout(() => {
            navigate('/');
          }, 500);
        } else {
          toast('error', 'Gagal mencoba masuk.');
        }
      } catch (error) {
        toast('error', 'Kesalahan pada sistem. ' + error);
      } finally {
        setLoading(false);
      }
    },
    [navigate, setCookie, toast]
  );

  const onLogout = () => {
    removeCookie('accessToken', { path: '/' });
    navigate('/auth');
  };

  return (
    <AuthCtx.Provider value={{ loading, user, onLogin, onLogout }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => useContext(AuthCtx);
