import { useBudget } from '../../libs/hooks/budget';
import React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  LinearProgress,
  List,
  ListItemButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { blue, grey } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/system';
import { useCurrency } from '../../libs/hooks/currency';

export default function Budget() {
  const { handleSubmit, register } = useForm();

  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState(1);

  const { data: budgets, onAdd, loading } = useBudget();

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const { data: currencies } = useCurrency();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    setOpen(false);
    onAdd(data);
  };
  return (
    <React.Fragment>
      <Box sx={{ mt: 5, px: 2 }}>
        <Typography variant="h5" align="center" gutterBottom component="div">
          Budgets
        </Typography>
      </Box>
      <Divider></Divider>
      <Box sx={{ width: '100%', mt: 2 }}>
        {budgets.data
          ? budgets.data.map((budget) => {
              return (
                <React.Fragment>
                  <List
                    sx={{
                      width: '100%',
                      bgcolor: 'background.paper',
                      py: 0,
                    }}
                  >
                    <ListItemButton>
                      <Grid container spacing={2}>
                        <Grid item xs={7}>
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: grey[800],
                            }}
                          >
                            {budget.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 15,
                              fontWeight: 'medium',
                              color: blue[700],
                            }}
                          >
                            {budget.amount.toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography
                            sx={{
                              fontSize: 12,
                              left: 0,
                              textAlign: 'right',
                              mr: 2,
                              mt: 2.4,
                              color: grey[700],
                            }}
                          >
                            Left out: {budget.left_out.toLocaleString()}
                          </Typography>
                        </Grid>
                        <LinearProgress
                          sx={{
                            height: 15,
                            borderRadius: 1,
                            mx: 2,
                            my: 1,
                            width: '100%',
                            float: 'left',
                          }}
                          variant="determinate"
                          value={budget.progress}
                        />
                      </Grid>
                    </ListItemButton>
                  </List>
                  <Divider></Divider>
                </React.Fragment>
              );
            })
          : null}
      </Box>
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          sx={{ margin: '0 auto', mt: 7 }}
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          Add new budget
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
                inputProps={register('currency_id', {
                  required: 'Please enter currency',
                })}
                sx={{ mb: 2 }}
              >
                {currencies.data?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
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
