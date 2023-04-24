import useAppContext from '@/hooks/use-app-context';
import useAppPage from '@/hooks/use-page';
import {Select,SelectChangeEvent,MenuItem, Input, TextField, Button, List, Avatar, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography} from '@mui/material';
import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
// import Select from 'react-select'

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

interface MembersPageProps extends React.PropsWithChildren {}

const MembersPage: React.FC<MembersPageProps> = ({}) => {
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
      <div className="container">
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
                Book Appointment
              </Button>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      </div>
    </>
  );
};

export default MembersPage;
