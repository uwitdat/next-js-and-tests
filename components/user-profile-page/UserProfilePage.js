import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import userProfileStyles from './user-profile-styles.module.css';



const UserProfilePage = () => {
  const router = useRouter();
  const [user] = useState(JSON.parse(router.query.user))
  const handleBack = () => router.back();

  return (
    <React.Fragment>
      <Button onClick={handleBack}>Back</Button>
      <div className={userProfileStyles.container}>
        <Card sx={{ maxWidth: 345, width: '70%', margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image
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
            <Typography variant="body2" color="text.secondary">
              {user.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.website}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default UserProfilePage