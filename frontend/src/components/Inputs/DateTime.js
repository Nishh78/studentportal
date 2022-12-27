import React from "react";
import InputContainer from "./InputContainer";
import { Controller } from "react-hook-form";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { TextField } from "@mui/material";
// import { DATETIMEFORMAT } from "../../../contants";
import MomentAdapter from "@mui/lab/AdapterMoment";

import { MobileDateTimePicker, } from "@mui/lab";
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from "moment";

export const DATETIMEFORMAT = "DD/MM/YYYY hh:mm a";
const TextBox = React.forwardRef((props, ref) => {
    const {
        label,
        control,
        name,
        placeholder,
        type,
        size,
        error,
        rules,
        required,
        inputProps,
        defaultValue,
        disablePastDates
    } = props;

    return (
        <InputContainer size={size}>
            <LocalizationProvider dateAdapter={MomentAdapter}>

                <Controller
                    name={name}
                    control={control}
                    render={({field}) => {
                        return (
                            <MobileDateTimePicker
                                inputFormat={DATETIMEFORMAT}
                                label={label}
                                value={moment(field.value)}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                                {...(disablePastDates && {
                                    minDateTime: moment()
                                })}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={error}
                                        fullWidth
                                        helperText={error && error.message}
                                        {...inputProps}
                                    // value={moment(params.value).format(DATEFORMAT)}
                                    />
                                )}
                            />
                        );
                    }}
                    defaultValue={defaultValue || ""}
                    rules={{
                        ...(required && {
                            required: {
                                value: true,
                                message: ` ${label} is Required`,
                            },
                        }),
                        ...rules,
                    }}
                />
            </LocalizationProvider>
        </InputContainer>
    );
});
export default TextBox;