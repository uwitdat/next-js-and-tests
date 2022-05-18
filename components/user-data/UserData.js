import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import AddUserForm from '../add-user-form/AddUserForm';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import userStyles from './user-styles.module.css';
import { usersState } from '../../recoil/atom';
import { useRecoilState } from 'recoil';


const UserData = ({ users }) => {
  const router = useRouter();
  const [usersData, setUsersData] = useRecoilState(usersState);

  useEffect(() => {
    if (users) {
      setUsersData(users);
    }
  }, [users])

  const handleGoToProfile = (user) => {
    router.push(
      {
        pathname: `/users/${user.id}`,
        query: { user: JSON.stringify(user) },
      },
      `/users/${user.id}`,
    )
  }

  if (!usersData) {
    return <p>loading...</p>
  }

  return (
    <section className={userStyles.container}>
      <h1>Users:</h1>
      {usersData.map((user) => (
        <Card sx={{ maxWidth: 345, width: '70%', margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={user.id}>
          <Image
            data-testid={`user-img-${user.id}`}
            width={100}
            height={100}
            src={'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => handleGoToProfile(user)} size="small">View Profile</Button>
          </CardActions>
        </Card>
      ))}
      <AddUserForm />
    </section>
  )
}

export default UserData




