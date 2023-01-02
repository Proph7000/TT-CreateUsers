import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsNewUser } from '../../features/newUserSlice';
import { actions as actionsUsers } from '../../features/usersSlice';
import { addNewUser, AddAvatar, actions as actionsUser }
  from '../../features/userSlice';
import { InputName } from '../inputs/inputName';
import { InputEmail } from '../inputs/inputEmail';
import { InputPhone } from '../inputs/inputPhone';
import { validateEmail } from '../../helpers/validateEmail';
import { validatePhone } from '../../helpers/validatePhone';
import { ImageUpload } from '../uploadImg';
import { Avatar } from '../../types/Avatar';

export const FormAddUser = () => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useAppDispatch();
  const {
    name,
    surname,
    birthdate,
    email,
    phone,
    preview,
  } = useAppSelector(state => state.newUser);
  const {
    addedSucces,
    submitting,
  } = useAppSelector(state => state.user);

  const validateForm = (): void => {
    if (!name.length) {
      dispatch(actionsNewUser.setIsEmptyName(true));
    }

    if (!email.length) {
      dispatch(actionsNewUser.setIsEmptyEmail(true));
    }

    if (!validatePhone(phone) || !phone.length) {
      dispatch(actionsNewUser.setIsEmptyPhone(true));
    }
  };

  const addUser = async () => {
    if (preview) {
      const avatar: Avatar = {
        name: email,
        data: preview,
      };

      await Promise.all([
        dispatch(addNewUser({
          name,
          surname,
          phone,
          email,
          birthdate,
          avatarName: `avatars/${email}`,
        })),
        dispatch(AddAvatar(avatar)),
      ]);
    } else {
      await Promise.all([
        dispatch(addNewUser({
          name,
          surname,
          phone,
          email,
          birthdate,
          avatarName: '',
        })),
      ]);
    }

    dispatch(actionsUsers.setIsAdded(true));

    return dispatch(actionsNewUser.clearForm());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateForm();

    if (name.length >= 4 && validateEmail(email) && validatePhone(phone)) {
      addUser();
    }
  };

  useEffect(() => {
    dispatch(actionsUser.resetAddedSucces());
    setIsAdded(false);
  }, []);

  useEffect(() => {
    if (addedSucces) {
      setIsAdded(true);
    }

    const timer = setTimeout(setIsAdded, 5000, false);

    return () => {
      clearTimeout(timer);
      dispatch(actionsUser.resetAddedSucces());
    };
  }, [addedSucces]);

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        maxWidth: '500px',
        mt: 10,
      }}
      noValidate
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: 'gray',
          mb: 1,
        }}
        gutterBottom
      >
        Fields with * are required.
      </Typography>

      <ImageUpload />

      <InputName />

      <TextField
        label="Surname"
        variant="outlined"
        fullWidth
        margin="normal"
        value={surname}
        onChange={(event) => (
          dispatch(actionsNewUser.addingSurname(event.target.value))
        )}
      />

      <InputEmail />

      <TextField
        variant="outlined"
        type="date"
        fullWidth
        label="Birthdate"
        InputLabelProps={{ shrink: true }}
        margin="normal"
        value={birthdate}
        onChange={(event) => (
          dispatch(actionsNewUser.addingBirthdate(event.target.value))
        )}
      />

      <InputPhone />

      {submitting ? (
        <LoadingButton
          endIcon={<SendIcon />}
          loading={submitting}
          loadingPosition="end"
          variant="contained"
        >
          Adding
        </LoadingButton>
      ) : (
        <Button
          variant="outlined"
          type="submit"
          sx={{
            mb: 2,
          }}
        >
          Add user
        </Button>
      )}

      {isAdded && (
        <Alert severity="success">
          Added success
        </Alert>
      )}
    </Box>
  );
};
