import { ChangeEventHandler, ReactNode } from 'react';
// import { SvgIconProps } from '@mui/material';
import {
  FieldErrors,
  UseFormRegister,
  Path,
  FieldValues,
} from 'react-hook-form';

import { StyledInput } from './styles';
import InputAdornment from '@mui/material/InputAdornment';
// import SearchIcon from '@mui/icons-material/Search';

export interface IInputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  type: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  value?: FieldValues | string | number;
  onChange?:
    | ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  icon?: ReactNode;
  disabled?: boolean;
}

const InputField = <T extends FieldValues>({
  name,
  placeholder,
  type,
  register,
  errors,
  value,
  onChange,
  icon,
  disabled = false,
}: IInputProps<T>) => {
  // NOTE: if we have register, then input belong to form
  // on the other hand - it's a simple input
  return register ? (
    <>
      <StyledInput
        placeholder={placeholder}
        type={type}
        {...register(name)}
        error={!!errors?.[name]}
        helperText={errors?.[name]?.message as string}
        disabled={disabled}
      />
    </>
  ) : (
    <>
      <StyledInput
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        InputProps={
          icon
            ? {
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <SearchIcon fontSize="large" /> */}
                    {icon}
                  </InputAdornment>
                ),
              }
            : undefined
        }
        disabled={disabled}
      />
    </>
  );
};

export default InputField;
