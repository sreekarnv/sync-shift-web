import React from 'react';
// import Avatar from 'boring-avatars';
import useAppContext from '@/hooks/use-app-context';
import useAppPage from '@/hooks/use-page';
import UserProfileCard from '@/components/user-profile-card';
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '@/components/tables/data-table';
import { DataTableItem } from '@/components/tables/data-table-item';

type User = {
  id: number;
  image: string;
  name: string;
  email: string;
  role: string;
};

const defaultData: User[] = [
  {
    name: 'tanner',
    id: 24,
    role: 'STUDENT',
    email: 'tanner@email.com',
    image: '/images/profile.jpeg',
  },
  {
    name: 'tandy',
    id: 40,
    role: 'STAFF',
    email: 'tandy@email.com',
    image: '/images/profile.jpeg',
  },
  {
    name: 'joe',
    id: 45,
    role: 'STUDENT',
    email: 'joe@email.com',
    image: '/images/profile.jpeg',
  },
];

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor(
    (row) => {
      return {
        name: row.name,
        image: row.image,
      };
    },
    {
      cell: (props) => (
        <DataTableItem.Profile
          name={props.getValue().name}
          image={props.getValue().image}
        />
      ),
      id: 'name',
      header: () => <span>User</span>,
      enableSorting: true,
    }
  ),

  columnHelper.accessor('email', {
    id: 'email',
    header: () => <span>Email Address</span>,
    cell: (props) => props.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor('role', {
    id: 'role',
    header: () => <span>Role</span>,
    cell: (props) => <DataTableItem.RoleBadge role={props.getValue()} />,
  }),

  columnHelper.display({
    id: 'action',
    header: () => <span>Actions</span>,
    cell: () => <DataTableItem.Action userId="userId" />,
  }),
];

type FormValues = {
  SearchValue: string;
};

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.SearchValue ? values : {},
//     errors: !values.SearchValue
//       ? {
//           SearchValue: {
//             type: 'required',
//             message: 'This is required.',
//           },
//         }
//       : {},
//   };
// };

const ProfilePage: React.FC = () => {
  const { user } = useAppContext();
  const { current } = useAppPage();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="row">
      <div className="col-md-9">
        <DataTable columns={columns} data={defaultData} />
        {/* <div className="row">
          <div className="col-md-7">
            <FormInput
              label="Search"
              placeholder="Search Faculty, Facilty and Peers..."
            />
            <Button
              type="submit"
              color="info"
              // onClick={onSubmit}
              variant="solid"
            >
              Search
            </Button>
          </div>

          <div className="col-md-5">
            <div className="row">
              <FormSelect
                rootClassName="mb-4 col-6"
                id="member-type"
                label="Choose Member"
                // onChange={handleSelectMember}
                options={[
                  { children: 'Faculty', value: 'faculty' },
                  { children: 'Facilities', value: 'facilities' },
                  { children: 'Peers', value: 'peers' },
                ]}
                children={<FormOption />}
              />

              <FormSelect
                rootClassName="mb-4 col-6"
                // disabled={memberType === 'facilities'}
                // onChange={handleSelectMember}
                id="search-text-type"
                label="Filter Search By"
                options={[
                  { children: 'Name', value: 'name' },
                  { children: 'Email Address', value: 'email' },
                ]}
                children={<FormOption />}
              />
            </div>
          </div>
        </div> */}
        {/* TODO: DELETE CUZ BELOW ONE IS NOT NEEDED */}
        {/* <Box
          width={'100%'}
          alignItems="center"
          justifyContent="center"
          display="flex"
          padding={2}
        >
          <List sx={{ width: '80%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar />
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
                    {'- ' + user.email}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Button variant="solid" color="primary">
                  View Profile
                </Button>
                <Button variant="solid" color="secondary">
                  Withdraw Appointment
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </Box> */}
        {/* <Modal
          //  open={open2} onClose={handleClose2}

          className="ViewProfileModal"
        >
          <Box sx={viewProfileStyle}>
            <Box display="flex" flexDirection="row">
              <Avatar
                name={user.name}
                variant="beam"
                colors={['#92A1C6', '#146A7C', '#C271B4', '#C20D90']}
              />
              <Box width={10} />
              <Box display="flex" flexDirection="column">
                <Typography>{user.name}</Typography>
                <Typography>{user.email}</Typography>
                <Typography>{user.role}</Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Modal
          // open={open} onClose={handleClose}
          className="Withdraw Modal"
        >
          <Box sx={style}>
            <Typography>Participants</Typography>
            <Typography>Email 1</Typography>
            <Typography>Email 2</Typography>
            <TextField label="Reason"></TextField>
            <Button>Withdraw Booking </Button>
          </Box>
        </Modal> */}
      </div>
      <div className="col-md-3">
        <UserProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;
