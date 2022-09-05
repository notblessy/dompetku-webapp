import useSWR, { mutate } from 'swr';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useToast from '../contexts/toast';
import api from '../utils/api';
import { debounce } from '@mui/material';

export const useWallet = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data = [], error, isValidating } = useSWR('/wallets');

  const onAdd = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const { data: res } = await api.post('/wallets', data);
        if (res.success) {
          mutate('/wallets');
          toast('success', 'Wallet berhasil disimpan.');

          navigate('/wallets');
        } else {
          toast('error', 'Terjadi kesalahan ketika menyimpan wallet');
        }
      } catch (error) {
        toast('error', error);
      } finally {
        setLoading(false);
      }
    },
    [navigate, toast]
  );

  const onDelete = useCallback(
    async (walletId) => {
      try {
        setLoading(true);
        const { data: res } = await api.delete('/wallets', {
          data: [walletId],
        });

        if (res.success) {
          mutate('/wallets');
          toast('success', 'Wallet berhasil dihapus.');
        } else {
          toast('error', 'Terjadi kesalahan ketika menghapus wallet');
        }
      } catch (error) {
        toast('error', error);
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return {
    data,
    loading: (!error && !data) || isValidating || loading,
    onAdd,
    onDelete,
  };
};

export const useWalletDetail = ({ walletId }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isValidating } = useSWR(`/wallets${walletId}`);

  const onEdit = useCallback(
    async (data) => {
      try {
        const { data: res } = await api.put(`/wallets${walletId}`, data);
        if (res.success) {
          mutate(`/wallets${walletId}`);
          toast('success', 'Wallet berhasil disimpan.');

          navigate('wallets');
        } else {
          toast('error', 'Terjadi kesalahan ketika menyimpan wallet');
        }
      } catch (error) {
        toast('error', error);
      }
    },
    [navigate, walletId, toast]
  );

  return {
    data,
    loading: (!error && !data) || isValidating,
    onEdit,
  };
};

export const useSearchWallet = () => {
  const [options, setOptions] = useState([]);

  const fetchData = debounce((name) => {
    api
      .get(`/users/?name=${name}&page=1&limit=10`)
      .then(({ data: res }) => {
        setOptions(res.data);
      })
      .catch(() => setOptions([]));
  }, 400);

  const handleSearchUser = useCallback(
    (query) => {
      if (query) {
        fetchData(query);
      } else {
        setOptions([]);
      }
    },
    [fetchData]
  );

  return { data: options, search: handleSearchUser };
};
