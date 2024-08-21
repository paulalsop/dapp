import { createStore } from 'vuex'

export default createStore({
  state: {
    wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    DP: '0x21dfe97101717ed7f562da5D1Ccbceef8fef33c3',
    DBTCoinNew: '0x6A47050B02E565D3a1562805E5D089eAA6e1DA8C',
    MintDBTC: '0x8F1832c385E1B26afbC970B1760cF9c2570C639e',
    lianjeshow:false
  },
  getters: {
  },
  mutations: {
    backlianje(state, i) {//修改登录
      state.lianjeshow = i
    },
  },
  actions: {
  },
  modules: {
  }
})
