import React from "react";
import { makeStyles } from "@mui/styles";
import { CircularProgress, Modal } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: 0,
  },
  spinner: {
    outline: 0,
    color: theme.palette.white,
  },
}));

const SpinnerModal = () => {
  const classes = useStyles();

  return (
    <Modal open={true} className={classes.root}>
      <CircularProgress className={classes.spinner} size={50} />
    </Modal>
  );
};
export default SpinnerModal;
