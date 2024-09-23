<template>
  <van-overlay :show="allshow" z-index="10000">
    <div style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center">
      <van-loading color="#CDF202"/>
    </div>
  </van-overlay>
  <div class="ore">
    <div class="text1ac">
      <div>
        <div class="title">{{ $t('ore.ore1') }}</div>
        <div class="num">
          <van-rolling-text :start-num="0" :target-num="qwwwwa" :height="24"/>
          .
          <van-rolling-text :start-num="0" :target-num="qwwwwb" :height="24"/>
        </div>
        <!--        <div class="num">{{qwwww}}</div>-->
      </div>
      <div>
        <div class="title">{{ $t('ore.ore2') }}</div>
        <!--        <div class="num">{{jrdbtc}}</div>-->
        <div class="num">
          <van-rolling-text :start-num="0" :target-num="qqqqqcaas" :height="24"/>
        </div>
      </div>
      <div>
        <div class="title">{{ $t('ore.ore25') }}</div>
        <!--        <div class="num">{{jryyyyz}}</div>-->
        <div class="num">
          <van-rolling-text :start-num="0" :target-num="jryyyyz" :height="24"/>
        </div>
      </div>
      <div>
        <div class="title">{{ $t('ore.ore4') }}</div>
        <!--        <div class="num">{{ jrdbtc }}</div>-->
        <div class="num">
          <van-rolling-text :start-num="0" :target-num="jrdbtc" :height="24"/>
        </div>
      </div>
      <div>
        <div class="title">{{ $t('ore.ore29') }}</div>
        <!--        <div class="num">{{ jrdbtc }}</div>-->
        <div class="num">
          <van-rolling-text :start-num="0" :target-num="kkkpaansa" :height="24"/>
          .
          <van-rolling-text :start-num="0" :target-num="kkkpaansb" :height="24"/>
        </div>
      </div>
      <div>
        <div class="title">{{ $t('ore.ore31') }}</div>
        <!--        <div class="num">{{ jrdbtc }}</div>-->
        <div class="num">
          <van-rolling-text :start-num="0" :target-num="ddddqqa" :height="24"/>
          .
          <van-rolling-text :start-num="0" :target-num="ddddqqb" :height="24"/>
        </div>
      </div>
      <div>
        <div class="title">{{ $t('ore.ore30') }}</div>
        <!--        <div class="num">{{ jrdbtc }}</div>-->
        <div class="num" :class=" sabo0l ? 'yesnum':'nonum'">
          <van-rolling-text :start-num="0" :target-num="zfffa" :height="24"/>
          .
          <van-rolling-text :start-num="0" :target-num="zfffb" :height="24"/>%
        </div>
      </div>
    </div>
    <div class="text1ac" style="margin-bottom: 25px;">
      <!--      <div>-->
      <!--        <div class="title title2">{{ $t('ore.ore5') }}$DBTC</div>-->
      <!--        <div class="num">12</div>-->
      <!--      </div>-->
      <div>
        <div class="title title2">{{ $t('ore.ore6') }}</div>
        <!--        <div class="num">{{ yhall }}</div>-->
        <div class="num">
          <van-rolling-text :start-num="0" :target-num="yhalla" :height="24"/>
          .
          <van-rolling-text :start-num="0" :target-num="yhallb" :height="24"/>
        </div>
      </div>
      <div>
        <div class="title title2">{{ $t('ore.ore23') }}</div>
        <!--        <div class="num">{{tjdbtc}}</div>-->
        <div class="num">
          <van-rolling-text :start-num="0" :target-num="tjdbtca" :height="24"/>
          .
          <van-rolling-text :start-num="0" :target-num="tjdbtcb" :height="24"/>
        </div>
      </div>
<!--      <div v-show="Privateplacement">-->
<!--        <div class="title title2">{{ $t('ore.ore28') }}</div>-->
<!--        &lt;!&ndash;        <div class="num">{{tjdbtc}}</div>&ndash;&gt;-->
<!--        <div class="num">-->
<!--          {{ Privateplacement }}-->
<!--        </div>-->
<!--      </div>-->
    </div>

    <div class="linquaa">
      <div class="isbody">
        <div class="titlea">{{ $t('ore.ore8') }} <span>({{ $t('ore.ore24') }})</span></div>
        <div class="titletow">≈ <span>{{ youmoren }}</span> DBTC</div>
        <div style="display: flex">
          <div class="butten" :class="isFrame ? '' : 'isarame'" @click="llllqua()"><img
            src="@/assets/ore/Frame.png" alt="">{{ isFrame ? $t('ore.ore9') : $t('ore.ore10') }}
          </div>
        </div>
      </div>
      <div class="isbod2y">
        <router-link to="/Home/RecordPage">
          <div style="color: white;font-size: 20px;">{{ $t('ore.ore22') }}</div>
        </router-link>
      </div>
    </div>
    <!--    <div class="istype">-->
    <!--      <div :class="type ? '' : 'isdac'" @click="type = 0">{{ $t('ore.ore11') }}</div>-->
    <!--      <div :class="type ? 'isdac' : ''" @click="type = 1">{{ $t('ore.ore12') }}</div>-->
    <!--    </div>-->
    <!--    <div :class="type ? 'type0' : ''">-->
    <!--      <div class="text1ac">-->
    <!--        <div>-->
    <!--          <div class="title3"><img src="@/assets/bazaar/addsa.png" alt="">{{ $t('ore.ore13') }}</div>-->
    <!--          <div class="num2"><span>5</span>$DBTC</div>-->
    <!--        </div>-->
    <!--        <div></div>-->
    <!--        <div>-->
    <!--          <div class="title3"><img src="@/assets/bazaar/addsa.png" alt="">{{ $t('ore.ore14') }}</div>-->
    <!--          <div class="num2"><span>5</span>$DBTC</div>-->
    <!--        </div>-->
    <!--        <div class="lllqq">-->
    <!--          <div class="butten" :class="isFrameasw ? '' : 'isarame'" @click="isFrameasw = false"><img-->
    <!--            src="@/assets/ore/Frame.png" alt="">{{ isFrameasw ? $t('ore.ore9') : $t('ore.ore10') }}-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="textzhus">-->
    <!--        *{{ $t('ore.ore15') }}-->
    <!--      </div>-->
    <!--      <table cellspacing="10">-->
    <!--        <thead>-->
    <!--        <tr>-->
    <!--          <th>{{ $t('ore.ore16') }}</th>-->
    <!--          <th>{{ $t('ore.ore17') }}</th>-->
    <!--          <th>{{ $t('ore.ore18') }}</th>-->
    <!--          <th>{{ $t('ore.ore19') }}</th>-->
    <!--        </tr>-->
    <!--        </thead>-->
    <!--        <tbody>-->
    <!--        <tr v-for=" i in 5" :key="i">-->
    <!--          <td>#1</td>-->
    <!--          <td>0x0000......0000</td>-->
    <!--          <td>109</td>-->
    <!--          <td>2</td>-->
    <!--        </tr>-->
    <!--        </tbody>-->
    <!--      </table>-->
    <!--    </div>-->
    <!--    <div :class="type ? '' : 'type0'">-->
    <!--      <div class="fexlianjie">-->
    <!--        <img src="@/assets/ore/Framex.png" alt="">-->
    <!--        <div>-->
    <!--          {{ $t('ore.ore20') }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="textzhus">-->
    <!--        *排行榜前10名有机会获得手续费分红{{ $t('ore.ore1') }}-->
    <!--      </div>-->
    <!--      <table cellspacing="10">-->
    <!--        <thead>-->
    <!--        <tr>-->
    <!--          <th>{{ $t('ore.ore16') }}</th>-->
    <!--          <th>{{ $t('ore.ore17') }}</th>-->
    <!--          <th>{{ $t('ore.ore21') }}</th>-->
    <!--        </tr>-->
    <!--        </thead>-->
    <!--        <tbody>-->
    <!--        <tr v-for=" i in 5" :key="i">-->
    <!--          <td>#1</td>-->
    <!--          <td>0x0000......0000</td>-->
    <!--          <td>109</td>-->
    <!--        </tr>-->
    <!--        </tbody>-->
    <!--      </table>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import {useWeb3} from '@/web3/index.js';
import {MintdbtcAPI} from "@/components/MintDBTC_API";
import {useStore} from "vuex";
import {showFailToast, showSuccessToast} from "vant";
import {useI18n} from "vue-i18n";
import {DbtcAPI} from '@/components/Dbtc_API.js'

const {t} = useI18n();
const store = useStore();
let lianjeshow = computed(() => {
  return store.state.lianjeshow
})//是否连接钱包
const MintDBTC = store.state.MintDBTC; // MintDBTC地址
const DBTCoinNew = store.state.DBTCoinNew; // DBTCoinNew地址
let type = ref(0)
let isFrame = ref(true)
let allshow = ref(false)
let qwwwwa = ref(0)//全网总算力
let qwwwwb = ref(0)//全网总算力
let jryyyyz = ref(0)//今日算力因子
let yhalla = ref(0)//用户总算力
let yhallb = ref(0)//用户总算力
let jrdbtc = ref(0)//每日DBTC产出
let tjdbtca = ref(0)//推荐DBTC产出
let tjdbtcb = ref(0)//推荐DBTC产出
let qqqqqcaas = ref(0)//全网剩余产出
let kkkpaansa = ref(0)//今日开盘价格a
let kkkpaansb = ref(0)//今日开盘价格b
let ddddqqa = ref(0)//当前价格b
let ddddqqb = ref(0)//当前价格b
let zfffa = ref(0)//涨幅
let zfffb = ref(0)//涨幅
let Privateplacement = ref(0)//私募算力
let sabo0l = ref(true)
// let isFrameasw = ref(true)
let youmoren = ref(0)
onMounted(async () => {
  web3.value = await useWeb3();
  web3data()
})

async function llllqua() {
  if (!lianjeshow.value) {
    showFailToast(t('home.home45'));
    return
  }
  if (youmoren.value <= 0) {
    showFailToast(t('ore.ore26'));
  } else {
    allshow.value = true
    try {
      const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
      const address = localStorage.getItem('address');
      let aaaa = await contract1.methods.drawDBTC().send({from: address,gasPrice: 3100000000, gasLimit: 3015280});
      console.log(aaaa)
      web3data()
      showSuccessToast(t('ore.ore27'));
    } catch (e) {
      console.log(e)
    }
  }
  allshow.value = false
}

async function web3data() {
  try {
    const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
    const contractDb = new web3.value.eth.Contract(DbtcAPI, DBTCoinNew)
    const address = localStorage.getItem('address');
    const today = new Date();
    const timestamp = (today.getTime() / 1000).toFixed(0);//今日时间戳
    console.log(timestamp)
    let time = await contract1.methods.getStartOfDayTimestamp(timestamp).call({from: address})
    console.log(1)
    let aaaa = 0
    try {
      aaaa = await contract1.methods.getUserCanMintDBTCAmount(localStorage.getItem('address')).call({from: address});//今日可领取算力
    } catch {
      aaaa = 0;
    }
    console.log(2)
    // let bbbb = await contract1.methods._mintDBTCEveryDayAmount().call({from: address});//每日DBTC产出
    let bbbb = await web3.value.utils.toWei('10', 'ether');//每日DBTC产出
    console.log(3)
    let cccc = await contract1.methods.getTotalNCPowerFromEveryDay(time).call({from: address});//全网总算力
    console.log(4)
    let dddd = await contract1.methods.getHashFactorForEveryDay(time).call({from: address});//今日算力因子
    console.log(5)
    let eeee = await contract1.methods.getUserNCPower(address).call({from: address});//用户总算力
    console.log(6)
    let ffff = await contract1.methods.getReferPower(address).call({from: address});//用户推荐算力
    let asszx1 = await contractDb.methods.getPrice().call({from: address});//获取当前币的价格
    let asszx2 = await contractDb.methods.getOpeningPrice().call({from: address});//开盘价
    const [integerka, decimalkb] = Number(AllfromWei(asszx2)).toFixed(2).toString().split('.');
    kkkpaansa.value = integerka
    kkkpaansb.value = decimalkb
    const [integerwwa, decimalkwww] = Number(AllfromWei(asszx1)).toFixed(2).toString().split('.');
    ddddqqa.value = integerwwa
    ddddqqb.value = decimalkwww
    let zhangfu = (Number(AllfromWei(asszx1) - AllfromWei(asszx2)).toFixed(8) /  Number(AllfromWei(asszx1)).toFixed(8)).toFixed(4)
    let asda = 0
    if (zhangfu > 0) {
      sabo0l.value = true
      asda = Number(zhangfu *100).toFixed(2)
    } else {
      sabo0l.value = false
      asda = Number(-zhangfu *100).toFixed(2)
    }
    const [zfffwsa, zfffwsb] = asda.toString().split('.')
    zfffa.value = zfffwsa
    zfffb.value = zfffwsb
    console.log(7)
    let gggg = await contract1.methods.getTotalMintDBTC().call({from: address});//全网产出
    let ssss = await contract1.methods.hasGiveawayUserNCPower(address).call({from: address});//判断是否有私募算力
    if (ssss) {
      let ssssa = await contract1.methods.getGiveawayUserNCPower(address).call({from: address});//私募算力
      Privateplacement.value = AllfromWei2(ssssa)
    }

    console.log(ssss)
    qqqqqcaas.value = 67200 - AllfromWei(gggg)
    const [integer, decimal] = AllfromWei2(cccc).toString().split('.');
    console.log(8)
    qwwwwa.value = Number(integer)
    console.log(9)
    qwwwwb.value = decimal
    jryyyyz.value = dddd
    const [integer1, decimal1] = AllfromWei2(eeee).toString().split('.');
    console.log(10)
    yhalla.value = Number(integer1)
    console.log(11)
    yhallb.value = decimal1
    jrdbtc.value = Number(AllfromWei(bbbb))
    console.log(12)
    youmoren.value = Number(AllfromWei(aaaa)).toFixed(16)
    console.log(13)
    const [integer2, decimal2] = AllfromWei2(ffff).toString().split('.');
    console.log(14)
    tjdbtca.value = Number(integer2)
    console.log(15)
    tjdbtcb.value = decimal2

  } catch (error) {
    console.log(error);
  }
}

function AllfromWei2(i) {//fromWei
  if (web3.value) {
    return (Number(web3.value.utils.fromWei(i, 'ether')) / 100).toFixed(2);
  }
}

function AllfromWei(i) {//fromWei
  if (web3.value) {
    return web3.value.utils.fromWei(i, 'ether');
  }
}
</script>

<style lang="scss" scoped>
.ore {
  margin: 10px 24px;

  @media screen and (max-width: 340px) {
    margin: 10px 10px;
  }

  .butten {
    background: #CDF202;
    border-radius: 40px 40px 40px 40px;
    padding: 10px 30px;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 13px;
    color: #1B1B1D;
    width: auto;

    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }

  .isarame {
    background-color: #999999;
  }

  .fexlianjie {
    background: linear-gradient(145deg, #9DFE00 0%, #14D9E5 100%);
    border-radius: 16px 16px 16px 16px;
    padding: 25px;
    display: flex;
    align-items: center;
    color: #1B1B1D;
    line-height: 18px;

    img {
      width: 28px;
      height: 28px;
      margin-right: 14px;
    }
  }

  table {
    width: 100%;
    color: white;
    border-collapse: separate;
    border-spacing: 0px 8px;

    th {
      text-align: left;
      padding: 12px 0;
      background-color: #292929;
      color: #A6A6A6;
    }

    th:first-child {
      border-radius: 999px 0 0 999px;
      padding-left: 15px;
    }

    th:last-child {
      border-radius: 0 999px 999px 0;
    }

    tbody {
      tr {
        border: 1px solid #292929;
      }
    }

    td {
      background: #1B1B1D;
      line-height: 27px;
    }

    tr {
      td:first-child {
        padding-left: 15px;
      }
    }

  }

  .type0 {
    display: none;
  }

  .istype {
    display: flex;
    padding: 4px;
    background: #27272A;
    border-radius: 999px;
    height: 55px;
    margin: 15px 0 20px 0;

    > div {
      flex-grow: 1;
      flex-basis: 0;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 13px;
      color: #7A7A7A;
      text-align: center;
    }

    .isdac {
      background-color: #cdf202;
      color: #121212;
      font-weight: 600;
    }
  }

  .linquaa {
    padding-bottom: 50%;
    background-image: url('@/assets/ore/Card.png');
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;

    .isbod2y {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }

    .isbody {
      position: absolute;
      left: 20px;
      top: 20px;

      .titlea {
        font-size: 14px;
        color: #A6A6A6;
        line-height: 18px;

        span {
          font-size: 10px;
        }
      }

      .titletow {
        color: #C2B3FF;
        font-size: 20px;
        margin-bottom: 15px;

        span {
          font-size: 32px;
        }
      }


    }
  }

  .textzhus {
    font-size: 12px;
    color: #A6A6A6;
    line-height: 25px;
  }

  .text1ac {
    position: relative;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 16px 16px 16px 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 5px 0;

    > div {
      flex-grow: 1;
      width: 50%;
    }

    .lllqq {
      display: flex;
      justify-content: flex-end;
      align-items: end;
    }

    .title3 {
      font-weight: 400;
      font-size: 12px;
      color: #7A7A7A;
      line-height: 25px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      img {
        width: 12px;
        height: 12px;
        margin-right: 3px;
      }
    }

    .num2 {
      font-size: 16px;
      color: #C2B3FF;
      margin-bottom: 10px;

      span {
        font-size: 20px;
        margin-right: 5px;
      }
    }

    .num {
      font-weight: 600;
      font-size: 20px;
      color: #C2B3FF;
      line-height: 25px;

      ::v-deep {
        .van-rolling-text-item__item {
          font-weight: 600;
          font-size: 20px;
          color: #C2B3FF;
        }
      }

    }

    .yesnum {
      color: #8cff40;

      ::v-deep {
        .van-rolling-text-item__item {
          color: #8cff40;
        }
      }
    }

    .nonum {
      color: #ff0000;

      ::v-deep {
        .van-rolling-text-item__item {
          color: #ff0000;
        }
      }
    }

    .title {
      font-weight: 400;
      font-size: 12px;
      color: #D6D6D6;
      line-height: 25px;
    }

    .title2 {
      color: #7A7A7A;
    }
  }
}
</style>
