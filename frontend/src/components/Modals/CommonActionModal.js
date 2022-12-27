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
const CommonActionModal = ({
  open,
  onClose,
  title,
  onSubmit,
  size,
  data,
  mode,
  fullScreen,
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

  // console.log("methods", methods);
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

  const localSubmit = (values) => {
    onSubmit({ _id: data?._id, ...values, ...fileFields, ...otherFields });
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
      // <ModalContainer
      //   open={open}
      //   onClose={() => {
      // onClose();
      // setFormErrors();
      // reset();
      //   }}
      //   onSubmit={() => handleSubmit(localSubmit)}
      //   size={size}
      //   title={`${mode} ${title}`}
      // >
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
            <Typography className={classes.modalTitle}>{`${mode} ${title}`}</Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <FormProvider {...methods}>
            <form class="form-parsley" onSubmit={handleSubmit(localSubmit)}>
              <Grid container spacing={2}>
                {formData.map((item, index) => {
                  const MyInput = Inputs[item.type];
                  let defaultValue = data && data[item.name] ? data[item.name] : item?.defaultValue;
                  if(item.type == 'select' && typeof defaultValue === "object"){
                    defaultValue = defaultValue?._id || '';
                  }
                  console.log('defaultValue', defaultValue);
                  return (
                    mode !== item?.hideAt && (
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
                          item.disabled ||
                          (item?.disabledCondition &&
                            item?.disabledCondition({ mode }))
                        }
                      />
                    )
                  );
                })}
              </Grid>

              <input type="submit" style={{ display: 'none' }} ref={btnRef} />
            </form>
          </FormProvider>
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

export default CommonActionModal;
