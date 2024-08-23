<template>
  <van-overlay :show="allshow" z-index="10000">
    <div style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center">
      <van-loading color="#CDF202"/>
    </div>
  </van-overlay>
  <van-overlay :show="kaippdh" z-index="10000">
    <div style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center;background: #010303" v-if="kaippdh">
      <img src="@/assets/homeimg/kaikk.webp" style="width: 100%" alt="WebP Animation" >
    </div>
  </van-overlay>
  <van-overlay :show="allshowaasczz" z-index="10000" >
    <div style="display: flex;width: 100%;height: 100%;position:relative " @click="allshowaasczz = false">
      <div style="width: 188px;height: 288px;background: #1B1B1D;border-radius: 12px 12px 12px 12px;position: absolute ;top: 60px;right: 0;" class="sacax"  @click="out()">
        <div>SWAP</div>
        <div>Defi{{ $t('homevall.homevall12_1') }}</div>
        <div>{{ $t('homevall.homevall12_2') }}</div>
        <div>{{ $t('homevall.homevall12_3') }}</div>
        <div>{{ $t('homevall.homevall12_5') }}</div>
      </div>
    </div>
  </van-overlay>
  <div class="popup">
    <van-popup v-model:show="langshow">
      <div class="langw">
        <div class="isnasa">
          <img src="@/assets/homepage/out.png" alt="" @click="langshow = false">
        </div>
        <div class="sdac" v-for="(i, index) in alangarrc" :key="index" @click="gaibainlang(index, true)">{{ i }}</div>
      </div>
    </van-popup>
  </div>
  <div class="popup">
    <van-popup v-model:show="bindshow">
      <div class="sajjnca">
        <div class="title">{{ $t('homevall.homevall10') }}</div>
        <div>{{ shortenAddress(langshowaddl) }}</div>
        <div class="sacaz">
          <div @click="bindshow = false">{{ $t('homevall.homevall11') }}</div>
          <div class="isaa" @click="bbbdddss()">{{ $t('homevall.homevall12_4') }}</div>
        </div>
      </div>
    </van-popup>
  </div>
  <div class="home">
    <div class="tuas" :class="route.path == '/Home/MyPage' ? 'dsca' : ''"></div>
    <nav class="nav" :class="route.path == '/Home/MyPage'||route.path == '/Home/RecordPage' ? 'dsca' : ''">
      <div class="logeimg">
      </div>
      <div class="logerr">
        <div class="yaoqin" @click="isrouter(3)">{{ $t('homevall.homevall1') }}</div>
        <div class="lianje" @click="getSignature()"><img src="@/assets/homeimg/link.png" v-show="!lianjeshow" alt="">{{
            lianjeshow ? $t('homevall.homevall2') : $t('homevall.homevall3')
          }}
        </div>
        <img src="@/assets/homeimg/jjjzaw.png" style="width: 24px; height: 24px" alt="" @click="allshowaasczz = true">
      </div>
    </nav>
    <div class="routre">
      <router-view/>
    </div>
    <div class="boont" :class="route.path == '/Home/MyPage'||route.path == '/Home/RecordPage' ? 'dsca' : ''">
      <div class="allboss">
        <div class="sdasaca">
          <div class="assc" v-for="i in 2" :key="i">
            <div>
              <img src="@/assets/homeimg/bss1.png" alt="">
              <img src="@/assets/homeimg/bss2.png" alt="">
              <img src="@/assets/homeimg/bss3.png" alt="">
            </div>
            <div>
              <img src="@/assets/homeimg/bss4.png" alt="">
              <img src="@/assets/homeimg/bss5.png" alt="">
              <img src="@/assets/homeimg/bss6.png" alt="">
            </div>
          </div>
        </div>

      </div>
      <div class="tealllink">
        <div class="dbtc"></div>
        <div class="alink">
          <a href="https://t.me/PetWorld8" target="_blank"><img src="@/assets/homeimg/icon1.png" alt=""></a>
          <!--          <img src="@/assets/homeimg/icon2.png" alt="">-->
          <a href="https://twitter.com/bingbingcutn?s=11" target="_blank"><img src="@/assets/homeimg/icon3.png" alt=""></a>
          <!--          <img src="@/assets/homeimg/icon4.png" alt="">-->
        </div>
      </div>
      <div class="tealllink">
        <div class="topasd">
          <div class="diqimg"></div>
          <div class="lang" @click="langshow = true">{{ alangarrc[inlang] }}</div>
        </div>
        <div class="Copyright">
          © Copyright 2024 MILDE. All rights reserved.
        </div>
      </div>
    </div>
    <div class="tablle">
      <div :class="active == 0 ? 'isaddd' : ''" @click="isrouter(0)">
        <img :src="getImage(active == 0 ? 'home' : 'home1')" alt="">{{ $t('homevall.homevall4') }}
      </div>
      <div :class="active == 1 ? 'isaddd' : ''" @click="isrouter(1)">
        <img :src="getImage(active == 1 ? 'bazaar' : 'bazaar1')" alt="">{{ $t('homevall.homevall5') }}
      </div>
      <div :class="active == 2 ? 'isaddd' : ''" @click="isrouter(2)">
        <img :src="getImage(active == 2 ? 'ore' : 'ore1')" alt="">{{ $t('homevall.homevall6') }}
      </div>
      <div :class="active == 3 ? 'isaddd' : ''" @click="isrouter(3)">
        <img :src="getImage(active == 3 ? 'my' : 'my1')" alt="">{{ $t('homevall.homevall7') }}
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref, onMounted, computed, watch} from "vue"
import {useRouter, useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {useWeb3} from '@/web3/index.js';
import {showSuccessToast, showFailToast} from 'vant';
import {useStore} from "vuex"
import {MintdbtcAPI} from "@/components/MintDBTC_API";

const store = useStore();
const MintDBTC = store.state.MintDBTC; // MintDBTC地址
const {t} = useI18n();
const {locale} = useI18n();
const router = useRouter()
const route = useRoute();
let active = ref(0)
let web3 = ref()
let langshow = ref(false)//语言页面
let bindshow = ref(false)//绑定页面
let allshowaasczz = ref(false)//
let allshow = ref(false)
let kaippdh = ref(true)
let langshowaddl = ref()
let lianjeshow = computed(() => {
  return store.state.lianjeshow
})//是否连接钱包
let inlang = ref(0)//当前语言
let langarrc = ['en', 'zh', 'ko', 'th']
let alangarrc = ref(['English', '繁体中文', '한국어', 'ภาษาไทย'])
let arr = ['/Home/HomePage', '/Home/BazaarPage', '/Home/OrePage', '/Home/MyPage']
onMounted(async () => {
  inroute(route.path)
  onlang()
  web3.value = await useWeb3();
  if (localStorage.getItem('address')) {
    await getSignature()
  }
  if (route.query.address) {
    langshowaddl.value = route.query.address
    if (!localStorage.getItem('address')) {
      await getSignature()
    }
    if (localStorage.getItem('address')) {
      yaojfaqq(route.query.address)
    }
  }
  setTimeout(() => {//开屏动画时间
    kaippdh.value = false;
  }, 3000);
})

function shortenAddress(address) {
  return address.slice(0, 10) + '...' + address.slice(-10);
}
function out() {
  showFailToast(t('home.home34'));
}
async function yaojfaqq(i) {
  const address = localStorage.getItem('address');
  if (i == address) {
    return
  }
  try {
    const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
    let aaaa = await contract1.methods.hasRefer(address).call({from: address});//判断是否已经有推荐人
    let bbbb = await contract1.methods.hasRefer(i).call({from: address});//推荐人是否已经有推荐人
    console.log(aaaa, bbbb)
    if (!aaaa && bbbb) {
      bindshow.value = true
    }
  } catch (e) {
    console.log(e)
  }
}

async function bbbdddss() {
  allshow.value = true
  try {
    const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)

    let avsxx = await contract1.methods.bindRefer(langshowaddl.value).send({from: localStorage.getItem('address')})
    console.log(avsxx)
    isrouter(3)
    bindshow.value = false
  } catch (e) {
    console.log(e)
  }
  allshow.value = false
}

const getImage = (pic) => {
  return require(`@/assets/homeimg/${pic}.png`);
}

async function getSignature() {//登录
  let accountval = ''
  if (window.ethereum) {
    try {
      // 请求用户授权应用连接到MetaMask
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      // accounts是一个数组，包含了所有授权的账户地址，我们取第一个
      accountval = accounts[0];
    } catch (error) {
      console.error('User denied account access', error);
    }
  } else {
    alert('You need to install MetaMask!');
    return
  }
  try {
    // 请求切换到指定网络（例如，Binance Smart Chain）
    // await window.ethereum.request({
    //   method: 'wallet_switchEthereumChain',
    //   params: [{ chainId: '0x38' }], // '0x38' 是 Binance Smart Chain 的链ID
    // });
    localStorage.setItem('address', accountval);
    store.commit('backlianje', true)
    showSuccessToast(t('homevall.homevall8'));

    // Toast;
  } catch (switchError) {
    showFailToast(t('homevall.homevall9'));
    // Notify({
    //   message: '链接失败',
    //   duration: 1000,
    //   background: '#1989fa'
    // });
    // 这个错误代码表示尚未将该链添加到MetaMask中
    if (switchError.code === 4902) {
      try {
        // 请求添加该网络
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x38',
              // 这里添加其他网络参数，如rpcUrl等
            },
          ],
        });
      } catch (addError) {
        // 处理添加网络时发生的错误
        console.error('Failed to add the network:', addError);
      }
    } else {
      // 处理切换网络时发生的其他错误
      console.error('Failed to switch the network:', switchError);
    }
  }
}

function onlang() {
  if (localStorage.getItem('lang')) {
    for (let i = 0; i < langarrc.length; i++) {
      if (localStorage.getItem('lang') == langarrc[i]) {
        gaibainlang(i)
      }
    }
  } else {
    gaibainlang(0)
  }
}

let gaibainlang = (i, bool = false) => {
  if (bool) {
    langshow.value = false
  }
  inlang.value = i
  locale.value = langarrc[i];
  localStorage.setItem('lang', langarrc[i]);
}
watch(route, (newRoute) => {
  inroute(newRoute.path)
});

function inroute(i) {
  if (i == '/Home/RecordPage') {
    active.value = 99
    return
  }
  for (let a = 0; a < arr.length; a++) {
    if (i == arr[a]) {
      active.value = a
    }
  }
}

function isrouter(i) {
  active.value = i
  router.push({
    path: arr[i]
  })
}
</script>

<style lang="scss" scoped>
.sacax{
  display: flex;
  flex-direction: column;

  >div{
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #FFFFFF;
    margin: 0 8px;
    border-bottom: 1px solid  rgba(233,237,244,0.15);;
  }
  >div:last-child{
    border: none;
  }
}
.popup ::v-deep {
  .van-popup {
    background: transparent;
  }
}

.sajjnca {
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1c;
  padding: 20px;
  border-radius: 25px;
  color: white;

  .title {
    font-size: 20px;
    line-height: 30px;
  }

  .sacaz {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 15px;

    > div {
      padding: 4px 20px;
      border-radius: 999px;
      background-color: #7A7A7A;
    }

    .isaa {
      background-color: #6CC734;
      color: #1B1B1D;
    }
  }
}

.langw {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1c;
  padding: 20px;
  border-radius: 25px;

  .sdac {
    width: 194px;
    height: 36px;
    background: #CDF202;
    border-radius: 40px 40px 40px 40px;
    border: 2px solid #99B500;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #1B1B1D;
    line-height: 25px;
  }

  .isnasa {
    display: flex;
    justify-content: end;
    width: 100%;
    margin-bottom: 15px;

    img {
      width: 25px;
      height: 25px;
    }
  }
}

.home {
  background-color: #121212;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  .tuas {
    position: absolute;
    background-image: url('@/assets/homeimg/bgzs.png');
    background-size: 100% 100%;
    top: -0px;
    right: 0px;
    width: 360px;
    height: 200px;
    z-index: 0;
  }

  .boont {
    position: relative;
    overflow: hidden;
    background-image: url('@/assets/homeimg/bbjjj2.png');
    background-size: 100% 95%;
    background-repeat: no-repeat;
    padding-bottom: 80px;
  }

  // .boont::after {
  //   content: '';
  //   position: absolute;
  //   right: 0;
  //   top: 0;
  //   width: 375px;
  //   height: 500px;
  //   background-image: url('@/assets/homeimg/bbjjj2.png');
  //   background-size: 100%;
  //   background-repeat: no-repeat;
  //   z-index: 0;
  // }

  .allboss {
    border-top: 1px solid rgba(233, 237, 244, 0.15);
    overflow: hidden;

    .sdasaca {
      display: flex;
      width: 100%;
      animation: marquee 5s linear infinite;
    }

    .assc {
      width: 100%;
      flex-shrink: 0;

      > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 18px 0;

        img {
          width: 100px;
          height: 55px;
        }
      }
    }

    @keyframes marquee {
      from {
        transform: translateX(0%);
        /* 从右侧移出 */
      }

      to {
        transform: translateX(-100%);
        /* 移动到左侧 */
      }
    }
  }

  .tealllink {
    border-top: 1px solid rgba(233, 237, 244, 0.15);
    padding: 25px;

    .Copyright {
      font-size: 10px;
      color: white;
      padding: 20px 0;
    }

    .topasd {
      padding: 20px 0;
      display: flex;

      .lang {
        padding: 0 24px;
        height: 34px;
        border-radius: 5px 5px 5px 5px;
        color: white;
        line-height: 34px;
        border: 1px solid rgba(233, 237, 244, 0.15);
      }

      .diqimg {
        width: 34px;
        height: 34px;
        background-image: url('@/assets/homeimg/qiou.png');
        background-size: 100% 100%;
        margin-right: 8px;
      }
    }

    .dbtc {
      width: 110px;
      height: 48px;
      background-image: url('@/assets/homeimg/bontlog.png');
      background-size: 100% 100%;
      margin-bottom: 20px;
    }

    .alink {
      display: flex;

      > a > img {
        width: 36px;
        height: 36px;
        margin-right: 15px;
      }
    }
  }

  .routre {
    z-index: 2;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    position: relative;
    height: 60px;
    border-bottom: 1px solid rgba(233, 237, 244, 0.15);
    padding: 0 24px;

    .scadwa {
      position: absolute;
      bottom: 0;
      background: #7A7A7A;
      width: 100%;
      height: 100vh;
    }

    .logeimg {
      width: 94px;
      height: 30px;
      background-image: url('@/assets/homeimg/logo2.png');
      background-size: 100% 100%;
    }

    .logerr {
      display: flex;
      align-items: center;
      font-size: 13px;

      .yaoqin {
        padding: 7px 26px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 999px;
        border: 1px solid rgba(233, 237, 244, 0.15);

        @media screen and (max-width: 340px) {
          padding: 7px 16px;
        }
      }

      .lianje {
        padding: 7px 26px;
        border-radius: 999px;
        background: #CDF202;
        color: #1B1B1D;
        margin-left: 5px;
        display: flex;
        align-items: center;

        @media screen and (max-width: 340px) {
          padding: 7px 16px;
        }

        img {
          width: 14px;
          height: 14px;
          margin-right: 3px;
        }
      }
    }
  }


  .tablle {
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100% - 32px);
    height: 80px;
    background-color: #151515;
    padding: 0 18px;
    border-radius: 50px 50px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #AEAEAE;

    > div {
      flex-grow: 1;
      flex-basis: 0;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 999px;
      font-size: 10px;

      img {
        width: 18px;
        height: 18px;
        padding-bottom: 5px;
      }
    }

    .isaddd {
      background-color: #cdf202;
      color: #000000;
    }
  }

  .dsca {
    display: none;
  }
}
</style>
