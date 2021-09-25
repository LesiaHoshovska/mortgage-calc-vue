import axios from "axios";
import apiEndPoints from "../../constants/apiEndPoints";

export default {
  namespaced: true,
  state: {
    banksList: [],
    editedObj: null,
    loading: false,
    error: null,
  },
  getters: {
    getBanksList: (state) => state.banksList,
    getEditedObj: (state) => state.editedObj,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
    getBankByName: (state) => (name) =>
      state.banksList.find((item) => item.bankName === name),
  },
  mutations: {
    setBanksList(state, list) {
      state.banksList = list;
    },
    setEditedObj(state, obj) {
      state.editedObj = obj;
    },
    deleteBank(state, bankId) {
      state.banksList = state.banksList.filter((item) => item._id !== bankId);
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    loadBanks({ commit }, filterParams) {
      commit("setLoading", true);
      commit("setError", null);
      let paramsObj = null;
      if (filterParams) {
        paramsObj = { params: filterParams };
      }
      axios
        .get(apiEndPoints.banks.readList, paramsObj)
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("setBanksList", resData.data);
          else throw new Error("Failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    createBank(
      { commit },
      { bankName, interestRate, maxLoan, minDownPayment, loanTerm }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .post(apiEndPoints.banks.create, {
            bankName,
            interestRate,
            maxLoan,
            minDownPayment,
            loanTerm,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw resData.err;
          })
          .catch((err) => {
            console.log(err);
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },

    updateBank(
      { commit, state },
      { bankName, interestRate, maxLoan, minDownPayment, loanTerm }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .put(apiEndPoints.banks.update, {
            bankId: state.editedObj._id,
            bankName,
            interestRate,
            maxLoan,
            minDownPayment,
            loanTerm,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
    deleteBank({ commit }, bankId) {
      commit("setLoading", true);
      commit("setError", null);
      axios
        .delete(apiEndPoints.banks.delete, { data: { bankId } })
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("deleteBank", bankId);
          else throw new Error("Failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },
    getBankById({ commit }, bankId) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndPoints.banks.getBankById(bankId))
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) {
              commit("setEditedObj", resData.data);
              resolve(resData.data);
            } else throw new Error("Failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
  },
};
