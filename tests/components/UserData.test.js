import React from 'react';
import { render, cleanup, } from "@testing-library/react";
import '@testing-library/jest-dom';
import UserData from '../../components/user-data/UserData';
import renderer from 'react-test-renderer';
import { RecoilRoot } from 'recoil';

afterEach(() => {
  cleanup();
});

const users = [
  {
    id: 1,
    name: 'ben',
    email: "email@email.com",
    phone: '111-111-1111',
    website: 'some site'
  },
  {
    id: 2,
    name: 'ben two',
    email: "emailtwo@email.com",
    phone: '222-222-2222',
    website: 'some site two'
  },
];

test('<UserData/> and its props render without crashing', () => {
  const { getByTestId, getByText } = render(
    <RecoilRoot>
      <UserData users={users} />
    </RecoilRoot>
  );

  users.forEach((user) => {
    const imageComponent = getByTestId(`user-img-${user.id}`);

    expect(getByText(user.name)).toBeVisible();
    expect(getByText(user.email)).toBeVisible();

    expect(imageComponent).toBeInTheDocument();
  });

});


test('<UserData/> matches snapshot', () => {
  const tree = renderer.create(
    <RecoilRoot>
      <UserData data={users} />
    </RecoilRoot>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})