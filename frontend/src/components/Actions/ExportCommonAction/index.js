import { IconButton , Tooltip} from "@mui/material";
import React from "react";
import ViewIcon from '@material-ui/icons/PictureAsPdf'
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const ExportCommonAction = ({ onClick }) => {
  return (
    <Tooltip placement="top" title={'export'}>
    <IconButton aria-label="export" size="small" onClick={() => onClick()}>
      <ViewIcon fontSize="small" color="error"/>
    </IconButton>
    </Tooltip>
  );
};

export default ExportCommonAction;
