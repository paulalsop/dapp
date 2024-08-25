<template>
  <van-overlay :show="allshow" z-index="10000">
    <div style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center">
      <van-loading color="#CDF202"/>
    </div>
  </van-overlay>
  <div class="popup">
    <van-popup v-model:show="xianshow">
      <div class="scxxqq">
        <img :src="getImage(bontarr[gommm].prc)" alt="">
        <div class="name">{{ bontarr[gommm].name }}</div>
        <div class="saca" v-for=" i in combinedDataaa" :key="i.name" v-show="i.bool">
          <div class="saca1">{{ i.name }}</div>
          <div class="saca2">{{ i.num }}%</div>
        </div>
      </div>
    </van-popup>
  </div>
  <div class="popup">
    <van-popup v-model:show="gomaishow">
      <div class="fontas">
        <div class="allbutte">
          <div class="isnasa">
            <img src="@/assets/homepage/out.png" alt="" @click="gomaishow = false">
          </div>
          <div class="body1">
            <img :src="getImage(bontarr[gommm].prc)" alt="">
            <div class="teassac">
              <div class="name">{{ bontarr[gommm].name }}</div>
              <div>{{ $t('home.home1') }} {{ bontarr[gommm].up }} %</div>
            </div>
            <div class="ccck" @click="isxianshow()">{{ $t('home.home35') }}</div>
          </div>
          <div class="body2">
            <input type="number" @input="debouncedInput" :placeholder="$t('home.home3')" v-model="allamount">
            <div @click="skjhdak() ">MAX</div>
          </div>
          <div class="adofy">
            <div style="color: #A6A6A6;">{{ $t('home.home4') }}</div>
            <div style="color: #CDF202;">{{ AllfromWei(bontarr[gommm].morenum) }}</div>
          </div>
          <div class="adofy">
            <div class="jea">
              <div class="sxx">{{ $t('home.home5') }}</div>
              <div class="saimg">${{ allamount ? allamount : 0 }} <img src="@/assets/homepage/jjjt.png" alt="">
                ${{ purchase }}
              </div>
            </div>
            <div style="color: #6CC734;">+${{ purchase }}</div>
          </div>
          <div class="adofy">
            <div class="jea">
              <div class="sxx2">{{ $t('home.home7') }}</div>
              <div class="saimg">{{ allamount ? allamount : 0 }} <img src="@/assets/homepage/jjjt.png"
                                                                      alt="">{{ hashrate }}th
              </div>
            </div>
            <div style="color: #6CC734;">{{ hashrate }}th</div>
          </div>
          <div class="bottenac" @click="deposit()">
            <img src="@/assets/homepage/jinra.png" alt="">{{ $t('home.home6') }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
  <div class="popup">
    <van-popup v-model:show="jihuoshow">
      <div class="fontas">
        <div class="allbutte">
          <div class="isnasa">
            <img src="@/assets/homepage/out.png" alt="" @click="jihuoshow = false">
          </div>
          <div class="akkdis">
            <div><img :src="getImage(bontarr[gommm].prc)" alt=""
                      style="width: 38px;height: 38px;margin-bottom: 5px;"></div>
            <div style="font-weight: 500;font-size: 16px;color: #E8E8E8;line-height: 18px;">{{
                bontarr[gommm].name
              }}
            </div>
            <div style="font-size: 14px;color: #B8B8B8;line-height: 18px;">{{ $t('home.home8') }}{{
                bontarr[gommm].up
              }}%
            </div>
            <div><img src="@/assets/homepage/Mask.png" alt=""
                      style="width: 100px; height: 100px;margin: 10px;"></div>
            <div class="bottenac" @click="jActivate()">
              <img src="@/assets/homepage/abq.png" alt="">{{ $t('home.home9') }} {{ bontarr[gommm].name }}
              {{ $t('home.home10') }}
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
  <div class="homepage">
    <div class="kkjieed">
      <div class="text1">{{ $t('home.home11') }}:67200</div>
      <div class="bonfa2">
        <div class="apr"><img src="@/assets/homepage/zua.png" alt="">{{ $t('home.home12') }} APR 3000%</div>
      </div>
      <div class="towa22">
        <div>
          <div class=" yuan yuan1"></div>
          <div>{{ $t('home.home13') }}{{ ((Grosspurchase / 67200) * 100).toFixed(4) }}%</div>
        </div>
        <div>
          <div class=" yuan yuan2"></div>
          <div>{{ $t('home.home14') }}{{ (((67200 - Grosspurchase) / 67200) * 100).toFixed(4) }}%</div>
        </div>
      </div>
      <div class="yuanas">
        <div class="yuanbj1"></div>
        <div class="yuanbj2" :style="{ transform: `translate(-50%, 50%) rotate(${rout}deg)` }"></div>
        <div class="xiana" :style="{ transform: `translate(-50%, 50%) rotate(${rout + 0.3}deg)` }"></div>
        <div class="texta">
          <div class="mm">{{ Grosspurchase }}</div>
          <!--          <div>{{ $t('home.home15') }}</div>-->
        </div>
      </div>
      <div class="botten">
        <div><img src="@/assets/homepage/cunkuan.png" alt="">{{ $t('home.home16') }}:TH {{ Finaleffort }}</div>
      </div>
    </div>
    <div class="type1">
      <div :class="typeone == 0 ? 'isdiv' : ''" @click="gettype1(0)">{{ $t('home.home17') }}</div>
      <div :class="typeone == 1 ? 'isdiv' : ''" @click="out()">{{ $t('home.home18') }}</div>
    </div>
    <div class="type2">
      <div :class="typetow == 0 ? 'isdiv2' : ''" @click="gettype2(0)">{{ $t('home.home19') }}</div>
      <div :class="typetow == 1 ? 'isdiv2' : ''" @click="out()">{{ $t('home.home18') }}</div>
      <div :class="typetow == 2 ? 'isdiv2' : ''" @click="out()">{{ $t('home.home20') }}</div>
    </div>
    <table>
      <thead>
      <tr>
        <th>{{ $t('home.home21') }}</th>
        <th>{{ $t('home.home22') }}</th>
        <th>{{ $t('home.home23') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in bontarr" :key="i.id">
        <td class="buuttcc">
          <van-switch v-model="i.checked" active-color="#cdf202" disabled
                      inactive-color="#a9a9a9" size="24px"/>
        </td>
        <td class="vina"><img :src="getImage(i.prc)" alt="">{{ i.name }}</td>
        <td>
          <div class="linkup" @click="afasww(i.id, i.checked)">{{ i.up }}% <img
            src="@/assets/homepage/Frame22.png" alt=""></div>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="imgatutu">
      <div class="kkan">{{ $t('home.home32') }}</div>
      <div class="asft">{{ $t('bazaar.bazaar11') }}</div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from "vue"
import {useStore} from "vuex";
import {useWeb3} from '@/web3/index.js';
import {MintdbtcAPI} from '@/components/MintDBTC_API.js'
import {DpAPI} from '@/components/Dp_API.js'
import {UsdtAPI} from '@/components/Usdt_API.js'
import {WbnbAPI} from '@/components/Wbnb_API.js'
import {DbtcAPI} from '@/components/Dbtc_API.js'
import {useI18n} from "vue-i18n";
import {showSuccessToast, showFailToast} from 'vant';
let lianjeshow = computed(() => {
  return store.state.lianjeshow
})//是否连接钱包
const store = useStore();
const {t} = useI18n();
const wbnb = store.state.wbnb; // wbnb地址
const DP = store.state.DP; // DP地址
const DBTCoinNew = store.state.DBTCoinNew; // DBTCoinNew地址
const USDT = store.state.USDT; // USDT地址
const BTC = store.state.BTC; // BTC地址
const ETH = store.state.ETH; // ETH地址
const BCH = store.state.BCH; // BCH地址
const SOL = store.state.SOL; // SOL地址
const DOGE = store.state.DOGE; // DOGE地址
const TON = store.state.TON; // TON地址
const MintDBTC = store.state.MintDBTC; // MintDBTC地址
let rout = ref(45)
let hashrate = ref(0)//计算算力
let purchase = ref(0)//计算金额
let web3 = ref()
let Finaleffort = ref(0)//总算力
let Grosspurchase = ref(0)//总购买
let allamount = ref()//金额
let gommm = ref(0)
let typeone = ref(0)
let typetow = ref(0)
let gomaishow = ref(false)//购买界面
let jihuoshow = ref(false)//质押授权界面
let xianshow = ref(false)//详情界面
let allshow = ref(false)//遮罩层
let combinedDataaa = ref([])//遮罩层
let bontarr = ref([{
  id: 1,//id
  checked: false,//是否开启
  prc: 'bin',//图片地址
  up: '3000',//上升百分比
  name: 'BNB',//名字
  address: wbnb,//地址
  api: WbnbAPI,//api
  morenum: '0'//用户余额
}, {
  id: 2,
  checked: false,
  prc: 'dp',
  up: '3000',
  name: 'DP',
  address: DP,
  api: DpAPI,
  morenum: '0'
}, {
  id: 3,
  checked: false,
  prc: 'DBCT2',
  up: '3000',
  name: 'DBTC',
  address: DBTCoinNew,
  api: DbtcAPI,
  morenum: '0'
}, {
  id: 4,
  checked: false,
  prc: 'usdt',
  up: '3000',
  name: 'USDT',
  address: USDT,
  api: UsdtAPI,
  morenum: '0'
},{
  id: 5,
  checked: false,
  prc: 'Eth',
  up: '3000',
  name: 'ETH',
  address: ETH,
  api: UsdtAPI,
  morenum: '0'
},
  {
  id: 6,
  checked: false,
  prc: 'bit',
  up: '3000',
  name: 'Bitcoin',
  address: BTC,
  api: UsdtAPI,
  morenum: '0'
},{
  id: 7,
  checked: false,
  prc: 'SOL',
  up: '3000',
  name: 'SOL',
  address: SOL,
  api: UsdtAPI,
  morenum: '0'
},{
  id: 8,
  checked: false,
  prc: 'bch',
  up: '3000',
  name: 'BCH',
  address: BCH,
  api: UsdtAPI,
  morenum: '0'
},{
  id: 9,
  checked: false,
  prc: 'doge',
  up: '3000',
  name: 'DOGE',
  address: DOGE,
  api: UsdtAPI,
  morenum: '0'
},{
  id: 10,
  checked: false,
  prc: 'ton',
  up: '3000',
  name: 'TON',
  address: TON,
  api: UsdtAPI,
  morenum: '0'
}
])
onMounted(async () => {
  web3.value = await useWeb3();
  web3data()
})
const getImage = (pic) => {
  return require(`@/assets/homepage/${pic}.png`);
}
const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const handleInput = async () => {//延迟触发
  try {
    const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
    let aaaa
    let bbbb
    if (gommm.value != 3) {
      bbbb = await contract1.methods.getPrice(bontarr.value[gommm.value].address).call({from: localStorage.getItem('address')});
      purchase.value = (Number(AllfromWei(bbbb)) * allamount.value).toFixed(2)
    } else {
      purchase.value = allamount.value
    }
    aaaa = await contract1.methods.calculateStakingCoinsPower(bontarr.value[gommm.value].address, toWei(allamount.value)).call({from: localStorage.getItem('address')});
    hashrate.value = AllfromWei2(aaaa)
    console.log(AllfromWei2(aaaa),bbbb)
  } catch (e) {
    console.log(e)
  }
};

const debouncedInput = debounce(handleInput, 800);

function out() {
  showFailToast(t('home.home34'));
}

function delall() {
  hashrate.value = 0
  purchase.value = 0
  allamount.value = undefined
}

function gettype1(i) {
  typeone.value = i
}

async function isxianshow() {
  xianshow.value = true
  const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
  let aaaa = await contract1.methods.getTokenHandleInfo(bontarr.value[gommm.value].address).call({from: localStorage.getItem('address')});
  const result = [{name: t('home.home36')}, {name: t('home.home37')}, {name: t('home.home38')}, {name: t('home.home39')}];
  const combinedData = aaaa
    .slice(0, 4) // 取前 4 个布尔值
    .map((bool, i) => ({
      name: result[i].name, // 从 names 数组中取对应的名称
      bool: bool,         // 当前布尔值
      num: aaaa[i + 4]    // 对应的数字字符串
    }));
  combinedDataaa.value = combinedData
}

//打开
async function afasww(i, bool) {
  if (!lianjeshow.value){
    showFailToast(t('home.home45'));
    return
  }
  gommm.value = i - 1
  allshow.value = true
  if (bool) {
    if (i == 1) {
      allshow.value = false
      delall()
      gomaishow.value = true
    } else {
      const contract1 = new web3.value.eth.Contract(bontarr.value[gommm.value].api, bontarr.value[gommm.value].address)
      const balance2 = await contract1.methods.allowance(localStorage.getItem('address'), MintDBTC).call();
      allshow.value = false
      console.log(balance2)
      if (parseInt(balance2) < parseInt('115092089237316195423570985008687907853269984665640564039457584007913129639935')) {
        jihuoshow.value = true //质押授权
      } else {
        delall()
        gomaishow.value = true
      }
    }
  } else {
    return
  }
}

//授权函数
async function jActivate() {
  allshow.value = true
  try {
    const contract1 = new web3.value.eth.Contract(bontarr.value[gommm.value].api, bontarr.value[gommm.value].address)
    await contract1.methods.approve(MintDBTC, '115092089237316195423570985008687907853269984665640564039457584007913129639935').send({
      from: localStorage.getItem('address'),
      gasPrice: 3100000000
    })
    allshow.value = false
    jihuoshow.value = false
    delall()
    gomaishow.value = true
    showSuccessToast(t('home.home40'));
  } catch (e) {
    showFailToast(t('home.home41'));
    allshow.value = false
    console.log(e)
  }
}

//存入函数
async function deposit() {
  if (allamount.value === undefined || allamount.value <= 0) {
    showFailToast(t('home.home42'));
    return
  }
  allshow.value = true
  console.log(Number(toWei(allamount.value)), Number(bontarr.value[gommm.value].morenum))
  let isnum = '0'
  if (toWei(allamount.value) > bontarr.value[gommm.value].morenum) {
    allamount.value = AllfromWei(bontarr.value[gommm.value].morenum)
    isnum = bontarr.value[gommm.value].morenum
  } else {
    isnum = toWei(allamount.value)
  }

  try {
    const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
    if (gommm.value === 0) {
      let bbbb = await contract1.methods.stakingCoins(bontarr.value[gommm.value].address, isnum).send({
        from: localStorage.getItem('address'),
        value: isnum,
        gasPrice: 3100000000
      });
      allshow.value = false
      showSuccessToast(t('home.home43'));
      web3data()
      console.log(bbbb)
    } else {
      let aaaa = await contract1.methods.stakingCoins(bontarr.value[gommm.value].address, toWei(allamount.value)).send({
        from: localStorage.getItem('address'),
        gasPrice: 3100000000
      });
      allshow.value = false
      showSuccessToast(t('home.home43'));
      web3data()
      console.log(aaaa)
    }
  } catch (e) {
    allshow.value = false
    showFailToast(t('home.home44'));
    console.log(e)
  }

}

function gettype2(i) {
  typetow.value = i
}

async function web3data() {
  try {
    const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
    //代币是否开启存储
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timestamp = today.getTime() / 1000;
    rout.value = 45 + 1.8 * ((Grosspurchase.value / 67200) * 100).toFixed(4)
    //获取代币储存的总算力

      const address = localStorage.getItem('address');
      for (let i = 0; i < bontarr.value.length; i++) {
        bontarr.value[i].checked = await contract1.methods.isTokenFlagSet(bontarr.value[i].address).call({from: address});
      }
      for (let i = 0; i < bontarr.value.length; i++) {
        if (i == 0){
          const contract2 = await new web3.value.eth.getBalance(address);
          bontarr.value[i].morenum = contract2;
        }else {
          const contract2 = new web3.value.eth.Contract(bontarr.value[i].api, bontarr.value[i].address)
          bontarr.value[i].morenum = await contract2.methods.balanceOf(address).call({from: address});
        }
      }
      console.log(bontarr.value)
      let aaaa = await contract1.methods.getTotalNCPowerFromEveryDay(timestamp).call({from: address});
      Finaleffort.value = AllfromWei2(aaaa)
      let bbbb = await contract1.methods.getTotalMintDBTC().call({from: address});
      Grosspurchase.value = AllfromWei(bbbb)
    // let arr = []
    // let arr2 = []
    // //获取代币储存的总算力
    // for (let i = 0; i < bontarr.value.length; i++) {
    //   arr[i] = await contract1.methods.getTokenPower(bontarr.value[i].address).call({from: address});
    // }
    // //获取代币算力的占比
    // for (let i = 0; i < bontarr.value.length; i++) {
    //   arr2[i] = await contract1.methods.getTokenPowerByAllPowerPercent(bontarr.value[i].address).call({from: address});
    // }
    // //获取用户上一次领取DBTC的时间
    // let num1 = await contract1.methods.getUserReceivesStartDate(address).call({from: address});
    // console.log(arr, arr2, num1)
  } catch (error) {
    console.log(error);
  }
}

function skjhdak() {
  allamount.value = AllfromWei(bontarr.value[gommm.value].morenum)
  handleInput()
}

function AllfromWei(i) {//fromWei
  if (web3.value) {
    return web3.value.utils.fromWei(i, 'ether');
  }
}

function AllfromWei2(i) {//fromWei
  if (web3.value) {
    return (Number(web3.value.utils.fromWei(i, 'ether'))).toFixed(2);
  }
}

function toWei(value) {//toWei
  if (web3.value) {
    return web3.value.utils.toWei(value.toString(), 'ether');
  }
}
</script>

<style lang="scss" scoped>
.scxxqq {
  width: 280px;
  min-height: 400px;
  background: #292929;
  border-radius: 16px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 38px;
    margin-top: 18px;
    height: 38px;
  }

  .name {
    font-weight: 500;
    font-size: 16px;
    color: #E8E8E8;
    line-height: 18px;
    margin: 9px 0;
  }

  .saca {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 9px;

    .saca1 {
      color: white;
    }

    .saca2 {
      font-size: 14px;
      color: #CDF202;
      line-height: 18px;
    }
  }
}

.fontas {
  width: 320px;
  padding-bottom: 91%;
  background-image: url('@/assets/homepage/Groupup.png');
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 20px;
  position: relative;

  .allbutte {
    position: absolute;
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    padding: 16px;

    .akkdis {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .isnasa {
      display: flex;
      justify-content: end;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .adofy {
      margin: 8px 0;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      align-items: center;

      .jea {
        color: white;
        display: flex;
        align-items: center;

        .saimg {
          img {
            width: 14px;
            height: 14px;
            margin: 0 5px;
          }
        }

        .sxx {
          font-size: 11px;
          padding: 10px 14px;
          border-radius: 8px 8px 8px 8px;
          border: 1px solid #CDF202;
          margin-right: 5px;
        }

        .sxx2 {
          margin-right: 5px;
        }

      }
    }

    .body2 {
      display: flex;
      padding: 8px 10px;
      border-radius: 16px 16px 16px 16px;
      border: 1px solid #7A7A7A;

      input {
        flex-grow: 1;
        background-color: transparent;
        color: white;
      }

      input::placeholder {
        color: #A6A6A6;
      }

      div {
        width: 73px;
        height: 30px;
        background: linear-gradient(145deg, #9DFE00 0%, #14D9E5 100%), #CDF202;
        border-radius: 8px 8px 8px 8px;
        line-height: 30px;
        font-weight: 600;
        font-size: 12px;
        color: #121212;
        text-align: center;
      }
    }

    .bottenac {
      width: 194px;
      height: 36px;
      background: #CDF202;
      border-radius: 40px 40px 40px 40px;
      border: 2px solid #99B500;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: #1B1B1D;
      line-height: 25px;

      img {
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
    }

    .body1 {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      img {
        width: 38px;
        height: 38px;
        margin-right: 12px;
      }

      .teassac {
        margin-right: 14px;
        color: white;
        font-size: 14px;
        color: #FFFFFF;
        line-height: 18px;

        .name {
          font-weight: 500;
          font-size: 16px;
          color: #E8E8E8;
        }
      }

      .ccck {
        padding: 6px 18px;
        background-color: #cdf202;
        font-weight: 600;
        font-size: 12px;
        color: #121212;
        border: 4px solid #27272A;
        border-radius: 999px;
      }
    }
  }
}

.popup ::v-deep {
  .van-popup {
    background: transparent;
  }
}

.homepage {

  .kkjieed {
    margin: 20px auto;
    width: calc(100% - 40PX);
    padding-bottom: 91%;
    background-image: url('@/assets/homepage/bg1.png');
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;

    > div {
      position: absolute;
      width: 100%;
      left: 0;
    }

    .yuanas {
      bottom: 28.8%;
      overflow: hidden;
      height: 100px;

      .texta {
        position: absolute;
        border-radius: 999px;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0);
        color: white;
        line-height: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .mm {
          font-size: 20px;
        }
      }

      .xiana {
        position: absolute;
        border-radius: 999px;
        left: 50%;
        bottom: 0%;
        // transform: translate(-50%, 50%) rotate(90deg);
        width: 130px;
        height: 130px;
        border-bottom: 14px #e9ff70 solid;
        border-top: 14px #8567ff solid;
        border-left: 14px #8567ff solid;
        border-right: 14px #e9ff70 solid;

        transition: all 1s;
      }

      .yuanbj1 {
        position: absolute;
        width: 200px;
        height: 200px;
        background-color: #8567ff;
        border-radius: 999px;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }

      .yuanbj2 {
        position: absolute;
        width: 156px;
        height: 156px;
        background-color: #957aff;
        border-radius: 999px;
        left: 50%;
        bottom: 0%;
        // transform: translate(-50%, 50%) rotate(v-bind(rout));
        border-bottom: 22px #cdf202 solid;
        border-top: 22px #8567ff solid;
        border-left: 22px #8567ff solid;
        border-right: 22px #cdf202 solid;
        transition: all 1s;
      }
    }

    .botten {
      bottom: 0;
      height: 28.8%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #7654ff;
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;

      > div {
        width: 90%;
        border-radius: 999px;
        border: 1px solid #957AFF;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
        color: white;

        img {
          width: 18px;
          height: 18px;
          margin-right: 10px;
        }
      }
    }

    .text1 {
      left: 0;
      width: 100%;
      text-align: center;
      top: 8.8%;
      color: white;
      font-size: 20px;
      font-weight: 600;
    }

    .bonfa2 {
      top: 20%;
      display: flex;
      justify-content: center;

      .apr {
        display: flex;
        align-items: center;
        background-color: #cdf202;
        padding: 10px 8px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 600;
        font-style: normal;

        img {
          width: 13px;
        }
      }
    }

    .towa22 {
      top: 33%;
      display: flex;
      justify-content: space-around;
      color: white;

      > div {
        display: flex;
        align-items: center;

        .yuan {
          width: 14px;
          height: 14px;
          margin-right: 5px;
          border-radius: 999px;
          position: relative;
        }

        .yuan::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background-color: #6741ff;
        }

        .yuan1 {
          background-color: #cbee07;
        }

        .yuan2 {
          background-color: #8567ff;
        }
      }
    }
  }

  .imgatutu {
    margin: 20px 25px;
    padding-bottom: 25%;
    background-image: url('@/assets/homepage/Frame.png');
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
    font-size: 12px;
    color: white;

    .kkan {
      position: absolute;
      top: 40%;
      right: 10px;
      transform: translateY(-50%);
      padding: 5px 14px;
      border-radius: 999px;
      background: linear-gradient(95deg, #9010FD 0%, #4049FC 29%, #D8AEF8 69%, #FC5C90 100%);
    }

    .asft {
      position: absolute;
      bottom: 15px;
      left: 18px;
    }
  }

  table {
    width: calc(100% - 48px);
    margin: 0 24px;
    color: white;

    th {
      text-align: left;
      font-weight: 400;
      padding: 12px 0;
      border-bottom: 1px solid #292929;
    }

    tbody {
      .buuttcc ::v-deep {
        .van-switch__node {
          background-color: #1b1b1d;
        }

        .van-switch--disabled {
          opacity: 1
        }
      }

      .buuttcc {
        padding-left: 12px;
      }

      .linkup {
        display: flex;
        align-items: center;
        padding: 9px 12px;
        background-color: #292929;
        border: 2px solid #CDF202;
        border-radius: 999px;
        margin-right: 12px;
        justify-content: space-around;

        img {
          width: 22px;
          height: 22px;
        }
      }

      .vina {
        line-height: 32px;

        img {
          width: 32px;
          height: 32px;
          margin-right: 6px;
        }
      }

      tr {
        height: 60px;
        margin-bottom: 5px;
        border-radius: 999px;
      }

      tr:nth-child(even) {
        td {
          background-color: #292929;
        }

        td:first-child {
          border-radius: 999px 0 0 999px;
        }

        td:last-child {
          border-radius: 0 999px 999px 0;
        }
      }
    }
  }

  .type2 {
    margin: 0 24px;
    background-color: #27272A;
    border-radius: 999px;
    height: 34px;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    > div {
      color: #7A7A7A;
      font-size: 13px;
      flex-grow: 1;
      flex-basis: 0;
      line-height: 34px;
      border-radius: 999px;
      text-align: center;
      font-weight: 500;
    }

    .isdiv2 {
      background-color: #CDF202;
      color: #121212;
      font-weight: bold;
    }
  }

  .type1 {
    margin: 10px 24px;
    background-color: #27272A;
    border-radius: 999px;
    height: 42px;
    padding: 4px;
    display: flex;
    justify-content: space-between;

    > div {
      color: #7A7A7A;
      font-size: 13px;
      flex-grow: 1;
      flex-basis: 0;
      line-height: 42px;
      border-radius: 999px;
      text-align: center;
      font-weight: 500;
    }

    .isdiv {
      background-color: #CDF202;
      color: #121212;
      font-weight: bold;
    }
  }
}
</style>
