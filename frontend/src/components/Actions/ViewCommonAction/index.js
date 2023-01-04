import { IconButton,Tooltip } from "@mui/material";
import React from "react";
import ViewIcon from '@material-ui/icons/VisibilityTwoTone'

const ViewCommonAction = ({ onClick }) => {
  return (
    <Tooltip placement="top" title={'View'}>
    <IconButton aria-label="view" size="inherit" onClick={() => onClick()}>
      <ViewIcon fontSize="small" color="success" />
    </IconButton>
    </Tooltip>
  );
};

export default ViewCommonAction;
