import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { emailError } from '../../../helpers/errorMessages';
import {
  actions as actionsNewUser,
} from '../../../features/newUserSlice';
import { getErrorMessage } from '../../../helpers/getErrorMessage';
import { validateEmail } from '../../../helpers/validateEmail';

export const InputEmail = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const {
    email,
    isEmptyEmail,
  } = useAppSelector(state => state.newUser);

  const isEmailError = () => {
    if (!validateEmail(email)) {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsError(false);
    dispatch(actionsNewUser.setIsEmptyEmail(false));
  }, [email]);

  return (
    <TextField
      label="Email"
      error={isEmptyEmail || isError}
      variant="outlined"
      type="email"
      helperText={getErrorMessage(isError, isEmptyEmail, emailError)}
      required
      fullWidth
      margin="normal"
      value={email}
      onChange={(event) => (
        dispatch(actionsNewUser.addingEmail(event.target.value))
      )}
      onBlur={isEmailError}
    />
  );
};
