import { TextField } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import InputContainer from "./InputContainer";
import { Controller, useWatch } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}))
const TextBox = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { label, control, placeholder, type, size, error } = props;
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
            variant="outlined"
            error={error}
            size="Normal"
            label={label}
            placeholder={placeholder}
            className={classes.textField}
            helperText={error}
            InputProps={{
              classes: {
                notchedOutline: classes.textField,
              }
            }}
          />
        )} // props contain
        rules={{
          required: {
            value: true,
            message: `${label} is required`,
          },
        }}
      />

    </InputContainer>

  );
});
export default TextBox;
