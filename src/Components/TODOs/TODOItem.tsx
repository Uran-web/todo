import React from 'react';
import { observer } from 'mobx-react-lite';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { TODOList } from './TODOList';

import { StyledListItemWrapper, StyledTaskDescription } from './styles';

interface ITodoItemProps extends TODOList {
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
  isEditable: boolean;
}

const TODOItem: React.FC<ITodoItemProps> = React.memo(
  observer(
    ({ id, completed, name, handleUpdate, handleDelete, isEditable }) => {
      return (
        <StyledListItemWrapper>
          <>
            <Checkbox
              size="large"
              checked={completed}
              onClick={() => handleUpdate(id)}
            />
            <StyledTaskDescription completed={completed}>
              {name}
            </StyledTaskDescription>
          </>
          <IconButton
            disabled={isEditable}
            size="large"
            color="error"
            onClick={() => handleDelete(id)}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
        </StyledListItemWrapper>
      );
    }
  )
);

export default TODOItem;
