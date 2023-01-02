import { Fragment, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  actions as actionsUsers,
  initUsers,
} from '../../features/usersSlice';
import { UserAccordion } from '../userAccordion';
import { Loader } from '../Loader';

export const UsersList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, isAdded } = useAppSelector(state => state.users);

  useEffect(() => {
    if (!users.length || isAdded) {
      dispatch(initUsers());
    }

    dispatch(actionsUsers.setIsAdded(false));
  }, []);

  return (
    <>
      {loading && (
        <Box mt={10}>
          <Loader />
        </Box>
      )}

      {!loading && users.length !== 0 && (
        <Typography
          align="center"
          sx={{
            mt: 10,
          }}
        >
          {users.length === 1 ? (
            'There is 1 user in the list'
          ) : (
            `There are ${users.length} users in the list`
          )}
        </Typography>
      )}

      {!loading && (
        users.length !== 0 ? (
          <List sx={{
            width: '100%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            m: 'auto',
            mt: 1,
          }}
          >
            {users.map((user, i) => (
              <Fragment key={user.id}>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar
                      alt="Avatar"
                      src={user.avatarUrl !== null ? user.avatarUrl : ''}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      m: 'auto',
                    }}
                    secondary={(
                      <UserAccordion
                        name={user.name}
                        surname={user.surname}
                        email={user.email}
                        birthdate={user.birthdate}
                        phone={user.phone}
                        id={user.id}
                        avatarRef={user.avatarRef}
                      />
                    )}
                  />
                </ListItem>
                {i !== users.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </Fragment>
            ))}
          </List>
        ) : (
          <Typography
            variant="h2"
            gutterBottom
            textAlign="center"
            sx={{
              m: 8,
            }}
          >
            There are no users yet
          </Typography>
        )
      )}
    </>
  );
};
