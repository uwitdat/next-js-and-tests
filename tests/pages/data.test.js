import React from 'react';
import { getStaticProps } from '../../pages/data';
import Data from '../../pages/data';
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';

const axios = require('axios');
jest.mock('axios');


describe('Tests Data component to receive valid data and pass the value as props it to its childten', () => {
  const DUMMY_USERS = [
    {
      id: 1,
      name: 'ben',
      email: 'ben@email.com',
      website: 'my site',
      phone: '111-111-1111'
    },
    {
      id: 2,
      name: 'ben 2',
      email: 'ben2@email.com',
      website: 'my site 2',
      phone: '111-111-1111'
    },
  ]

  it('getStaticProps returns mock users from api call as props', async () => {
    axios.get.mockResolvedValue({
      data: DUMMY_USERS
    });

    const users = await getStaticProps();

    expect(users).toEqual({
      props: {
        data: DUMMY_USERS
      }
    });
  });

  it('<Data/> renders and passes correct props from API call above to its child component', () => {

    const { getByText } = render(
      <RecoilRoot>
        <Data data={DUMMY_USERS} />
      </RecoilRoot>

    );
    expect(getByText(DUMMY_USERS[0].name)).toBeInTheDocument();
    expect(getByText(DUMMY_USERS[0].email)).toBeInTheDocument();

  });
});
