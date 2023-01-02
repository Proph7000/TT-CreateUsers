import { FC, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Input = styled('input')({
  display: 'none',
});

type Props = {
  getUploadedFile: (img: string | ArrayBuffer | null) => void,
};

export const Upload: FC<Props> = ({ getUploadedFile }) => {
  const input = useRef<HTMLInputElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let files;

    if (event.target) {
      files = event.target.files;
    }

    const reader = new FileReader();

    reader.onload = () => {
      getUploadedFile(reader.result);
    };

    if (files) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClick = () => {
    if (input.current?.value) {
      input.current.value = '';
    }
  };

  return (
    <label htmlFor="contained-button-file" style={{ flexGrow: 1 }}>
      <Input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
        ref={input}
      />
      <Button
        variant="outlined"
        component="span"
        sx={{
          width: '100%',
          height: '56px',
        }}
        onClick={handleClick}
      >
        Chose photo
      </Button>
    </label>
  );
};
