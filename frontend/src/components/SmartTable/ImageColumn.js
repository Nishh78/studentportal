import { makeStyles } from "@mui/styles";
import React from "react";
// import { BASEIMAGEURL } from "../../../contants";

const useStyles = makeStyles((theme) => ({
  image: {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.palette.radius.base,
    margin: theme.spacing(0.5, 0, 0, 0),
    background: theme.palette.primary.light,
    color: theme.palette.primary.main,
    fontWeight: theme.palette.fontWeights.semiBold,
  },
}));

const BASEIMAGEURL = "http://localhost:3000/";
const ImageColumn = ({ data }) => {
  const classes = useStyles();
  const limit = 2;
  if (typeof data === "object") {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {data.slice(0, limit).map((img) => {
          return (
            <img
              alt={img}
              src={`${BASEIMAGEURL}${img}`}
              className={classes.image}
            />
          );
        })}
        {data.length > limit && (
          <div className={classes.image}>+{data.length - limit}</div>
        )}
      </div>
    );
  }
  return (
    <img alt={data} src={`${BASEIMAGEURL}${data}`} className={classes.image} />
  );
};

export default ImageColumn;
