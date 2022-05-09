import React from 'react'
import { Formik, Form, Field } from 'formik';
import { v4 } from 'uuid';
import newUserFormStyles from './new-user-form-styles.module.css';
import { Button } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

const AddUserForm = ({ users, setUsers }) => {

  const initialValues = {
    id: '',
    email: '',
    name: '',
    phone: '',
    website: ''
  }

  const NewUserSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required."),
    website: Yup.string()
      .min(2, "Minimum character is 2")
      .max(50, "Maximum character is 50.")
      .required("Website is required"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone is required"),
  });

  const handleAddUser = async (values, resetForm) => {
    let newUser = values;
    const newId = v4();
    newUser.id = newId;

    const res = await axios.post('http://localhost:4000/users', newUser);
    if (res.status === 201) {
      setUsers([...users, newUser]);

      resetForm();
    } else {
      console.log('an error has occured')
    }
  }

  return (
    <div className={newUserFormStyles.container}>
      <h2>Add New User</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => handleAddUser(values, resetForm)}
        validationSchema={NewUserSchema}
      >
        {({ isSubmitting, values, handleChange, errors, touched }) => (
          <Form className={newUserFormStyles.form}>
            <Field
              style={inputStyles}
              onChange={handleChange}
              required
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
              required
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
              required
              placeholder="Phone"
              name='phone'
              value={values.phone}
              className={errors.phone && touched.phone ? `${newUserFormStyles.errorOutline} ${newUserFormStyles.input}` : newUserFormStyles.input}
            />
            {errors.phone && touched.phone && (
              <p className={newUserFormStyles.errorText}>{errors.phone}</p>
            )}

            <Field
              style={inputStyles}
              onChange={handleChange}
              required
              placeholder="Website"
              name='website'
              value={values.website}
              className={errors.website && touched.website ? `${newUserFormStyles.errorOutline} ${newUserFormStyles.input}` : newUserFormStyles.input}
            />
            {errors.website && touched.website && (
              <p className={newUserFormStyles.errorText}>{errors.website}</p>
            )}

            <Button type="submit" variant="contained" disabled={isSubmitting}> Submit</Button>
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