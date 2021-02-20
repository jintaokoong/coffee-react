import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../constants/redux-types';
import * as authService from '../services/auth-service';
import { transformLoginResponse } from '../utils/auth-transformer';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      dispatch({
        type: LOGIN,
      });
      authService
        .login({
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          const response = transformLoginResponse(res);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response,
          });
        })
        .catch((error: any) => {
          console.error(error);
          dispatch({
            type: LOGIN_FAIL,
            error: error,
          });
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor={'email'}>email</label>
          <input
            id={'email'}
            name={'email'}
            type={'email'}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>
          <label htmlFor={'password'}>password</label>
          <input
            id={'password'}
            name={'password'}
            type={'password'}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button type={'submit'}>login</button>
      </form>
    </div>
  );
};
