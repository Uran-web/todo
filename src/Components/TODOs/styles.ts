import { styled } from '@mui/material';
import Button from '@mui/material/Button';

export const StyledListP = styled('h2')(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}));

export const StyledButton = styled(Button)(({ theme, disabled }) => ({
  border: disabled
    ? '1px solid transparent'
    : `1px solid ${theme.palette.primary.main}`,
  marginTop: '1.6rem',
  width: '100%',

  [theme.breakpoints.up(450)]: {
    width: '10rem',
  },
}));

export const StyledLabel = styled('label')(() => ({
  fontWeight: 500,
}));

export const StyledListWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    maxWidth: '500px',
  },
}));

export const StyledListItemWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const StyledTaskDescription = styled('span')<{ completed: boolean }>(
  ({ theme, completed }) => ({
    wordWrap: 'break-word',

    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? theme.palette.secondary.main : '#353535',
  })
);
