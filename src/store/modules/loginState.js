export default {

  state: {


    token:null

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
