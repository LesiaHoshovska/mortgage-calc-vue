import Vue from "vue";
import Vuex from "vuex";
import banks from "./modules/banks";
import auth from "./modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    banks,
    auth,
  },
});

export default store;
