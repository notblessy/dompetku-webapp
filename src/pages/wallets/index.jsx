import Moment from 'moment';
import {
  Avatar,
  Button,
  Drawer,
  List,
  ListItemAvatar,
  ListItemButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddIcon from '@mui/icons-material/Add';

import { useWallet } from '../../libs/hooks/wallet';
import React from 'react';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { lightBlue } from '@mui/material/colors';
import Chart from 'react-apexcharts';

const currencies = [
  {
    value: 1,
    label: 'Indonesian Rupiah',
  },
  {
    value: 2,
    label: 'Euro',
  },
  {
    value: 3,
    label: 'US Dollar',
  },
  {
    value: 4,
    label: 'Yen',
  },
];

export default function Wallet() {
  const { handleSubmit, register } = useForm();

  const { data: wallets, onAdd, loading } = useWallet();

  const [open, setOpen] = React.useState(false);

  const [currency, setCurrency] = React.useState(1);

  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
  };
  const series = [
    {
      name: 'BCA',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: 'FLAZZ',
      data: [85, 53, 45, 32, 34, 52, 41, 50],
    },
  ];

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    setOpen(false);
    onAdd(data);
  };

  return (
    <React.Fragment>
      <Box sx={{ mt: 5, px: 2 }}>
        <Typography variant="h3" gutterBottom component="div">
          Wallets
        </Typography>
      </Box>

      <Chart options={options} series={series} type="area" />

      {wallets.data?.map((wallet) => {
        return (
          <React.Fragment>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                px: 2,
              }}
            >
              <ListItemButton
                sx={{
                  px: 2,
                  py: 1,
                  boxShadow: 1,
                  borderRadius: 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: lightBlue[400] }}>
                    <CreditCardIcon />
                  </Avatar>
                </ListItemAvatar>
                <Box sx={{ px: 2, width: 'auto' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
                    {wallet.name}
                  </Typography>
                  <Typography sx={{ fontSize: 15, fontWeight: 'medium' }}>
                    {wallet.initial_balance.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="caption" sx={{ left: 0 }}>
                    {Moment(wallet.created_at).format('DD-MM-YYYY')}
                  </Typography>
                </Box>
              </ListItemButton>
            </List>
          </React.Fragment>
        );
      })}
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          sx={{ margin: '0 auto', mt: 7 }}
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          Add new wallet
        </Button>
      </Stack>
      <Box>
        <Drawer
          sx={{ alignItems: 'center' }}
          anchor="bottom"
          open={open}
          onClose={handleClose}
        >
          <Box
            role="presentation"
            sx={{
              py: 4,
              px: 2,
              width: 500,
              maxWidth: '100%',
              margin: '0 auto',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new wallet
            </Typography>
            <div></div>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                sx={{ mb: 2 }}
                id="standard-required"
                label="Name"
                fullWidth
                name="name"
                variant="standard"
                {...register('name')}
              />
              <div></div>
              <TextField
                id="standard-select-currency"
                select
                fullWidth
                label="Currency"
                value={currency}
                onChange={handleChange}
                variant="standard"
                // {...register('currency_id')}
                sx={{ mb: 2 }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <div></div>
              <TextField
                sx={{ mb: 2 }}
                id="standard-number"
                type="number"
                label="Initial Balance"
                fullWidth
                name="initial_balance"
                variant="standard"
                defaultValue="0"
                {...register('initial_balance')}
              />
              <div></div>
              <Box sx={{ '& button': { mt: 1, mb: 1 } }}>
                {loading ? (
                  <Button
                    loading
                    loadingPosition="start"
                    style={{ width: '100%' }}
                    variant="contained"
                    size="medium"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    style={{ width: '100%' }}
                    variant="contained"
                    size="medium"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </React.Fragment>
  );
}
