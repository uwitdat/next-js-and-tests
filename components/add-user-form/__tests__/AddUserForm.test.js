import React from 'react';
import { render, fireEvent, screen, waitFor, cleanup, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import AddUserForm from '../AddUserForm';
import * as API from '../utils';


afterEach(() => {
  cleanup();
});

jest.mock('../utils');
API.handleAddUser = jest.fn();

test('<AddUserForm/> should render in the DOM', () => {
  render(<AddUserForm />);
  const form = screen.getByTestId('add-user-form');
  expect(form).toBeInTheDocument();
})


test('Submit button should be disabled while name and email fields are empty', async () => {
  const { getByPlaceholderText, getByRole } = render(<AddUserForm />);

  const inputEmail = getByPlaceholderText('Email');
  const inputName = getByPlaceholderText('Name');
  const submitBtn = getByRole('button', { name: 'Submit' });

  await act(async () => {
    fireEvent.change(inputEmail, { 'target': { 'value': '' } });
    fireEvent.change(inputName, { 'target': { 'value': '' } });
  });

  expect(submitBtn).toBeDisabled();

  await act(async () => {
    fireEvent.change(inputEmail, { 'target': { 'value': 'test@email.com' } });
    fireEvent.change(inputName, { 'target': { 'value': 'some value' } });
  });

  expect(submitBtn).toBeEnabled();

});

test('E mail error message should appear if attempted submit with invalid email', async () => {
  const invalidEmail = 'somestring';

  const { getByPlaceholderText, getByRole, findAllByText } = render(<AddUserForm />);

  const inputEmail = getByPlaceholderText('Email');
  const inputName = getByPlaceholderText('Name');
  const submitBtn = getByRole('button', { name: 'Submit' });

  await act(async () => {
    fireEvent.change(inputEmail, { 'target': { 'value': invalidEmail } });
    fireEvent.change(inputName, { 'target': { 'value': 'some name' } });
    fireEvent.click(submitBtn);
  });


  waitFor(() => expect(API.handleAddUser).toHaveBeenCalledTimes(0));
  waitFor(() => { expect(findAllByText("Please enter valid email")).toBeDefined(); })
})

test('Expect api function to run when form is valid and submit button is clicked', async () => {
  const { getByPlaceholderText, getByRole } = render(<AddUserForm />);

  const inputEmail = getByPlaceholderText('Email');
  const inputName = getByPlaceholderText('Name');
  const submitBtn = getByRole('button', { name: 'Submit' });

  await act(async () => {
    fireEvent.change(inputEmail, { 'target': { 'value': 'ben@email.com' } });
    fireEvent.change(inputName, { 'target': { 'value': 'some name' } });
    fireEvent.click(submitBtn);
  });

  waitFor(() => expect(API.handleAddUser).toHaveBeenCalledTimes(1));

})

test('Except invalid phone error and submit btn to be disabled when entering invalid phone', async () => {
  const invalidPhone = '4267453g';

  const { getByPlaceholderText, getByRole, findAllByText } = render(<AddUserForm />);

  const inputPhone = getByPlaceholderText('Phone');
  const submitBtn = getByRole('button', { name: 'Submit' });

  await act(async () => {
    fireEvent.change(inputPhone, { 'target': { 'value': invalidPhone } });
  });

  expect(submitBtn).toBeDisabled();
  waitFor(() => { expect(findAllByText("Phone number is not valid")).toBeDefined(); })

})

test('Expect error msg and disabled btn when user exceeds character length for name or website input', async () => {
  const invalidName = 'lorem ipsum some test to ccheck for longer name value';
  const invalidWebsite = 'lorem ipsum some test to ccheck for longer name value';

  const { getByPlaceholderText, getByRole, findAllByText } = render(<AddUserForm />);

  const inputName = getByPlaceholderText('Name');
  const inputWebsite = getByPlaceholderText('Website');
  const submitBtn = getByRole('button', { name: 'Submit' });

  await act(async () => {
    fireEvent.change(inputName, { 'target': { 'value': invalidName } });
    fireEvent.change(inputWebsite, { 'target': { 'value': invalidWebsite } });
  });

  expect(submitBtn).toBeDisabled();
  waitFor(() => { expect(findAllByText("Maximum characters allowed for name is 20.")).toBeDefined(); })
  waitFor(() => { expect(findAllByText("Maximum characters allowed for website is 20.")).toBeDefined(); })
});