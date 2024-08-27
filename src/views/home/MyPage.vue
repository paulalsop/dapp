<template>
  <div class="my">
    <div class="hedasa">
      <div>{{ $t('my.my1') }}<br>{{ $t('my.my2') }}</div>
      <div><img src="@/assets/my/image26.png" alt=""></div>
    </div>
    <div class="sdaimga">
      <div class="allbody">
        <div>
          <div class="title">{{ $t('my.my14') }}</div>
          <div class="num">{{ allmore }}</div>
          <div class="yqr" v-show="tjris">{{ $t('my.my4') }}:{{ shortenAddress(tjrisaddd) }}</div>
          <div class="title">{{ $t('my.my15') }}</div>
          <div class="num">{{ allmore2 }}</div>
          <div class="yqr" v-show="tjris">{{ $t('my.my4') }}:{{ shortenAddress(tjrisaddd) }}</div>
        </div>
<!--        <div>-->
<!--  -->
<!--        </div>-->
      </div>
      <div class="bonfas">
        <div class="scais cccopa" data-clipboard-action="copy"
             @click="copy(`https://dapp.dogpet.world/#/Home/HomePage?address=${affff}`, 'cccopa')">
          <img src="@/assets/my/Frame2.png" alt="">{{ $t('my.my5') }}
        </div>
      </div>
    </div>
    <div class="ascz">
      <div class="itt">{{ $t('my.my6') }}({{ arraa.length }}{{ $t('my.my12') }})</div>
      <div class="zzkk" @click="idtablead()">{{ idtable ? $t('my.my7') : $t('my.my8') }}<img src="@/assets/my/xa.png"
                                                                                             alt=""
                                                                                             :style="{ transform: `rotate(${idtable ? 360 : 180}deg)` }">
      </div>
    </div>
    <table cellspacing="10">
      <thead>
      <tr>
        <th>{{ $t('my.my10') }}</th>
        <th>{{ $t('my.my13') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for=" (i,index) in arraa" :key="i">
        <td class="cccopaa" data-clipboard-action="copy"
            @click="copy(i, 'cccopaa')">{{ shortenAddress(i) }}<img style="vertical-align:middle;"
                                                                    src="@/assets/my/fz.png" alt=""></td>
        <td>{{ arr222[index] }}</td>
      </tr>
      </tbody>
    </table>
    <div style="width: 100%; height: 100px;"></div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import {useWeb3} from '@/web3/index.js';
import {MintdbtcAPI} from "@/components/MintDBTC_API";
import {useStore} from "vuex";
import {showFailToast, showSuccessToast} from "vant";
import ClipboardJS from 'clipboard';
import {useI18n} from "vue-i18n";

let lianjeshow = computed(() => {
  return store.state.lianjeshow
})//是否连接钱包
const {t} = useI18n();
const store = useStore();
const MintDBTC = store.state.MintDBTC; // MintDBTC地址
let idtable = ref(false)
let tjris = ref(false)//判断是否已经有推荐人
let tjrisaddd = ref('0000000000000000000000000000')//推荐人
let arraa = ref([])//子推荐人
let arr222 = ref([])//子推荐人算力
let allmore = ref(0)//算力值
let allmore2 = ref(0)//算力值2
let affff = localStorage.getItem('address')
onMounted(async () => {
  web3.value = await useWeb3();

  web3data()
})

function copy(i, inp) {
  if (!lianjeshow.value) {
    showFailToast(t('home.home45'));
    return
  }
  const clipboard = new ClipboardJS(`.${inp}`, {
    text: () => {
      return i;
    }
  });
  clipboard.on('success', function () {
    showSuccessToast('Copy');
    clipboard.destroy()
  });
}

async function web3data() {
  try {
    const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
    const address = localStorage.getItem('address');
    let aaaa = await contract1.methods.hasRefer(localStorage.getItem('address')).call({from: address});//判断是否已经有推荐人
    // let ssaa = await contract1.methods.getReferPower(localStorage.getItem('address')).call({from: address});//获取推荐获得的算力
    let yesssaa = await contract1.methods.get_referAllPower(localStorage.getItem('address')).call({from: address});//已经激活推荐算力
    let ssaa = await contract1.methods.getReferPower(localStorage.getItem('address')).call({from: address});//未激活算力
    let ssaa2 = await contract1.methods.getRefers(localStorage.getItem('address')).call({from: address});//获取下级
    allmore.value = AllfromWei2(ssaa)
    allmore2.value = AllfromWei2(yesssaa)
    arraa.value = ssaa2
    for (let i = 0; i < ssaa2.length; i++) {
      let aaaa = await contract1.methods.getUserNCPower(ssaa2[i]).call({from: ssaa2[i]});
      arr222.value.push(AllfromWei2(aaaa))
    }
    if (aaaa) {
      tjris.value = true
      let cccc = await contract1.methods.getReferFirst(localStorage.getItem('address')).call({from: address});//获取推荐人（直推）
      tjrisaddd.value = cccc
    } else {
      tjris.value = false
    }
  } catch (error) {
    console.log(error);
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

function idtablead() {
  // a.value = idtable.value ? 45 : 5;
  // idtable.value = !idtable.value;
}

function shortenAddress(address) {
  return address.slice(0, 6) + '...' + address.slice(-6);
}
</script>

<style lang="scss" scoped>
.my {
  min-height: 100vh;
  background-image: url('@/assets/my/bj.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #726ce8;
  padding: 0 24px;

  @media screen and (max-width: 340px) {
    padding: 0 10px;
  }

  table {
    width: calc(100%);
    color: white;
    border-collapse: separate;
    border-spacing: 0px 8px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 16px 16px 16px 16px;
    border: 1px solid rgba(255, 255, 255, 0.5);

    th {
      text-align: left;
      padding: 12px 0;
      background-color: #cdcbf7;
      color: #1B1B1D;
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
      line-height: 27px;
      color: #1B1B1D;
      border-bottom: 1px solid #FAFAFA;
      text-align: left;

      img {
        width: 12px;
        height: 12px;
        margin: auto 3px;
      }
    }

    tr {
      td:first-child {
        padding-left: 15px;
      }
    }

  }

  .ascz {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0 10px 0;

    .itt {
      font-weight: bold;
      font-size: 16px;
      color: #FFFFFF;
    }

    .zzkk {
      display: flex;
      align-items: center;
      font-size: 11px;
      color: #D6D6D6;

      img {
        width: 8px;
        height: 8px;
        margin-left: 5px;
        transition: all 1s;
      }
    }
  }

  .sdaimga {
    padding-bottom: 70%;
    background-image: url('@/assets/my/Group725.png');
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;

    .bonfas {
      position: absolute;
      width: 100%;
      height: 44%;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .scais {
        width: 279px;
        height: 48px;
        background: #CDF202;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 15px;
        color: #121212;

        img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
      }
    }

    .allbody {
      position: absolute;
      width: 100%;
      height: 50%;
      display: flex;
      padding: 3% 0;

      > div {
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }

      .title {
        font-weight: bold;
        font-size: 16px;
        color: #FFFFFF;
      }

      .num {
        font-weight: bold;
        font-size: 30px;
        color: #C2B3FF;
      }

      .yqr {
        font-size: 10px;
        color: #FFFFFF;
        line-height: 20px;
      }
    }
  }

  .hedasa {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    align-items: center;
    font-weight: bold;
    font-size: 32px;
    color: #FFFFFF;

    img {
      width: 170px;
      height: 160px;
    }
  }
}
</style>
