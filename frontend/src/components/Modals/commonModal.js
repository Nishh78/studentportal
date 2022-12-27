import React from "react";
import ModalContainer from "../ModalContainer";
import { useForm, Controller, FormProvider } from "react-hook-form";
import * as Inputs from "../Inputs";
import { Grid, CircularProgress, Button, DialogActions, Divider, Dialog, DialogTitle, Typography, IconButton, Box, DialogContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@material-ui/icons/CloseOutlined"

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        background: theme.palette.white,
        borderBottom: `1px solid ${theme.palette.grey[700]}`,
        color: theme.palette.text.primary
    },
    modalTitle: {
        fontWeight: theme.palette.fontWeights.bold,
        textTransform: 'capitalize',
        fontSize: theme.palette.fontSizes.md,
        color: theme.palette.text.primary
    }
}));
const CommonModal = ({
    open,
    onClose,
    title,
    onSubmit,
    size,
    fullScreen,
    defaultValues,
    watchFields = [],
    onWatchChange = () => { },
    children
}) => {
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const {
        register,
        handleSubmit,
        watch,
        errors,
        control,
        formState,
        reset,
        setValue,
        getValues,
    } = methods;

    const isLoading = false;
    const [formErrors, setFormErrors] = React.useState({});

    const [fileFields, setFileFields] = React.useState();
    const [otherFields, setOtherFields] = React.useState({});
    const classes = useStyles()
    // const dispatch = useDispatch();
    const watching = watch(watchFields);

    console.log("error", errors);
    React.useEffect(() => {
        setFormErrors(formState.errors);
    }, [formState]);
    const handleFileFieldChange = (name, file) => {
        setFileFields({
            [name]: file,
        });
    };

    const handleOtherChange = ({ name, value }) => {
        console.log("handleOtherChange", name, value);
        setOtherFields({
            ...otherFields,
            [name]: value,
        });
    };

    const handleClose = () => {
        onClose();
        setFormErrors();
        reset();
    }
    React.useEffect(() => {
        onWatchChange(watching);
    }, [watching]);
    const btnRef = React.useRef()
    return (
        open && (
            <Dialog
                onClose={handleClose}
                fullWidth={true}
                maxWidth={size || 'lg'}
                fullScreen={fullScreen}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle style={{ padding: '5px 15px' }}>
                    <Box style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <Typography className={classes.modalTitle}>{`${title}`}</Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
                <DialogActions style={{ marginTop: 10 }}>
                    <Button disabled={isLoading} variant="text" onClick={() => handleClose()} color="secondary" >
                        Cancel
                    </Button>
                    <Button onClick={(e) => { e.preventDefault(); btnRef.current.click() }} type="submit" variant="contained" color="primary" disabled={isLoading}>
                        {isLoading ? <CircularProgress color="inherit" size={25} /> : "Submit"}
                    </Button>
                </DialogActions>
            </Dialog>

        )
    );
};

export default CommonModal;
