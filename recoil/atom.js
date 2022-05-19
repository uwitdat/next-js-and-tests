import { atom } from 'recoil';

export const usersState = atom({
    key: 'usersState',
    default: null, // default value (aka initial value)
});