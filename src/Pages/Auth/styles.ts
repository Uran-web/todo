import { styled } from '@mui/material';

export const StyledAuthPageWrapper = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.down('md')]: {
    backgroundImage: "url('public/img/Catalog.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

export const StyledLeftSide = styled('div')(({ theme }) => ({
  width: '50%',
  backgroundImage: "url('img/Catalog.png')",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',

  [theme.breakpoints.down('md')]: {
    display: 'none',
    width: '0%',
  },
}));
