import { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import { DocumentData } from 'firebase/firestore';
import { observer } from 'mobx-react-lite';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import userStore from '../../stores/userStore';
import tasksStore from '../../stores/tasksStore';

import Loader from '../Loader/Loader';
import InputField from '../Inputs/Input';
import TODOItem from './TODOItem';

import {
  StyledButton,
  StyledLabel,
  StyledListWrapper,
  StyledListP,
} from './styles';

export type TODOList = {
  id: string;
  name: string;
  completed: boolean;
  user_id: string;
};

const userData = localStorage.getItem('user');
const docId = JSON.parse(userData as string);

const TODOList = observer(() => {
  const { userPermissions, getUserInfo, getUserPermission, isLoadingUserInfo } =
    userStore;
  const {
    tasks,
    createTask,
    getUserTasks,
    updateTask,
    deleteTask,
    isLoadingTasks,
    isLoadingUserTasks,
  } = tasksStore;

  const [todoList, setTodoList] = useState<DocumentData[]>([]);
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState<number | string>('');
  const [checkPermissions, setCheckPermissions] = useState(false);

  useEffect(() => {
    getUserInfo({ id: docId.docId });

    getUserTasks({ userId: docId.userId });
  }, [getUserInfo, getUserTasks]);

  useEffect(() => {
    setTodoList(tasks);
  }, [tasks]);

  const sortedList = useMemo(() => {
    const completed = todoList.filter((todo) => todo.completed);
    const incomplete = todoList.filter((todo) => !todo.completed);
    return [...incomplete, ...completed];
  }, [todoList]);

  const list = useMemo(() => {
    return sortedList.filter(
      (el) =>
        typeof search === 'string' && el.name.toLowerCase().includes(search)
    );
  }, [search, sortedList]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchable = event.target.value.toLowerCase();

    setSearch(searchable);
  };

  const handleAddNewTodo = () => {
    if (newTask.trim() === '') return;

    const newTodo: TODOList = {
      id: `${newTask}-${new Date()}`,
      name: newTask,
      completed: false,
      user_id: '',
    };

    setTodoList((prevState) => [newTodo, ...prevState]);
    createTask({
      completed: false,
      name: newTask,
      userId: docId.userId,
    });
    setNewTask('');
  };

  const handleDelete = useCallback(
    (id: string) => {
      setTodoList((prevState) => prevState.filter((todo) => todo.id !== id));
      deleteTask({ id });
    },
    [setTodoList, deleteTask]
  );

  const handleChangeNewTask = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNewTask(value);
  };

  const handleUpdate = useCallback(
    (id: string) => {
      setTodoList((prevState) => {
        return prevState.map((currentTodo) => {
          if (currentTodo.id === id) {
            updateTask({ completed: !currentTodo.completed, id });
            return { ...currentTodo, completed: !currentTodo.completed };
          } else {
            return currentTodo;
          }
        });
      });
    },
    [setTodoList, updateTask]
  );

  const handleCheckPermission = () => {
    setCheckPermissions((prevState) => {
      if (!prevState) {
        getUserPermission({ userId: docId.userId });
      }
      return !prevState;
    });
  };

  if (isLoadingUserInfo || isLoadingTasks || isLoadingUserTasks) {
    return <Loader />;
  }
  return (
    <StyledListWrapper>
      <FormControlLabel
        control={
          <Switch
            checked={checkPermissions}
            onChange={handleCheckPermission}
            disabled={checkPermissions && !!userPermissions.editable}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={'Edit'}
      />
      <div style={{ marginBottom: '2rem' }}>
        <InputField
          name="search"
          type="text"
          icon={<SearchIcon fontSize="large" />}
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div>
        <StyledLabel htmlFor="addTodo">Add new task</StyledLabel>
        <InputField
          name="addTodo"
          type="text"
          value={newTask}
          onChange={handleChangeNewTask}
          disabled={!userPermissions.editable}
        />
        <StyledButton
          type="button"
          onClick={handleAddNewTodo}
          disabled={!newTask || !userPermissions.editable}
        >
          Add
        </StyledButton>
      </div>
      <div>
        <StyledListP>Show your best performance</StyledListP>
        {list.map((todo) => (
          <TODOItem
            key={todo.id}
            id={todo.id}
            user_id={todo.user}
            completed={todo.completed}
            name={todo.name}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            isEditable={!userPermissions.editable}
          />
        ))}
      </div>
    </StyledListWrapper>
  );
});

export default TODOList;
