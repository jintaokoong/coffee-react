import {
  Card,
  CardContent,
  FormControl,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import { FormikHelpers, useFormik } from 'formik';
import { decode } from 'jsonwebtoken';
import React, { useContext } from 'react';
import * as yup from 'yup';
import { SubmitButton } from '../components/extension/button';
import authService from '../services/auth-service';
import {
  AuthContext,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from '../state/context/auth-context';

import MuiAlert from '@material-ui/lab/Alert';

interface Fields {
  email: string;
  password: string;
}

const LoginValidationSchema = yup.object().shape({
  email: yup.string().trim().required(),
  password: yup.string().required(),
});

const onSubmit = (dispatch: React.Dispatch<any>) => (
  values: Fields,
  helpers: FormikHelpers<Fields>
) => {
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
    })
    .then(() => {
      helpers.setSubmitting(false);
    });
};

const useStyles = makeStyles((themes) => ({
  container: {
    minHeight: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    [themes.breakpoints.down('sm')]: {
      margin: '0 20px',
    },
    [themes.breakpoints.down('md')]: {
      margin: '0 20px',
    },
    [themes.breakpoints.up('lg')]: {
      minWidth: '450px',
    },
  },
  margin: {
    margin: '8px 0',
  },
  largerMargin: {
    marginTop: themes.spacing(4),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const LoginPage = () => {
  const [authState, dispatch] = useContext(AuthContext);
  const classes = useStyles();
  const formik = useFormik<Fields>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: onSubmit(dispatch),
  });

  return (
    <Paper className={classes.container}>
      <div className={classes.card}>
        {authState.status.login === 'FAIL' ? (
          <MuiAlert
            className={classes.margin}
            elevation={6}
            severity={'error'}
            variant={'filled'}
          >
            Failed to login.
          </MuiAlert>
        ) : null}
        <Card elevation={2}>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <FormControl className={classes.margin} fullWidth>
                <TextField
                  id={'email'}
                  label={'Email'}
                  onChange={formik.handleChange}
                  error={formik.errors.email !== undefined}
                  helperText={formik.errors.email}
                />
              </FormControl>
              <FormControl className={classes.margin} fullWidth>
                <TextField
                  id={'password'}
                  label={'Password'}
                  type={'password'}
                  onChange={formik.handleChange}
                  error={formik.errors.password !== undefined}
                  helperText={formik.errors.password}
                />
              </FormControl>
              <SubmitButton
                className={classes.largerMargin}
                size={'medium'}
                disabled={formik.isSubmitting}
                variant={'contained'}
                color="primary"
                fullWidth
                content={'Login'}
                loading={formik.isSubmitting}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </Paper>
  );
};
