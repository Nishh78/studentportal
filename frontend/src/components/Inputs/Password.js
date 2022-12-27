import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import InputContainer from "./InputContainer";
import { Controller } from "react-hook-form";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}))
const TextBox = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { label, control, placeholder, size, error, rules, required } = props;
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <InputContainer size={size}>
      <Controller
        name="name"
        control={control}
        {...props}
        render={({field}) => (
          <TextField
            {...field}
            fullWidth
            type={values.showPassword ? 'text' : 'password'}
            variant="outlined"
            error={error}
            // size="Normal"
            label={`${label} ${required ? '*' : ''}`}
            placeholder={placeholder}
            className={classes.textField}
            helperText={error}

            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ,
              classes: {
                notchedOutline: classes.textField,
              }
            }}
          />
        )} // props contain
        rules={rules}
      />

    </InputContainer>

  );
});
export default TextBox;
