import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';
import { CropperDemo } from './CropperDemo';

type Props = {
  open: boolean,
  handleClose: () => void,
  getCroppedFile: (img: string) => void,
};

export const Popup: FC<Props> = ({
  open, handleClose, getCroppedFile,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Crop Image</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CropperDemo
              getCroppedFile={getCroppedFile}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
