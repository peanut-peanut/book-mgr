const TOKEN_STORAGE_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY) || '';
export const setToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  return token;
};
