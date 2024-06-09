import { styled } from '@mui/material';

export const StyledLayoutSection = styled('section')(() => ({
  fontSize: '1.4rem',
}));

export const StyledNav = styled('section')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '5rem',
  borderBottom: '1px solid #f1f1f1',
  background: '#EDEDED',
}));
