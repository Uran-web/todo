import * as yup from 'yup';

export const authSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'At least 8 character')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!])[a-zA-Z\d_!]{8,}$/,
      'Upper and lowercase letters, _, !'
    ),
});
