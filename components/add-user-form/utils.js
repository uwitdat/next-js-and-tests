import { v4 } from 'uuid';
import axios from 'axios';

export const handleAddUser = async (values) => {
  let newUser = values;
  const newId = v4();
  newUser.id = newId;

  const res = await axios.post('http://localhost:4000/users', newUser);
  if (res.status === 201) {
    return {
      success: true,
      data: res.data
    }
  } else {
    console.log('an error has occured')
  }
}