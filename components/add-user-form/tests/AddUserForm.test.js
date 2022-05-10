import React from 'react';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import AddUserForm from '../AddUserForm';
import { handleAddUser } from '../utils';

jest.mock('../utils');

describe('Tests for <AddUserForm/> component', () => {
  const { container } = render(<AddUserForm />);


  it('<AddUserForm/> takes in required input and returs a new user via axios.POST', async () => {
    const dummyData = {
      name: 'test name',
      email: 'testemail@email.com',
      phone: '111-111-1111',
      website: 'test website'
    }

    const button = screen.getByRole('button')

    handleAddUser.mockResolvedValueOnce({
      success: true,
      data: dummyData
    });

    const inputName = container.querySelector(`input[name="name"]`);
    fireEvent.change(inputName, { target: { value: 'test name' } });

    const inputEmail = container.querySelector(`input[name="email"]`);
    fireEvent.change(inputEmail, { target: { value: 'testemail@email.com' } });

    const inputPhone = container.querySelector(`input[name="phone"]`);
    fireEvent.change(inputPhone, { target: { value: '111-111-1111' } });

    const inputWebsite = container.querySelector(`input[name="website"]`);
    fireEvent.change(inputWebsite, { target: { value: 'test website' } });


    fireEvent.click(button)

    await waitFor(() => expect(handleAddUser).toHaveBeenCalledTimes(1))
    // expect(inputName.value).toBe('');
  })
});