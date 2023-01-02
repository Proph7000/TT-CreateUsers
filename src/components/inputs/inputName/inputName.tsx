import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { nameError } from '../../../helpers/errorMessages';
import {
  actions as actionsNewUser,
} from '../../../features/newUserSlice';
import { getErrorMessage } from '../../../helpers/getErrorMessage';

export const InputName = () => {
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();
  const {
    name,
    isEmptyName,
  } = useAppSelector(state => state.newUser);

  const isNameError = () => {
    if (name.length < 4) {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsError(false);
    dispatch(actionsNewUser.setIsEmptyName(false));
  }, [name]);

  return (
    <TextField
      error={isEmptyName || isError}
      label="First name"
      variant="outlined"
      helperText={getErrorMessage(isError, isEmptyName, nameError)}
      required
      fullWidth
      margin="normal"
      value={name}
      onChange={(event) => (
        dispatch(actionsNewUser.addingName(event.target.value))
      )}
      onBlur={isNameError}
    />
  );
};
