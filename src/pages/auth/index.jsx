import * as React from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuth } from '../../libs/contexts/auth';

export default function Auth() {
  const { handleSubmit, register } = useForm();

  const { onLogin } = useAuth();

  const onSubmit = (data) => onLogin(data);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Login Dompetku
            </Typography>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                {...register('email')}
              />
              <div></div>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                autoComplete="off"
                {...register('password')}
              />
              <div></div>
              <Box sx={{ '& button': { m: 1 } }}>
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
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
    // <main style={{ padding: '1rem 0' }}>
    //   <h2>Auth</h2>
    //   <button
    // onClick={() => {
    //   console.log('clicked');
    //   onLogin('root', 'root');
    // }}
    //   >
    //     Login
    //   </button>
    // </main>
  );
}
