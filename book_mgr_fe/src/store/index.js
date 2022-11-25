import { result } from '@/helpers/utils';
import { character, user } from '@/service';
import { createStore } from 'vuex';
import { getCharacterInfoById } from '@/helpers/character';

export default createStore({
  state: {
    characterInfo: [],
    userInfo: {},
    userCharacter: {},
  },
  getters: {
  },
  mutations: {
    // 所有角色列表信息用于select-option
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    // 当前用户的所有信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 当前用户的角色信息
    setUserCharacter(state, userCharacter) {
      state.userCharacter = userCharacter;
    },
  },
  actions: {
    async getCharacterInfo(store) {
      const res = await character.list();
      result(res)
        .success(({ data }) => {
          store.commit('setCharacterInfo', data);
        });
    },
    async getUserInfo(store) {
      const res = await user.info();
      result(res)
        .success(({ data }) => {
          store.commit('setUserInfo', data);
          store.commit('setUserCharacter', getCharacterInfoById(data.character));
          console.log(store.state);
        });
    },
  },
  modules: {
  },
});
