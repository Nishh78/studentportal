import { Grid } from "@mui/material";
import React from "react";

const InputContainer = ({
  label,
  size,
  children,
  noPadding,
  error,
  control,
  ...props
}) => {
  return (
    <Grid item lg={size}>
      {children}
    </Grid>

  );
};

export default InputContainer;
