import axios from 'axios';

export const register = (account, password, inviteCode) => axios.post('http://localhost:3000/auth/register', {
  account,
  password,
  inviteCode,
});
export const login = (account, password) => axios.post('http://localhost:3000/auth/login', {
  account,
  password,
});
