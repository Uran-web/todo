import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import { authSchema } from './schema';
import InputField from '../Inputs/Input';
import { publicPaths } from '../../configs/routes';

import {
  StyledAuthForm,
  StyledFormWrapper,
  StyledFormContainer,
  StyledTitle,
  StyledAuthSelectContainer,
  StyledLink,
} from './styles';

export type Inputs = {
  email: string;
  password: string;
};

interface IAuthFrom {
  onSubmit: SubmitHandler<Inputs>;
  title: string;
}

const AuthForm: React.FC<IAuthFrom> = ({ onSubmit, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(authSchema),
  });

  const navigate = useNavigate();

  const linkName = title === 'Login' ? 'Sign Up' : 'Login';

  const handleNavigate = () => {
    const path = title === 'Login' ? 'signup' : 'login';
    navigate(publicPaths[path], { replace: true });
  };

  return (
    <StyledFormWrapper>
      <StyledFormContainer>
        <StyledTitle>{title}</StyledTitle>
        <StyledAuthForm onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            register={register}
            errors={errors}
          />
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <Button sx={{ width: '100%' }} type="submit">
            Submit
          </Button>
        </StyledAuthForm>

        <StyledAuthSelectContainer>
          <span>Don't have account? </span>
          <StyledLink onClick={handleNavigate}>{linkName}</StyledLink>
        </StyledAuthSelectContainer>
      </StyledFormContainer>
    </StyledFormWrapper>
  );
};

export default AuthForm;
