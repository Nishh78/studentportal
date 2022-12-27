import {
  MenuItem,
  Select,
  Box,
  Chip,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";
import InputContainer from "./InputContainer";
const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
  },
}));
const MultiSelect = React.forwardRef((props) => {
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
  } = props;

  console.log("formErrors multi", error);
  return (
    <InputContainer size={size}>
      <FormControl fullWidth>
        <InputLabel>{`${label} ${required ? "*" : ""}`}</InputLabel>
        <Controller
          control={control}
          name={name}
          {...props}
          render={({field}) => {
            console.log("field.value", field.value);
            return (
              <Select
                multiple
                value={
                  Array.isArray(field.value)
                    ? field.value
                    : field.value === "" || typeof field.value === "string"
                    ? [field.value]
                    : []
                }
                fullWidth
                variant="outlined"
                error={error}
                size="Normal"
                label={`${label} ${required ? "*" : ""}`}
                placeholder={placeholder}
                className={classes.textField}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onSelect && onSelect(e.target.value);
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.textField,
                  },
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected &&
                      Array?.isArray(selected) &&
                      selected?.map((si, vi) => {
                        const found = options?.find(
                          (o) => o[optionValueProp] === si
                        );

                        return (
                          <Chip key={vi} label={`${found[optionLabelProp]}`} />
                        );
                      })}
                  </Box>
                )}
              >
                {/* {hasDefaultOption && (
                                    <MenuItem selected disabled>
                                        Choose {label}
                                    </MenuItem>
                                )} */}
                {defaultOption && defaultOption()}
                {options?.length > 0 ? (
                  options?.map((opt, index) => {
                    return (
                      <MenuItem
                        value={optionValueProp ? opt[optionValueProp] : opt}
                        key={index}
                      >
                        {opt[optionLabelProp]}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem selected disabled>
                    No Data
                  </MenuItem>
                )}
              </Select>
            );
          }} // props contain
          rules={rules}
        />

        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </InputContainer>
  );
});
export default MultiSelect;
