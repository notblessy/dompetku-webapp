import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useAuth } from '../../libs/contexts/auth';

export default function Profile() {
  const { onLogout, user } = useAuth();
  console.log(user);
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8, pb: 2 }}>
        <Avatar
          alt="Remy Sharp"
          src={user?.picture}
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Name"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {user?.name}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Email"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {user?.email}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider component="li" />
        <ListItem
          alignItems="flex-start"
          button
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
        >
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </React.Fragment>
  );
}
