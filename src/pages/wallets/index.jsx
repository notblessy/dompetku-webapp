import Moment from 'moment';
import {
  Avatar,
  Button,
  Drawer,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Modal,
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
import { brown } from '@mui/material/colors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 340,
  bgcolor: 'white',
  boxShadow: 24,
  px: 3,
  py: 2,
};

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

      {wallets.data?.map((wallet) => {
        return (
          <React.Fragment>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
              }}
            >
              <ListItemButton sx={{ px: 2, boxShadow: 1 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: brown[400] }}>
                    <CreditCardIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={wallet.name}
                  secondary={wallet.initial_balance}
                />
                <Typography variant="subtitle2">
                  {Moment(wallet.created_at).format('DD-MM-YYYY')}
                </Typography>
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
      <Box maxWidth="sm">
        <Drawer
          sx={{ maxWidth: 500, margin: '0 auto' }}
          anchor="bottom"
          open={open}
          onClose={handleClose}
        >
          <Box sx={{ py: 4, px: 3 }} role="presentation">
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
                {...register('currency_id')}
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
