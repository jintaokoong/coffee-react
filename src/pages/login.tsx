import { Button, Card, Elevation, FormGroup, InputGroup } from '@blueprintjs/core';
import { FormikHelpers, useFormik } from 'formik';
import { decode } from 'jsonwebtoken';
import React, { useContext } from 'react';
import authService from '../services/auth-service';
import { AuthContext, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../state/context/auth-context';
import * as yup from 'yup';
import { getIntentFromError } from '../utils/form/errors';

interface Fields {
  email: string;
  password: string;
}

const LoginValidationSchema = yup.object().shape({
  email: yup.string().trim().required(),
  password: yup.string().required()
});

const onSubmit = (dispatch: React.Dispatch<any>) => (values: Fields, helpers: FormikHelpers<Fields>) => {
  dispatch({
    type: LOGIN
  });
  authService
    .login({
      email: values.email,
      password: values.password
    })
    .then((res) => {
      const { accessToken }: { accessToken: string } = res.data;
      const payload: any = decode(accessToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          accessToken: accessToken,
          email: payload['email']
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        error: err
      });
      console.error(err);
    })
    .then(() => {
      helpers.setSubmitting(false);
    });
};

export const LoginPage = () => {
  const [, dispatch] = useContext(AuthContext);

  const formik = useFormik<Fields>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginValidationSchema,
    onSubmit: onSubmit(dispatch)
  });

  return (
    <div className={'login-container'}>
      <Card elevation={Elevation.TWO}>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup label="Email"
                     labelFor="email"
                     helperText={formik.errors.email}
                     intent={getIntentFromError(formik.errors.email)}>
            <InputGroup
              id="email"
              type={'email'}
              value={formik.values.email}
              onChange={formik.handleChange}
              intent={getIntentFromError(formik.errors.email)}
            />
          </FormGroup>
          <FormGroup label="Password"
                     labelFor="password"
                     helperText={formik.errors.password}
                     intent={getIntentFromError(formik.errors.password)}>
            <InputGroup
              id="password"
              type={'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              intent={getIntentFromError(formik.errors.password)}
            />
          </FormGroup>
          <Button fill type={'submit'} loading={formik.isSubmitting} disabled={formik.isSubmitting || !formik.isValid}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};
