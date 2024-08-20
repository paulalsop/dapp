import { createStore } from 'vuex'

export default createStore({
  state: {
    wbnb: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    USDT: '0x50681730A1b42d274516DD744E8cD9652316BD46',
    DP: '0xB3b30207ba611645c7b415b651B588CD2709cA6E',
    DBTCoinNew: '0x49B762137561d46fE3B2A2783A4A4e8EC884D969',
    MintDBTC: '0xb13Fd89629668154c7c3C0F4D526cE229BfEC66b',
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
