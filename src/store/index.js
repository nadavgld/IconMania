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
    products: [{name:'Process Simulate', id: 1},{name:'Line Designer', id:2}, {name:'DMV',id:3},{name:'PSVR',id:4}],
    AssetTypes: ['Icon', 'Image', 'Gradient', 'Background']
  },
  getters: {
    User: state => state.user,
    Products: state => state.products,
    AssetTypes: state => state.AssetTypes
  },
  mutations: {
    Login(state, user) {
      state.user = user;
    },
    Logout(state) {
      state.user = {};
    },
    addProdut(state, product){
      state.products = [...state.products, {id: state.products.length + 1, name: product}];
    }
  },
  actions: {
    Login({ commit }, user) {
      commit("Login", user);
    },
    Logout({ commit }) {
      commit("Logout");
    },
    addProduct({commit}, newProduct){
      const product = this.state.product.find(p => p.name == newProduct)
      if(product) return;

      commit('addProdut', newProduct);
    }
  },
  plugins: [vuexLocal.plugin],
  modules: {}
});
