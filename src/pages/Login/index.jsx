import React from "react";
import Typography from "@mui/material/Typography";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors, isValid }} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if(!data.payload) {
      return alert("Не удалось авторизоваться")
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return <Navigate to={"/"}/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          autoComplete="off"
          fullWidth
          {...register('email', {required: "Укажите почту"})}
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          fullWidth 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {required: "Укажите пароль"})}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
