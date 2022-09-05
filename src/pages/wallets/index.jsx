import {
  Avatar,
  Button,
  Fab,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddIcon from '@mui/icons-material/Add';

import { useWallet } from '../../libs/hooks/wallet';
import { Loader } from '../../components';
import React from 'react';
import { Box } from '@mui/system';

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
    value: 'RP',
    label: 'Indonesian Rupiah',
  },
  {
    value: 'EUR',
    label: 'Euro',
  },
  {
    value: 'USD',
    label: 'US Dollar',
  },
  {
    value: 'JPY',
    label: 'Yen',
  },
];

export default function Wallet() {
  const { data: wallets, loading } = useWallet();

  const [open, setOpen] = React.useState(false);

  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {wallets.data?.map((wallet) => {
          return (
            <ListItemButton sx={{ px: 1 }}>
              <ListItemAvatar>
                <Avatar>
                  <CreditCardIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={wallet.name}
                secondary={wallet.initial_balance}
              />
            </ListItemButton>
          );
        })}
        {loading ? <Loader /> : null}
      </List>
      <Fab
        sx={{ bottom: 65, right: 25, position: 'absolute' }}
        color="primary"
        aria-label="add"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              // {...register('email')}
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
              // {...register('password')}
            />
            <div></div>
            <Box sx={{ '& button': { mt: 1, mb: 1 } }}>
              <Button
                style={{ width: '100%' }}
                variant="contained"
                size="medium"
                // onClick={handleSubmit(onSubmit)}
              >
                Add Wallet
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
