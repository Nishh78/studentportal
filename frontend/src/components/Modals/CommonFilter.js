import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import * as Inputs from "../Inputs";
import { Grid, CircularProgress, Button, DialogActions, Paper, Divider, Dialog, DialogTitle, Typography, IconButton, Box, DialogContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@material-ui/icons/CloseOutlined"



const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
        border: `1px solid ${theme.palette.grey[300]}`,
        padding: 20,
        borderRadius: theme.palette.radius.medium
    }
}));

const CommonFilterModal = ({
    onSubmit,
    data,
    mode,
    formData,
    defaultValues,
    watchFields = [],
    onWatchChange = () => { },
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


    const classes = useStyles();

    const isLoading = false;
    const [formErrors, setFormErrors] = React.useState({});

    const [fileFields, setFileFields] = React.useState();
    const [otherFields, setOtherFields] = React.useState({});

    const watching = watch(watchFields);

    React.useEffect(() => {
        setFormErrors(formState.errors);
    }, [formState]);

    const handleFileFieldChange = (name, file) => {
        setFileFields({
            [name]: file,
        });
    };

    const localSubmit = (values) => {
        onSubmit({ ...data, ...values, ...fileFields, ...otherFields });
    };

    const handleOtherChange = ({ name, value }) => {
        setOtherFields({
            ...otherFields,
            [name]: value,
        });
    };

    const handleClear = () => {

    }

    React.useEffect(() => {
        onWatchChange(watching);
    }, [watching]);
    const btnRef = React.useRef()

    return (
        <>

            <div className={classes.root}>
                <Paper className={classes.paper} elevation={0} >
                    <Box >
                        <FormProvider {...methods}>
                            <form class="form-parsley" onSubmit={handleSubmit(localSubmit)}>
                                <Grid container spacing={2}>
                                    {formData.map((item, index) => {
                                        const MyInput = Inputs[item.type];
                                        const defaultValue = data && data[item.name] ? data[item.name] : item?.defaultValue;
                                        return (

                                            <MyInput
                                                {...item}
                                                key={index}
                                                name={item.name}
                                                label={item.label}
                                                placeholder={item.placeholder}
                                                value={defaultValue || ""}
                                                defaultValue={defaultValue || ""}
                                                ref={register(item.rules)}
                                                error={formErrors[item.name]?.message}
                                                mode={mode}
                                                handleFileFieldChange={handleFileFieldChange}
                                                handleOtherChange={handleOtherChange}
                                                disabled={
                                                    item.disabled
                                                }
                                            />

                                        );
                                    })}
                                </Grid>

                                <input type="submit" style={{ display: 'none' }} ref={btnRef} />
                            </form>
                        </FormProvider>
                    </Box>
                    <Box sx={{marginTop:2}}>
                        {/* <Button disabled={isLoading} variant="text" onClick={() => handleClear()} color="secondary" >
                            Clear
                        </Button> */}
                        <Button onClick={(e) => { e.preventDefault(); btnRef.current.click() }} type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? <CircularProgress color="inherit" size={25} /> : "Filter"}
                        </Button>
                    </Box>
                </Paper>

            </div>
        </>
    );
};

export default CommonFilterModal;
