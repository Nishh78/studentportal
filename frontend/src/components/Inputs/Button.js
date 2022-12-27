import { Button } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
const useStyles = makeStyles((theme) => ({
    btn: {
        borderRadius: theme.palette.radius.base,
        WebkitTapHighlightColor: "transparent",
        cursor: "pointer",
        userSelect: "none",
        textDecoration: "none",
        fontWeight: theme.palette.fontWeights.bold,
        lineHeight: "1.71429",
        fontSize: theme.palette.fontSizes.semibase,
        textTransform: "capitalize",
        padding: "10px 22px",
        color: theme.palette.white,
        backgroundColor: theme.palette.primary.main,

    },
}))
const Btn = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const { type, size, variant } = props
    return (
        <Button
            color="primary"
            {...props}
            size={size}
            type={type}
            variant={variant}
            className={classes.btn}
        >
            Login
        </Button>
    );
});
export default Btn;
