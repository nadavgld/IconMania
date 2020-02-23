import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    products: [
      { name: "Process Simulate", id: 1 },
      { name: "Line Designer", id: 2 },
      { name: "DMV", id: 3 },
      { name: "PSVR", id: 4 }
    ],
    AssetTypes: ["Icon", "Image", "Gradient", "Background"],
    assets: []
  },
  getters: {
    User: state => state.user,
    Products: state => state.products,
    Assets: state => state.assets,
    AssetTypes: state => state.AssetTypes,
    getIconBySearch: state => query => {
      query = query.toLowerCase();
      const results = state.assets.filter(
        a =>
          a.assetName.toLowerCase().indexOf(query) > -1 ||
          a.owner.toLowerCase().indexOf(query) > -1 ||
          a.tags.find(t => t.toLowerCase().indexOf(query) > -1) != null ||
          a.type.toLowerCase().indexOf(query) > -1
      );

      return results;
    }
  },
  mutations: {
    Login(state, user) {
      state.user = user;
    },
    Logout(state) {
      state.user = {};
    },
    addProdut(state, product) {
      state.products = [
        ...state.products,
        { id: state.products.length + 1, name: product }
      ];
    },
    addAsset(state, asset) {
      state.assets = [
        ...state.assets,
        { id: state.assets.length + 1, ...asset }
      ];
    }
  },
  actions: {
    Login({ commit }, user) {
      commit("Login", user);
    },
    Logout({ commit }) {
      commit("Logout");
    },
    addProduct({ commit }, newProduct) {
      const product = this.state.product.find(p => p.name == newProduct);
      if (product) return;

      commit("addProdut", newProduct);
    },
    addAsset({ commit }, newAsset) {
      commit("addAsset", newAsset);
    }
  },
  plugins: [vuexLocal.plugin],
  modules: {}
});
