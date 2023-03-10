import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from '@material-ui/icons/Add'

const AddCommonAction = ({title, onClick }) => {
  return (
    <Tooltip placement="top" title={title || 'Add'}>
      <IconButton aria-label="delete" size="inherit" onClick={() => onClick()}>
        <AddIcon fontSize="small" color="secondary" />
      </IconButton>
    </Tooltip>
  );
};

export default AddCommonAction;
