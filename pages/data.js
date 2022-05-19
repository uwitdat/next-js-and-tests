import axios from 'axios';
import React from 'react';
import UserData from '../components/user-data/UserData';

export const getStaticProps = async () => {
  const res = await axios.get('http://localhost:4000/users');
  const data = res.data;

  return {
    props: {
      data: data
    }
  }
}
const Data = ({ data }) => {

  return (
    <UserData users={data} />
  )
}

export default Data