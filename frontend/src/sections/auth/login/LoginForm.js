import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, CircularProgress, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from "react-hook-form";
// components
import Iconify from '../../../components/iconify';
import AuthServices from 'src/services/auth';
import { useToastify } from 'src/hooks/useToastify';
import { emailRegex, passwordRegex } from 'src/utils/constant';
import { apiClientAUth } from 'src/services/api';
import InchargeServices from 'src/services/incharge';


// ----------------------------------------------------------------------

const helperText = {
  fontSize: "0.9rem",
  color: "red",
  fontWeight: 400
}

export default function LoginForm() {
  const navigate = useNavigate();
  const { alert, showAlert, hideAlert } = useToastify();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const { handleSubmit, control, errors, reset } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await apiClientAUth.post("login", {
        ...data,
        status: true
      })
      if (response.data.status == 200) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        showAlert({
          open: true,
          message: 'Logged In successfully.',
          severity: 'success'
        })
        return navigate('/dashboard', { replace: true });
      } else {
        showAlert({
          open: true,
          message: response.data.message,
          severity: 'error'
        })
      }
    } catch (error) {
      showAlert({
        open: true,
        message: 'Invalid credentials!',
        severity: 'error'
      })
      console.log('error', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ my: 2 }} >

        <form onSubmit={handleSubmit(onSubmit)}>

          <Controller
            name="email"
            fullWidth
            label="Email"
            control={control}
            rules={{
              required: { value: true, message: "Email is required" },
              pattern: {
                value: emailRegex,
                message: "Invalid Email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                variant="outlined"
                placeholder="Enter Email"
                required={true}
              />
            )} // props contains: onChange, onBlur and value
          />
          <Typography>
            {errors?.email?.message}
          </Typography>

          <div style={{ paddingTop: 30 }}>
            <Controller
              name="password"
              fullWidth
              label="Password"
              control={control}
              rules={{
                required: { value: true, message: "Password is required" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  placeholder="Enter Password"
                  required={true}
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )} // props contains: onChange, onBlur and value
            />
            <Typography>
              {errors?.password?.message}
            </Typography>
          </div>

          <div style={{ paddingTop: 30 }}>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={loading} >
              {loading ? (
                <CircularProgress color="inherit" size={30} />
              ) : (
                "Login"
              )}
            </LoadingButton>
          </div>
        </form>
      </Stack>

    </>
  );
}
