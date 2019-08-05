export default {
  namespaced: true,
  state: {
    editObj: {
      name: '',
      telphone: '',
      address: '',
      money: '',
      box: '',
      wuliudh: '',
      suggestion: ''
    }
  },
  getters: {
    store_getItemData (state) {
      return state.editObj
    }
  },
  mutations: {
    store_setItemData (state, payload) {
      state.editObj = payload
    }
  },
  actions: {

  }
}