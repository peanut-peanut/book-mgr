import store from '@/store';

export const getCharacterInfoById = (id) => {
  const { characterInfo } = store.state;
  const one = characterInfo.find((item) => item._id === id);
  return one || {
    title: '未知角色',
  };
};

export const isAdmin = () => {
  const uc = store.state.userCharacter;
  return uc.name === 'admin';
};
