export default {
  banks: {
    readList: `${process.env.VUE_APP_API_URL}/banks`,
    create: `${process.env.VUE_APP_API_URL}/banks/add`,
    update: `${process.env.VUE_APP_API_URL}/banks/update`,
    delete: `${process.env.VUE_APP_API_URL}/banks`,
    getBankById: (bankId) => `${process.env.VUE_APP_API_URL}/banks/${bankId}`,
  },
  user: {
    signup: `${process.env.VUE_APP_API_URL}/users/signup`,
    login: `${process.env.VUE_APP_API_URL}/users/login`,
  },
};
