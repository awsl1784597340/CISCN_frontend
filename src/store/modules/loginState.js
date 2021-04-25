export default {

  state: {


    token:'114514'

  },

  getters: {

    getToken: state => state.token

  },

  mutations: {

    //set方法

    setToken(state,demoValue){

      state.token = demoValue

    }

  }

}
