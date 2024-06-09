import React from 'react';
import { observer } from 'mobx-react-lite';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Inputs } from '../../Components/Forms/AuthForm';
import authUser from '../../stores/loginStore';

import AuthForm from '../../Components/Forms/AuthForm';

import { StyledAuthPageWrapper, StyledLeftSide } from './styles';
import Loader from '../../Components/Loader/Loader';

const LoginPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const { userLogin, isLoadingUserAuth } = authUser;

  const submitLoginForm: SubmitHandler<Inputs> = (data) => {
    userLogin({
      email: data.email,
      password: data.password,
      navigate: navigate,
    });
  };

  if (isLoadingUserAuth) {
    return <Loader />;
  }
  return (
    <StyledAuthPageWrapper>
      <StyledLeftSide></StyledLeftSide>
      <AuthForm onSubmit={submitLoginForm} title="Login" />
    </StyledAuthPageWrapper>
  );
});

export default LoginPage;
