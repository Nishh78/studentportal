import { Switch, Typography } from "@mui/material";
import React from "react";
import InputContainer from "./InputContainer";
import { Controller, useWatch } from "react-hook-form";

const TextBox = React.forwardRef((props, ref) => {

    const { label, name, control, disbled, placeholder, type, size, error, rules, defaultValue } = props;
    return (
        <InputContainer size={size} >
            <Controller
                name={name}
                defaultValue={defaultValue}
                disbled={disbled}
                control={control}
                {...props}
                render={({field}) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 4, border: '1px solid rgba(0, 0, 0, 0.23)', padding: '8.5px 14px' }}>
                            <Typography variant="body1">{label}</Typography>
                            <Switch color="primary" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                        </div>
                    )
                }} // props contain
                rules={{ ...rules, required: false }}
            />

        </InputContainer>

    );
});
export default TextBox;
