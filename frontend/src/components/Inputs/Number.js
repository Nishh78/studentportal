import { TextField } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { Controller } from "react-hook-form";
import InputContainer from "./InputContainer";
const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}))
const MyTextField = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const { label, control, placeholder, multiline, rows, error, size } = props;
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
            type="number"
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
        )}
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
export default MyTextField;
