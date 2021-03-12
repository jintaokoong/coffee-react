import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';
import { useFormik } from 'formik';
import { decode } from 'jsonwebtoken';
import React, { useContext } from 'react';
import authService from '../services/auth-service';
import {
  AuthContext,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from '../state/context/auth-context';

export const LoginPage = () => {
  const [, dispatch] = useContext(AuthContext);

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
          const { accessToken }: { accessToken: string } = res.data;
          const payload: any = decode(accessToken);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              accessToken: accessToken,
              email: payload['email'],
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: LOGIN_FAIL,
            error: err,
          });
          console.error(err);
        });
    },
  });

  return (
    <div className={'login-container'}>
      <Card elevation={Elevation.TWO}>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup label="Email" labelFor="email">
            <InputGroup
              id="email"
              type={'email'}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </FormGroup>
          <FormGroup label="Password" labelFor="password">
            <InputGroup
              id="password"
              type={'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </FormGroup>
          <Button fill type={'submit'}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};
