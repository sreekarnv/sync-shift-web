import useAppContext from '@/hooks/use-app-context';
import useAppPage from '@/hooks/use-page';
import {Select,SelectChangeEvent,MenuItem, Input, TextField, Button, List, Avatar, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography, Box, Modal, InputLabel, FormControl} from '@mui/material';
import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];


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
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const viewProfileStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5
};



interface MembersPageProps extends React.PropsWithChildren {}

const MembersPage: React.FC<MembersPageProps> = ({}) => {
  const { user, clearJwtFromStorage } = useAppContext();
  const { current } = useAppPage();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));
  const [memberType, setMemberType] = React.useState('faculty');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = React.useState([]);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [searchBy, setSearchBy] = React.useState('name');

  const handleChange = (event: SelectChangeEvent) => {
    setMemberType(event.target.value as string);
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value as string);
  };
  if (!user) {
    return <></>;
  }
  return (

      <Box className="container">
      <Box display='flex' flexDirection='row' width='100%' alignItems='center' justifyContent='space-around' padding={2}>
          <Box width='20%'>
            <FormControl fullWidth>
              <InputLabel id="member-type">Member Type</InputLabel>
                <Select 
                  fullWidth
                  labelId="member-type"
                  id="member-type-simple-select"
                  value={memberType}
                  label="member type"
                  onChange={handleChange}
                >
                  <MenuItem value={"faculty"}>Faculty</MenuItem>
                  <MenuItem value={"facilities"}>Facilities</MenuItem>
                  <MenuItem value={"peers"}>Peers</MenuItem>
                </Select>
            </FormControl>
          </Box>
          {memberType!='facilities' && <Box width={'20%'}>
            <FormControl fullWidth>
              <InputLabel id="search-by">Search By</InputLabel>
              <Select 
                  fullWidth
                  labelId="search-by"
                  id="search-by-simple-select"
                  value={searchBy}
                  label="search by"
                  onChange={handleChange2}
                >
                  <MenuItem value={"name"}>Name</MenuItem>
                  <MenuItem value={"email"}>Email</MenuItem>
                </Select>
              </FormControl>
          </Box>}
          <Box display='flex' width='40%'>
            <TextField fullWidth  id="search-value" label="search faculty, facilities and peers..." variant="outlined" />
            
          </Box>
          <Box display='flex' width={100}>
              <Button fullWidth type='submit' onClick={onSubmit} variant="contained">Search</Button>
            </Box>
        </Box>
        <Box width={'100%'} alignItems='center' justifyContent='center' display='flex' padding={2}>
        <List sx={{ width: '80%', bgcolor: 'background.paper'}}>
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
                <Button variant='contained'  sx={{ m: 0.5 }} onClick={handleOpen2}>
                  View Profile
                </Button>
                <Button variant='contained'  sx={{ m: 0.5 }} onClick={handleOpen}>
                  Book Appointment
                </Button>
              </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
        </Box>
        <Modal 
        open={open2}
        onClose={handleClose2} 
        className='ViewProfileModal'>
        <Box sx={viewProfileStyle}>
          <Box display='flex' flexDirection='row' >
            <Avatar
              name={user.name}
              variant="beam"
              colors={['#92A1C6', '#146A7C', '#C271B4', '#C20D90']}
            />
            <Box width={10}/>
            <Box display='flex' flexDirection='column'>
              <Typography>{user.name}</Typography>
              <Typography>{user.email}</Typography>
              <Typography>{user.role}</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography> Add Participants</Typography>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
          <Typography>Select Timing</Typography>
          <Select 
              fullWidth
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
          <TextField  label="Agenda"></TextField>
          <Button>Finish Booking </Button>
        </Box>
      </Modal>
      </Box>
  );
};

export default MembersPage;
