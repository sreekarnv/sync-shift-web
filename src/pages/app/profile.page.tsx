import { Box, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import React from 'react';
import Avatar from 'boring-avatars';
import useAppContext from '@/hooks/use-app-context';
import useAppPage from '@/hooks/use-page';
import { useForm, Resolver } from 'react-hook-form';
import {Select,SelectChangeEvent,MenuItem, Input, TextField, Button} from '@mui/material';

type FormValues = {
  SearchValue: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.SearchValue ? values : {},
    errors: !values.SearchValue
      ? {
          SearchValue: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

interface ProfilePageProps extends React.PropsWithChildren {}

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { user, clearJwtFromStorage } = useAppContext();
  const { current } = useAppPage();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));
  const [memberType, setMemberType] = React.useState('faculty');

  const handleChange = (event: SelectChangeEvent) => {
    setMemberType(event.target.value as string);
  };
  if (!user) {
    return <></>;
  }
  return (
    <>
      <div>
        <h1>User Profile Goes Here</h1>
          <div className="avatar-container">
            <Avatar
              name={user.name}
              variant="beam"
              colors={['#92A1C6', '#146A7C', '#C271B4', '#C20D90']}
            />
          </div>
          <div className='user-info flex-column text center'>
            <Typography>{user.email}</Typography>
            <Typography>{user.role}</Typography>
          </div>
        <h2> Your Upcoming Appointments</h2>   
        <form>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={memberType}
            label="member type"
            onChange={handleChange}
          >
            <MenuItem value={"faculty"}>Faculty</MenuItem>
            <MenuItem value={"facilities"}>Facilities</MenuItem>
            <MenuItem value={"peers"}>Peers</MenuItem>
          </Select>
          <TextField id="search-value" label="search faculty, facilities and peers..." variant="outlined" />
          <Button type='submit' onClick={onSubmit} variant="contained">Search</Button>
        </form>
        <List sx={{ width: '80%', bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar/>
            </ListItemAvatar>
            <ListItemText
              primary="Dr. Raveen kumar"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {user.role}
                  </Typography>
                  {"- "+user.email}
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <Button variant='contained'>
                View Profile
              </Button>
              <Button variant='contained'>
                Withdraw Appointment
              </Button>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      </div>
    </>
  );
};

export default ProfilePage;
