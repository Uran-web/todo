import { styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const StyledLoader = styled(CircularProgress)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));
