import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import authUser from '../../stores/loginStore';
import AuthForm from '../../Components/Forms/AuthForm';

import { StyledAuthPageWrapper, StyledLeftSide } from './styles';
import Loader from '../../Components/Loader/Loader';

type Inputs = {
  email: string;
  password: string;
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { userSignup, isLoadingUserAuth } = authUser;

  const submitSignUpForm: SubmitHandler<Inputs> = (data) => {
    userSignup({
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
      <AuthForm onSubmit={submitSignUpForm} title="Sign Up" />
    </StyledAuthPageWrapper>
  );
};

export default SignUpPage;
