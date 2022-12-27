import { MenuItem, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";
import InputContainer from "./InputContainer";
const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}))
const MyTextField = React.forwardRef((props) => {
  const classes = useStyles();
  const {
    label,
    name,
    options,
    optionLabelProp,
    optionValueProp,
    placeholder,
    control,
    error,
    defaultOption,
    size,
    required,
    rules,
    hasDefaultOption = false,
    onSelect,
    disabled
  } = props;
  return (
    <InputContainer
      size={size}
    >
      <Controller
        control={control}
        name={name}
        {...props}
        render={({field}) => {
          return (
            <TextField
              {...field}
              select
              fullWidth
              variant="outlined"
              error={error}
              size="Normal"
              label={`${label} ${required ? '*' : ''}`}
              placeholder={placeholder}
              className={classes.textField}
              value={field.value}
              onChange={(e) => { field.onChange(e.target.value); onSelect && onSelect(e.target.value) }}
              helperText={error}
              disabled={disabled}
              InputProps={{
                classes: {
                  notchedOutline: classes.textField,
                }
              }}
            >
              {hasDefaultOption && (
                <MenuItem selected disabled>
                  Choose {label}
                </MenuItem>
              )}
              {defaultOption && defaultOption()}
              {options.length > 0 ? options?.map((opt, index) => {
                return (
                  <MenuItem
                    value={optionValueProp ? opt[optionValueProp] : opt}
                    key={index}
                  >
                    {opt[optionLabelProp]}
                  </MenuItem>
                );
              }) :
                (
                  <MenuItem selected disabled>
                    No Data
                  </MenuItem>
                )
              }
            </TextField>
          )
        }} // props contain
        rules={{
          required: {
            value: required,
            message: `${label} is required`,
          },
        }}
      />

    </InputContainer>
  );
});
export default MyTextField;
