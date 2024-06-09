import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

export const StyledInput = styled(TextField)(() => ({
  width: '100%',

  '& > div': {
    fontSize: '1.4rem',
  },
}));
