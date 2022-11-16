import axios from 'axios';

export const add = (form) => axios.post('http://localhost:3000/book/add', form);
