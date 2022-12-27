import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5, 1),
    fontSize: theme.palette.fontSizes.sm,
    fontWeight: theme.palette.fontWeights.semiBold,
    borderRadius: theme.palette.radius.base,
  },
  success: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
  }
}))

const StatusColumn = ({ data }) => {
  const True =
    typeof data === "string"
      ? data === "true"
        ? true
        : false
      : data
        ? true
        : false;
  const classes = useStyles()


  return (
    <span className={clsx(classes.root, True ? classes.success : classes.error)} success={True} error={True}>
      {True ? "Active" : "Inactive"}
    </span>
  );
};

export default StatusColumn;
