import { makeStyles } from "@mui/styles";
import React from "react";
import InputContainer from "./InputContainer";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button
} from "@mui/material";
const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: theme.palette.radius.base,
    minHeight: 20,
    padding: theme.spacing(0, 5, 2),
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.23)",
  },
  title: {
    fontSize: theme.palette.fontSizes.semibase,
  },
}));
const MyTextField = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [file, selectedFile] = React.useState([]);
  const {
    label,
    name,
    options,
    mode,
    optionLabelProp,
    optionValueProp,
    placeholder,
    multiple,
    rows,
    control,
    error,
    defaultOption,
    size,
    noPadding,
    disabled,
    required,
    hasDefaultOption = false,
    defaultValue,
    handleFileFieldChange,
  } = props;
  const handleChange = (e) => {
    console.log('files=------', [e.target.files[0]]);
    selectedFile([e.target.files[0]]);
    handleFileFieldChange(name, [e.target.files[0]]);
  };


  const uploadInputRef = React.useRef(null);

  return (
    <InputContainer size={size}>
       <input
      ref={uploadInputRef}
      type="file"
      style={{ display: "none" }}
      onChange={handleChange}
    />
    <div style={{display:'flex'}}>
    <Button
      onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
      variant="contained"
    >
      {placeholder}
    </Button>
    <p style={{paddingLeft:20}}>{file && file.length > 0 && file[0]['name']}</p>
    </div>

    </InputContainer>
  );
});
export default MyTextField;
