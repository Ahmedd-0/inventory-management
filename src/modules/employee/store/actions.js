import axios from "axios";

export default {
  fetchEmployee({ commit, rootGetters }) {
    commit("isLoading", true, { root: true });
    const url = rootGetters.databaseUrl;

    axios
      .get(`${url}/employee`)
      .then((req) => commit("setEmployee", req.data.data))
      .catch((e) => console.log(e))
      .finally(() => commit("isLoading", false, { root: true }));
  },

  deleteEmployee({ dispatch, rootGetters }, itemList) {
    const url = rootGetters.databaseUrl;
    itemList.forEach((item) => {
      axios
        .delete(`${url}/employee/${item.id}`)
        .then(() => dispatch("fetchEmployee"))
        .catch((e) => console.log(e));
    });
  },

  editEmployee({ dispatch, rootGetters }, item) {
    const url = rootGetters.databaseUrl;
    const config = {
      method: "post",
      url: `${url}/employee`,
      data: { employee: item },
    };
    axios(config)
      .then(() => dispatch("fetchEmployee"))
      .catch((e) => console.log(e));
  },
};
