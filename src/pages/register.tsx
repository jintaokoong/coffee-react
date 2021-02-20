import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { FormError } from '../components/forms/form-error';

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email.')
    .required('Email is required.'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
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
          {formik.errors.email !== undefined ? (
            <FormError>{formik.errors.email}</FormError>
          ) : null}
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
          {formik.errors.password !== undefined ? (
            <FormError>{formik.errors.password}</FormError>
          ) : null}
        </div>
        <div>
          <label htmlFor={'password'}>confirm password</label>
          <input
            id={'confirmPassword'}
            name={'confirmPassword'}
            type={'password'}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword !== undefined ? (
            <FormError>{formik.errors.confirmPassword}</FormError>
          ) : null}
        </div>
        <button type={'submit'}>register</button>
      </form>
    </div>
  );
};
