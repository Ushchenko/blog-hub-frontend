import React from 'react';
import Typography from '@mui/material/Typography';
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)


  const { register, handleSubmit, formState: { errors, isValid }} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'all'
  })
  
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if(!data.payload) {
      console.log(data)
      return alert("Не удалось зарегистрироватся")
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
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {required: "Укажите ваше имя"})}
          className={styles.field} 
          label="Полное имя" 
          autoComplete="off"
          fullWidth
        />
        <TextField 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: "Укажите почту"})}
          className={styles.field} 
          label="E-Mail" 
          autoComplete="off"
          fullWidth 
        />
        <TextField 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {required: "Укажите пароль"})}
          className={styles.field} 
          type={showPassword ? "text" : "password"}
          label="Пароль" 
          autoComplete="off"
          fullWidth 
          InputProps={ {
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
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
