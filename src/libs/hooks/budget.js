import useSWR, { mutate } from 'swr';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useToast from '../contexts/toast';
import api from '../utils/api';
import { debounce } from '@mui/material';

export const useBudget = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data = [], error, isValidating } = useSWR('/budgets');

  const onAdd = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const { data: res } = await api.post('/budgets', data);

        if (res.success) {
          mutate('/budgets');
          toast('success', 'Budget berhasil disimpan.');

          navigate('/budgets');
        } else {
          toast('error', 'Terjadi kesalahan ketika menyimpan budget');
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
    async (budgetId) => {
      try {
        setLoading(true);
        const { data: res } = await api.delete('/budgets', {
          data: [budgetId],
        });

        if (res.success) {
          mutate('/budgets');
          toast('success', 'Budget berhasil dihapus.');
        } else {
          toast('error', 'Terjadi kesalahan ketika menghapus budget');
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

export const useBudgetDetail = ({ budgetId }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isValidating } = useSWR(`/budgets${budgetId}`);

  const onEdit = useCallback(
    async (data) => {
      try {
        const { data: res } = await api.put(`/budgets${budgetId}`, data);
        if (res.success) {
          mutate(`/budgets${budgetId}`);
          toast('success', 'Budget berhasil disimpan.');

          navigate('budgets');
        } else {
          toast('error', 'Terjadi kesalahan ketika menyimpan budget');
        }
      } catch (error) {
        toast('error', error);
      }
    },
    [navigate, budgetId, toast]
  );

  return {
    data,
    loading: (!error && !data) || isValidating,
    onEdit,
  };
};

export const useSearchBudget = () => {
  const [options, setOptions] = useState([]);

  const fetchData = debounce((name) => {
    api
      .get(`/users/?name=${name}&page=1&limit=10`)
      .then(({ data: res }) => {
        setOptions(res.data);
      })
      .catch(() => setOptions([]));
  }, 400);

  const handleSearchBudget = useCallback(
    (query) => {
      if (query) {
        fetchData(query);
      } else {
        setOptions([]);
      }
    },
    [fetchData]
  );

  return { data: options, search: handleSearchBudget };
};
