<template>
  <van-overlay :show="allshow" z-index="10000">
    <div style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center">
      <van-loading color="#CDF202"/>
    </div>
  </van-overlay>
  <div class="record">
    <div class="nav">
      <router-link to="/Home/OrePage">
        <div class="lesfx">
          <
        </div>
      </router-link>
      <div class="sdacx">{{ $t('record.record1') }}</div>
    </div>
    <div class="rlii">
      <vue-hash-calendar :theme-color="themeColor" today-class-name="today-class-name"
                         :mark-date="ismark" :show-week-view="showweek" format="YY.MM/DD" @change="handleChange">
        <template #action>
          <div class="timeas">{{ isshowday }}</div>
          <div class="sac" @click="showweek = !showweek">
            {{ showweek ? $t('my.my7') : $t('my.my8') }}<img src="@/assets/my/xa.png" alt=""
                                                             :style="{ transform: `rotate(${showweek ? 360 : 180}deg)` }">
          </div>
        </template>
      </vue-hash-calendar>
    </div>
    <div class="text1ac">
      <div>
        <div class="title">{{ $t('record.record2') }}</div>
        <div class="num">{{ allDBTC }}</div>
      </div>
      <div>
        <div class="title">{{ $t('ore.ore25') }}</div>
        <div class="num">{{ allb }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useWeb3 } from '@/web3/index.js'
import { MintdbtcAPI } from '@/components/MintDBTC_API'
import { useStore } from 'vuex'

const store = useStore()
const MintDBTC = store.state.MintDBTC // MintDBTC地址
let showweek = ref(false)
let allshow = ref(false)
let allDBTC = ref(0)
let allb = ref(0)
let showweekarr = ref([])//可查询数组
let isshowday = ref('2024.08/20')
let themeColor = ref({
  'main-color': '#FFFFFF',
  'main-font-color': '#FFFFFF',
  'disabled-bg-color': 'black',
  // 'disabled-font-color': '#FFFFFF',
})
let ismark = ref([
  {
    color: '#FF4040',
    date: [],
  },
  {
    color: '#8cff40',
    date: [],
  }
])
onMounted(async () => {
  web3.value = await useWeb3()
  web3data()
})

async function web3data () {
  try {
    const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
    const address = localStorage.getItem('address')
    let aaaa = await contract1.methods.getUserReceivesStartDate(address).call({ from: address })//用户注册时间
    let timeday = getToday8AMTimestamp()
    let arr = getNextSevenDaysTimestamps(Number(aaaa))
    const filteredTimestamps = arr.filter(timestamp => timestamp <= timeday)
    let arr2 = []
    for (let index = 0; index < filteredTimestamps.length; index++) {
      let csssa = await contract1.methods.getUserReceiveRecord(address, filteredTimestamps[index]).call({ from: address })
      arr2.push(csssa)
    }
    let arr3 = arr2.map((bool, index) => ({
      bool: bool,
      time: filteredTimestamps[index]
    }))
    showweekarr.value = arr3
    const {
      trueArray,
      falseArray
    } = arr3.reduce((acc, obj) => {
      const formattedTime = formatDate(obj.time * 1000)
      if (obj.bool) {
        acc.trueArray.push(formattedTime)
      } else {
        acc.falseArray.push(formattedTime)
      }
      return acc
    }, {
      trueArray: [],
      falseArray: []
    })
    let time8 = getToday8amTimestampsass()
    asaxxx(time8)
    ismark.value[0].date = trueArray
    ismark.value[1].date = falseArray
  } catch (error) {
    console.log(error)
  }
}

//获取时间戳
function getToday8AMTimestamp () {
  const now = new Date()
  return (now / 1000).toFixed(0)
}

function getToday8amTimestampsass () {
  const now = new Date()
  // 设置时间为今天的 08:00:00
  now.setHours(8, 0, 0, 0)
  // 获取时间戳并转换为秒
  const timestamp = Math.floor(now.getTime() / 1000)
  return timestamp
}

// 获取从某个时间戳开始，连续7天早上8:00的时间戳
function getNextSevenDaysTimestamps (startTimestamp) {
  const oneDayMilliseconds = 24 * 60 * 60 // 一天的秒数
  const timestamps = []

  for (let i = 0; i < 7; i++) {
    const currentTimestamp = startTimestamp + i * oneDayMilliseconds
    timestamps.push(currentTimestamp)
  }

  return timestamps
}

function formatDate (timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份是从 0 开始的，所以需要加 1
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}/${month}/${day}`
}

const handleChange = (val) => {
  isshowday.value = val
  let asd = getTimestamp(val)
  asaxxx(asd)
}

async function asaxxx (t) {
  let nbool = false
  for (let index = 0; index < showweekarr.value.length; index++) {
    if (t == showweekarr.value[index].time) {
      nbool = true
    }
  }
  if (nbool) {
    allshow.value = true
    try {
      const contract1 = new web3.value.eth.Contract(MintdbtcAPI, MintDBTC)
      const address = localStorage.getItem('address')
      let time = await contract1.methods.getStartOfDayTimestamp(t).call({ from: address })
      let aaaa = await contract1.methods.getHashFactorForEveryDay(time).call({ from: address })//用户算力因子
      let bbbb = await contract1.methods.getTotalNCPowerFromEveryDay(time).call({ from: address })//用户产出
      allDBTC.value = AllfromWei2(bbbb)
      allb.value = aaaa
    } catch (e) {
      allDBTC.value = 0
      allb.value = 0
      console.log(e)
    }
  } else {
    allDBTC.value = 0
    allb.value = 0
  }
  allshow.value = false
}

function getTimestamp (dateString) {
  // 创建日期对象
  const date = new Date(dateString)

  // 设置时间为当天的 08:00:00
  date.setHours(8, 0, 0, 0)

  // 获取时间戳并转换为秒
  const timestamp = Math.floor(date.getTime() / 1000)

  return timestamp
}

function AllfromWei2 (i) {//fromWei
  if (web3.value) {
    return (Number(web3.value.utils.fromWei(i, 'ether')) / 100).toFixed(2)
  }
}
</script>

<style lang="scss" scoped>
.record {
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
    margin: 24px;

    > div {
      flex-grow: 1;
      width: 50%;
    }

    .num {
      font-weight: 600;
      font-size: 20px;
      color: #C2B3FF;
      line-height: 45px;
    }

    .title {
      font-weight: 400;
      font-size: 12px;
      color: #D6D6D6;
      line-height: 45px;
    }
  }

  .rlii {
    ::v-deep {
      .calendar_title {
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .hash-calendar .calendar_content {
        background-color: transparent;
      }

      .hash-calendar .calendar_title {
        border: none;
      }

      .hash-calendar .calendar_group_li {
        background-color: transparent;
      }

      .calendar_week {
        background-color: transparent;
      }

      .hash-calendar .calendar_group_li .calendar_day {
        background-color: #292929;
        border-radius: 5px;
        padding: 0 2px;
      }

      .hash-calendar .calendar_group_li .calendar_day_checked {
        background-color: #CDF202;
        color: #1B1B1D;
      }

      .calendar_dot {
        width: 6px;
        height: 6px;
        margin: 5px 0;
        left: 47%;
      }
    }

    .sac {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: 500;
      font-size: 11px;
      color: #D6D6D6;
      display: flex;
      align-items: center;

      img {
        width: 8px;
        height: 8px;
        margin-left: 5px;
        transition: all 1s;
      }
    }

    .timeas {
      padding: 10px 0;
      color: white;
    }
  }

  .nav {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    position: relative;
    color: #FFFFFF;

    .lesfx {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translate(0, -50%);
      font-weight: 600;
      font-size: 18px;
      color: white;
    }

    .sdacx {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
      font-size: 18px;

      line-height: 18px;
    }
  }
}
</style>
