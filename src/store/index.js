import { createStore } from 'vuex'

export default createStore({
  state: {
    wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    DP: '0x21dfe97101717ed7f562da5D1Ccbceef8fef33c3',
    DBTCoinNew: '0xedE744fACd6C046aE3177238Cb5aFcda8A5b2920',
    MintDBTC: '0xE9A3d037f73e3b773Be3882A022b24861aba42BE',
    BTC: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    BCH: '0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf',
    SOL: '0x570A5D26f7765Ecb712C0924E4De545B89fD43dF',
    DOGE: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
    TON: '0x76A797A59Ba2C17726896976B7B3747BfD1d220f',
    MorningStar : '0xd06b94a6af942ac2eefc4658f23b2c2e34131419',
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
