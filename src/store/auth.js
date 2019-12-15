import firebase from "firebase/app";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async register({ dispatch, commit }, { name, email, password }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({ bill: 10000, name });
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    }
  }
};
