import { Button } from "@mui/material";
import React from "react";
import AddNewIcon from "@material-ui/icons/Add";


const AddCommonAction = ({ onClick, title }) => {
    return (
        <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={() => onClick()}
            startIcon={<AddNewIcon />}
        >
            Add {title}
        </Button>
    );
};

export default AddCommonAction;