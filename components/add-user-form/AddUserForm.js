import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import newUserFormStyles from './new-user-form-styles.module.css';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import { handleAddUser } from '../../utils';
import { usersState } from '../../recoil/atom';
import { useRecoilState } from 'recoil';

const AddUserForm = () => {
  const [usersData, setUsersData] = useRecoilState(usersState);

  const initialValues = {
    id: '',
    email: '',
    name: '',
    phone: '',
    website: ''
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const NewUserSchema = Yup.object().shape({

    name: Yup.string()
      .required("Name is required.")
      .max(20, "Maximum characters allowed for name is 20."),
    website: Yup.string()
      .min(2, "Minimum character is 2")
      .max(20, "Maximum characters allowed for website is 20."),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
  });

  const handleSubmit = async (values, resetForm) => {
    try {
      const { success, data } = await handleAddUser(values);

      if (success) {
        setUsersData([...usersData, data]);
        resetForm();

      }
    } catch (err) {
      return err
    }

  }

  return (
    <div className={newUserFormStyles.container}>
      <h2>Add New User</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        validationSchema={NewUserSchema}
      >
        {({ values, handleChange, errors, touched, isValid }) => (
          <Form className={newUserFormStyles.form} data-testid='add-user-form'>
            <Field
              style={inputStyles}
              onChange={handleChange}
              placeholder="Email"
              name='email'
              value={values.email}
              className={errors.email && touched.email ? `${newUserFormStyles.errorOutline} ${newUserFormStyles.input}` : newUserFormStyles.input}
            />
            {errors.email && touched.email && (
              <p className={newUserFormStyles.errorText}>{errors.email}</p>
            )}

            <Field
              style={inputStyles}
              onChange={handleChange}
              placeholder="Name"
              name='name'
              value={values.name}
              className={errors.name && touched.name ? `${newUserFormStyles.errorOutline} ${newUserFormStyles.input}` : newUserFormStyles.input}
            />
            {errors.name && touched.name && (
              <p className={newUserFormStyles.errorText}>{errors.name}</p>
            )}

            <Field
              style={inputStyles}
              onChange={handleChange}
              placeholder="Phone"
              name='phone'
              value={values.phone}
              className={errors.phone ? `${newUserFormStyles.errorOutline} ${newUserFormStyles.input}` : newUserFormStyles.input}
            />
            {errors.phone && (
              <p className={newUserFormStyles.errorText}>{errors.phone}</p>
            )}

            <Field
              style={inputStyles}
              onChange={handleChange}
              placeholder="Website"
              name='website'
              value={values.website}
              className={errors.website && touched.website ? `${newUserFormStyles.errorOutline} ${newUserFormStyles.input}` : newUserFormStyles.input}
            />
            {errors.website && touched.website && (
              <p className={newUserFormStyles.errorText}>{errors.website}</p>
            )}

            <Button disabled={values.email === '' || values.name === '' || !isValid} type="submit" variant="contained"> Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddUserForm

const inputStyles = {
  width: '100%',
  margin: '.5rem'
}