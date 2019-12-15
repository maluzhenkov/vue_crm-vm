import firebase from "firebase/app";

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUserId");

        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once("value")
        ).val();
        commit("setInfo", info);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUserId");
        const updateData = { ...getters.info, ...toUpdate };
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updateData);

        commit("setInfo", updateData);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  },
  getters: {
    info: s => s.info
  }
};
