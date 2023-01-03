import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from '@material-ui/icons/EditTwoTone'

const EditCommonAction = ({ onClick, title="Edit" }) => {
  return (
    <Tooltip placement="top" title={title}>
      <IconButton aria-label="delete" size="inherit" onClick={() => onClick()}>
        <EditIcon fontSize="small" color="secondary" />
      </IconButton>
    </Tooltip>
  );
};

export default EditCommonAction;
