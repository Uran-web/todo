import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material';

import TODOList from '../../Components/TODOs/TODOList';

const PageWrapper = styled('section')(() => ({
  padding: '1rem 1.6rem',
  height: '100dvh',
  position: 'relative',
}));

const TodoPage = observer(() => {
  return (
    <PageWrapper>
      <TODOList />
    </PageWrapper>
  );
});

export default TodoPage;
