import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { phoneError } from '../../../helpers/errorMessages';
import {
  actions as actionsNewUser,
} from '../../../features/newUserSlice';
import { validatePhone } from '../../../helpers/validatePhone';

export const InputPhone = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const {
    phone,
    isEmptyPhone,
  } = useAppSelector(state => state.newUser);

  useEffect(() => {
    dispatch(actionsNewUser.setIsEmptyPhone(false));
    setIsError(false);
  }, [phone]);

  return (
    <PatternFormat
      error={isEmptyPhone || isError}
      label="Phone number"
      customInput={TextField}
      helperText={(isEmptyPhone || isError) && phoneError}
      variant="outlined"
      format="+380 (##) ###-##-##"
      allowEmptyFormatting
      mask="X"
      margin="normal"
      value={phone}
      onChange={(event) => (
        dispatch(actionsNewUser.addingPhone(event.target.value))
      )}
      onBlur={() => {
        validatePhone(phone, setIsError);
      }}
      required
      sx={{
        mb: 2,
      }}
    />
  );
};
