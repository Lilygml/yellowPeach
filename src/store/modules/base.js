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
    },
    clear_store (state, payload) {
      state.editObj.name = ''
      state.editObj.telphone = ''
      state.editObj.address = ''
      state.editObj.money = ''
      state.editObj.box = ''
      state.editObj.wuliudh = ''
      state.editObj.suggestion = ''
    }
  },
  actions: {

  }
}