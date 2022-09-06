import * as React from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuth } from '../../libs/contexts/auth';

export default function Auth() {
  const { handleSubmit, register } = useForm();

  const { onLogin } = useAuth();
  const onSubmit = (data) => onLogin(data);

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 400, margin: '30vh auto', padding: 2 }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Login Dompetku
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          sx={{ mb: 2 }}
          id="outlined-basic"
          label="Email"
          fullWidth
          name="email"
          variant="outlined"
          {...register('email')}
        />
        <div></div>
        <TextField
          sx={{ mb: 2 }}
          id="outlined-password-input"
          label="Password"
          fullWidth
          type="password"
          name="password"
          autoComplete="off"
          {...register('password')}
        />
        <div></div>
        <Box sx={{ '& button': { mt: 1, mb: 1 } }}>
          <Button
            style={{ width: '100%' }}
            variant="contained"
            size="medium"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
