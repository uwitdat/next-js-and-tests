import { atom } from 'recoil';

export const usersState = atom({
    key: 'usersState',
    default: '', // default value (aka initial value)
});