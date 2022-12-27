import React from "react";
import { makeStyles } from "@mui/styles";
import { Alert, Snackbar } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('lg')]: {
      backgroundColor: "white",
    },
  },
  alert: {
    borderRadius: theme.palette.radius.base
  }
}));

const SnackComponent = ({
  alert, 
  hideAlert,
}) => {
  const classes = useStyles();

  React.useEffect(() => {
    if (alert.open) {
      setTimeout(() => {
        hideAlert()
      }, 5000);
    }
  }, [alert.open]);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={alert.open}
    >
      <Alert
        variant="filled"
        onClose={() => hideAlert()}
        severity={alert.severity}
        className={classes.alert}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};
export default SnackComponent;
