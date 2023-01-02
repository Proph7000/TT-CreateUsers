import { FC, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  actions as actionsUsers,
  removeAvatar,
  removeUser,
} from '../../features/usersSlice';

const AccordionStyled = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  '.MuiAccordionSummary-content': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

type Props = {
  name: string,
  surname: string,
  email: string,
  birthdate: string,
  phone: string,
  id: string,
  avatarRef: string | null,
};

export const UserAccordion: FC<Props> = ({
  name,
  surname,
  email,
  birthdate,
  phone,
  id,
  avatarRef,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const {
    currentUserId,
    deleting,
    deletedUserId,
  } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent, newExpanded: boolean,
  ) => {
    setExpanded(newExpanded ? panel : false);

    if (currentUserId === id) {
      dispatch(actionsUsers.setCurrentUserId(''));
    } else {
      dispatch(actionsUsers.setCurrentUserId(id));
    }

    return event;
  };

  useEffect(() => {
    if (currentUserId !== id) {
      setExpanded(false);
    }
  }, [currentUserId]);

  const hadleRemoveUser = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(removeUser(id));

    if (avatarRef) {
      dispatch(removeAvatar(avatarRef));
    }

    dispatch(actionsUsers.setDeletedUserId(id));
  };

  return (
    <AccordionStyled
      expanded={expanded === id}
      onChange={handleChange(id)}
    >
      <AccordionSummary
        aria-controls={`${id}d-content`}
        id={`${id}d-header`}
      >
        <Typography>
          {`${name} ${surname}`}
        </Typography>

        <IconButton
          aria-label="delete"
          onClick={hadleRemoveUser}
          disabled={deleting && deletedUserId === id}
        >
          <DeleteIcon />
        </IconButton>
      </AccordionSummary>

      <AccordionDetails>
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Link href={`mailto: ${email}`} underline="hover">
            { email }
          </Link>
          <Link href={`tel: ${phone}`} underline="hover">
            { phone }
          </Link>
          {birthdate && (
            <Typography>
              {`Birthdate: ${birthdate}`}
            </Typography>
          )}
        </Typography>
      </AccordionDetails>
    </AccordionStyled>
  );
};
