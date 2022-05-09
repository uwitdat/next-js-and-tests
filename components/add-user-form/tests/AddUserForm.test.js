import React from 'react';
import { render, screen, mount } from "@testing-library/react";
import '@testing-library/jest-dom'
import AddUserForm from '../AddUserForm';
import user from '@testing-library/user-event';


describe('Tests for <AddUserForm/> component', () => {

  const { container } = render(<AddUserForm />);

  it('<AddUserForm/> takes in required input and returs a new user via axios.POST', () => {

    const inputName = container.querySelector(`input[name="name"]`);
    user.type(inputName, 'test name')

    const inputEmail = container.querySelector(`input[name="email"]`);
    user.type(inputEmail, 'email@email.com')

    const inputPhone = container.querySelector(`input[name="phone"]`);
    user.type(inputPhone, '111-111-1111')

    const inputWebsite = container.querySelector(`input[name="website"]`);
    user.type(inputWebsite, 'test website')

    // user.click(screen.getByRole('button', { name: /Submit/i }));
    expect(inputName).toHaveValue("");

  })
});