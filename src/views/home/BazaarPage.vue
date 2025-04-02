<template>
  <div class="bazaar">
    <div class="allwang">
      <div>
        <div class="wwasda"><img src="@/assets/bazaar/addsa.png" alt="">{{ $t('bazaar.bazaar1') }}</div>
        <div class="text2">${{ allamount }}</div>
      </div>
      <div class="tuutut"></div>
    </div>
    <div class="alltitle"><img src="@/assets/bazaar/sdaall.png" alt="">{{ $t('bazaar.bazaar2') }}</div>
    <div class="atable" v-for="i in bontarr" :key="i.id">
      <div class="asttop">
        <div class="asttop-l">
          <div class="zzcc">{{ $t('bazaar.bazaar3') }}</div>
          <div class="asttoplr">
            <img :src="getImage(i.prc)" alt="">
            <div>
              <div>{{ i.name }}</div>
              <div>${{ i.money }}</div>
            </div>
          </div>
        </div>
        <div class="asttop-r">
          <!--                    <div>{{$t('bazaar.bazaar4')}} {{ i.deposit }}BNB</div>-->
          <div>{{ $t('bazaar.bazaar5') }} {{ i.probability }}%</div>
          <div class="jdnitao">
            <div class="jdtbbjj">
              <div class="sittt" :style="{ left: `${i.probability - 100}%` }"></div>
            </div>
          </div>
          <!--                    <div>{{$t('bazaar.bazaar6')}} {{ i.mobility }}BNB</div>-->
        </div>
      </div>
      <!--            <div class="asttbont">-->
      <!--                <div><span>{{$t('bazaar.bazaar7')}}</span>{{ i.rate }}%</div>-->
      <!--                <div><span>{{$t('bazaar.bazaar8')}}</span> {{ i.pledge }}%</div>-->
      <!--            </div>-->
    </div>
    <div class="alltitle"><img src="@/assets/bazaar/paimin.png" alt="">{{ $t('bazaar.bazaar9') }}</div>
    <div class="allfor ">
      <div class="isforsad" v-for="i in paiarr" :key="i.id">
        <div class="pai">{{ i.id }}</div>
        <img :src="getImage(i.prc)" alt="">
        <div class="jijdadsr">
          <div>{{ i.name }}</div>
          <div class="sacxaxc">
            <div class="wsaca" :style="{ left: `${i.probability - 100}%` }"></div>
          </div>
        </div>
        <div class="bfb">
          {{ i.probability }}%
        </div>
      </div>
    </div>
    <div class="imgatutu">
      <div class="kkan">{{ $t('bazaar.bazaar10') }}</div>
      <div class="asft">{{ $t('bazaar.bazaar11') }}</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref,computed} from "vue"
import {useWeb3} from '@/web3/index.js';
import {MintdbtcAPI} from "@/components/MintDBTC_API";
import {useStore} from "vuex";

const store = useStore();
const MintDBTC = store.state.MintDBTC; // MintDBTC地址
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
const MS = store.state.MorningStar; // TON地址
const FP = store.state.FP; // TON地址
const USDP = store.state.USDP; // TON地址
const Mars = store.state.Mars; // TON地址
const EGA = store.state.EGA; // TON地址
const C13 = store.state.C13; // C13地址
const MIAO = store.state.MIAO; // C13地址
const BTL = store.state.BTL; // C13地址
const USDA = store.state.USDA; // C13地址
const getImage = (pic) => {
  return require(`@/assets/homepage/${pic}.png`);
}
let allamount = ref(0)
let bontarr = ref([{
  id: 1,//id
  prc: 'bin',//图片位置
  money: 0,//金额
  name: 'BNB',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: wbnb//地址
}, {
  id: 2,
  prc: 'dp',
  money: 0,
  name: 'DP',
  deposit: 231,
  probability: 0,
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: DP//地址
}, {
  id: 3,
  prc: 'DBCT2',
  money: 0,
  name: 'DBTC',
  deposit: 231,
  probability: 0,
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: DBTCoinNew//地址
},{
  id: 4,//id
  prc: 'MS',//图片位置
  money: 0,//金额
  name: 'MorningStar',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: MS//地址
},{
  id: 5,//id
  prc: 'MIAO',//图片位置
  money: 0,//金额
  name: 'MIAO',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: MIAO//地址
},{
  id: 6,//id
  prc: 'FP',//图片位置
  money: 0,//金额
  name: 'FP',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: FP//地址
},{
  id: 7,//id
  prc: 'C13',//图片位置
  money: 0,//金额
  name: 'C13',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: C13//地址
},

  {
  id: 8,//id
  prc: 'Eth',//图片位置
  money: 0,//金额
  name: 'ETH',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: ETH//地址
},{
  id: 9,//id
  prc: 'usdp',//图片位置
  money: 0,//金额
  name: 'USDP',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: USDP//地址
}
  ,{
    id: 10,//id
    prc: 'USDA',//图片位置
    money: 0,//金额
    name: 'USDA',//名字
    deposit: 231,
    probability: 0,//存款概率
    mobility: 232,
    rate: 2,
    pledge: 3.65,
    address: USDA//地址
  },{
  id: 11,//id
  prc: 'Mars',//图片位置
  money: 0,//金额
  name: 'Mars',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: Mars//地址
},{
  id: 12,//id
  prc: 'EGA',//图片位置
  money: 0,//金额
  name: 'EGA',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: EGA//地址
},
  {
    id: 13,//id
    prc: 'BTL',//图片位置
    money: 0,//金额
    name: 'BTL',//名字
    deposit: 231,
    probability: 0,//存款概率
    mobility: 232,
    rate: 2,
    pledge: 3.65,
    address: BTL//地址
  },
  {
  id: 14,//id
  prc: 'bit',//图片位置
  money: 0,//金额
  name: 'Bitcoin',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: BTC//地址
},{
  id: 15,//id
  prc: 'SOL',//图片位置
  money: 0,//金额
  name: 'SOL',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: SOL//地址
},{
  id: 16,//id
  prc: 'bch',//图片位置
  money: 0,//金额
  name: 'BCH',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: BCH//地址
},{
  id: 17,//id
  prc: 'doge',//图片位置
  money: 0,//金额
  name: 'DOGE',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: DOGE//地址
},{
  id: 18,//id
  prc: 'ton',//图片位置
  money: 0,//金额
  name: 'TON',//名字
  deposit: 231,
  probability: 0,//存款概率
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: TON//地址
},{
  id: 19,
  prc: 'usdt',
  money: 1,
  name: 'USDT',
  deposit: 231,
  probability: 0,
  mobility: 232,
  rate: 2,
  pledge: 3.65,
  address: USDT//地址
}
])
let paiarr = computed(() => {
  return bontarr.value.slice().sort((a, b) => b.probability - a.probability);
});
onMounted(async () => {
  web3.value = await useWeb3();
  web3data()
})


async function web3data() {
  try {
    const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC);
    const address = localStorage.getItem('address');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timestamp = today.getTime() / 1000;
    
    // 获取总量，如果出错则设为0
    let totalNCPower = "0";
    try {
      totalNCPower = await contract1.methods.getTotalNCPowerFromEveryDay(timestamp).call({from: address});
      allamount.value = Number(AllfromWei2(totalNCPower)).toFixed(4);
    } catch (error) {
      console.error("获取总量失败:", error);
      allamount.value = "0";
    }
    
    let others = 0;
    
    // 循环获取每个代币的数据
    for (let i = 0; i < bontarr.value.length; i++) {
      try {
        if (i !== 18) {
          // 获取代币价格
          try {
            const price = await contract1.methods.getPrice(bontarr.value[i].address).call({from: address});
            bontarr.value[i].money = Number(AllfromWei(price)).toFixed(8);
          } catch (priceError) {
            console.error(`获取 ${bontarr.value[i].name} 价格失败:`, priceError);
            bontarr.value[i].money = "0";
          }
          
          // 获取代币占比
          try {
            const tokenPercent = await contract1.methods.getTokenPowerByAllPowerPercent(bontarr.value[i].address).call({from: address});
            
            if (i == 1) {
              // DP 代币特殊处理
              const adjustedPercent = Number(tokenPercent) + 1;
              others += adjustedPercent;
              bontarr.value[i].probability = adjustedPercent;
            } else {
              others += Number(tokenPercent);
              bontarr.value[i].probability = tokenPercent;
            }
          } catch (percentError) {
            console.error(`获取 ${bontarr.value[i].name} 占比失败:`, percentError);
            bontarr.value[i].probability = 0;
          }
        } else {
          // USDT 特殊处理
          bontarr.value[i].money = 1;
          if (allamount.value > 0) {
            bontarr.value[i].probability = Number(100 - others);
          } else {
            bontarr.value[i].probability = 0;
          }
        }
      } catch (tokenError) {
        console.error(`处理 ${bontarr.value[i].name} 时发生错误:`, tokenError);
        // 设置默认值
        bontarr.value[i].money = "0";
        bontarr.value[i].probability = 0;
      }
    }
    
  } catch (error) {
    console.error("获取数据失败:", error);
    // 全局错误，设置所有代币为默认值
    allamount.value = "0";
    bontarr.value.forEach(item => {
      item.money = "0";
      item.probability = 0;
    });
  }
}
function AllfromWei(i) {//fromWei
  if (web3.value) {
    return web3.value.utils.fromWei(i, 'ether');
  }
}
function AllfromWei2(i) {//fromWei
  if (web3.value) {
    return (Number(web3.value.utils.fromWei(i, 'ether')) / 100).toFixed(2);
  }
}
</script>

<style lang="scss" scoped>
.bazaar {
  margin: 0 24px;

  .imgatutu {
    margin: 20px 0px;
    padding-bottom: 27%;
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

  .allfor {
    .isforsad {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      color: white;
      background: #121212;
      box-shadow: 0px 30px 60px 0px rgba(6, 8, 18, 0.05);
      border-radius: 16px 16px 16px 16px;
      border: 1px solid #292929;
      margin-bottom: 16px;

      .jijdadsr {
        width: 150px;
        font-weight: 600;
        font-size: 15px;
        line-height: 25px;

        .sacxaxc {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          overflow: hidden;
          background: #292929;
          position: relative;

          .wsaca {
            position: absolute;
            width: 100%;
            height: 8px;
            border-radius: 999px;
            background: linear-gradient(90deg, #ECFF82 0%, #CDF202 100%);
          }
        }
      }

      .pai {
        font-weight: 600;
        font-size: 20px;
      }

      .bfb {
        font-weight: 500;
        font-size: 16px;
      }

      > img {
        width: 38px;
        height: 38px;
      }
    }
  }

  .atable {
    background-color: #1b1b1d;
    box-shadow: 0px 40px 60px 0px rgba(7, 7, 29, 0.08);
    border-radius: 16px 16px 16px 16px;
    margin-bottom: 10px;
    position: relative;
    color: white;

    .asttbont {
      padding: 14px 12px;
      display: flex;

      > div {
        flex-grow: 1;
        flex-basis: 0;
        font-weight: 600;

        span {
          font-weight: 400;
          color: #7A7A7A;
          margin-right: 5px;
        }
      }
    }

    .asttop {
      padding: 14px;
      display: flex;
      font-size: 12px;
      //border-bottom: 1px solid rgba(233, 237, 244, 0.15);
      align-items: center;

      > div {
        flex-grow: 1;
        flex-basis: 0;
      }

      .asttop-r {
        > div {
          height: 22px;
          line-height: 22px;
          font-weight: 600;
        }

        .jdnitao {
          display: flex;
          align-items: center;

          .jdtbbjj {
            width: 90%;
            height: 6px;
            border-radius: 999px;
            overflow: hidden;
            background: #292929;
            position: relative;

            .sittt {
              position: absolute;
              width: 100%;
              height: 6px;
              border-radius: 999px;
              background: linear-gradient(90deg, #ECFF82 0%, #CDF202 100%);
            }
          }
        }
      }

      .asttop-l {
        .zzcc {
          color: #7A7A7A;
          line-height: 30px;
        }

        .asttoplr {
          display: flex;
          align-items: center;
          line-height: 18px;

          img {
            width: 38px;
            height: 38px;
            margin-right: 6px;
          }
        }
      }
    }
  }

  .alltitle {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    color: #FFFFFF;
    margin: 20px 0;

    img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }

  .allwang {
    margin: 20px 0;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 16px 16px 16px 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 13px 27px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .wwasda {
      font-size: 14px;
      color: #A6A6A6;
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }

    .text2 {
      font-weight: 600;
      font-size: 32px;
      color: #CDF202;
    }

    .tuutut {
      width: 93px;
      height: 116px;
      background-image: url('@/assets/bazaar/imag1.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
