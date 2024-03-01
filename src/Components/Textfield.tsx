import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { FilledInputProps, OutlinedInputProps, InputProps } from '@mui/material/Input';

interface CustomTextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  error?: boolean; // Ensure error prop receives boolean value
  helperText?: string;
  maxLength?: number;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  showPassword,
  setShowPassword,
  error, // Ensure error prop receives boolean value
  helperText,
  maxLength,
}) => {
  return (
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        name={name}
        label={label}
        type={type === "password" && !showPassword ? "password" : "text"}
        id={name}
        value={value}
        onChange={onChange}
        inputProps={{ maxLength: maxLength }}
        InputLabelProps={{
          style: { color: "#724C31" },
        }}
        error={error} // Ensure error prop receives boolean value
        helperText={helperText}
        InputProps={
          type === "password"
            ? {
                endAdornment: showPassword && (
                  <IconButton
                    onClick={() => setShowPassword && setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }
            : undefined
        }
      />
      {error && <div style={{ color: "red" }}>{helperText}</div>}
    </div>
  );
};

export default CustomTextField;
