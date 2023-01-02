import { useState } from 'react';
import { Avatar, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsNewUser } from '../../features/newUserSlice';
import { Popup } from '../cropper/Popup';
import { Upload } from '../cropper/Upload';

import 'cropperjs/dist/cropper.css';

export const ImageUpload = () => {
  const [open, setOpen] = useState(false);
  const { preview } = useAppSelector(state => state.newUser);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const getCroppedFile = (img: string | ArrayBuffer | null) => {
    if (typeof img === 'string') {
      dispatch(actionsNewUser.setPreview(img));
    }

    handleClose();
  };

  const getUploadedFile = (img: string | ArrayBuffer | null) => {
    setOpen(true);

    if (typeof img === 'string') {
      dispatch(actionsNewUser.setPreview(img));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: 56,
      }}
    >
      {preview && (
        <Avatar
          alt="Avatar"
          src={preview}
          sx={{
            width: 56,
            height: 56,
            mr: 2,
          }}
        />
      )}

      <Upload
        getUploadedFile={getUploadedFile}
      />
      <Popup
        open={open}
        handleClose={handleClose}
        getCroppedFile={getCroppedFile}
      />
    </Box>
  );
};
