import { styled } from '@mui/material';

export const StyledFormWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: '50%',
  },

  [theme.breakpoints.down('md')]: {
    padding: '2rem',
  },
}));

export const StyledFormContainer = styled('div')(({ theme }) => ({
  padding: '1.6rem 2rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '8px',

  [theme.breakpoints.up('sm')]: {
    maxWidth: '444px',
  },

  [theme.breakpoints.down('md')]: {
    backgroundColor: '#ffffff',
    opacity: '0.8',
    border: `1px solid transparent`,
  },
}));

export const StyledTitle = styled('div')(({ theme }) => ({
  marginBottom: '1.6rem',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const StyledAuthForm = styled('form')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '& > div:not(last-child)': {
    marginBottom: '1.6rem',
  },
}));

export const StyledAuthSelectContainer = styled('div')(({ theme }) => ({
  marginTop: '2rem',
  fontSize: '1.4rem',
  color: theme.palette.secondary.main,
}));

export const StyledLink = styled('span')(({ theme }) => ({
  textDecoration: 'underline',
  fontWeight: 'bold',
  fontSize: '1.6rem',
  color: theme.palette.common.neonBlue,

  '&:hover': {
    cursor: 'pointer',
  },
}));
