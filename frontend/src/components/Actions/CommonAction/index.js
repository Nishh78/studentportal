import { Badge, IconButton, Tooltip } from "@mui/material";
import React from "react";

const CommonAction = (props) => {
  const { onClick, children, title } = props
  return (
    <Tooltip placement="top" title={title}>
      <IconButton {...props} size="inherit" onClick={() => onClick()}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default CommonAction;
