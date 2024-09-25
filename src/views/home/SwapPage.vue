<template>
  <van-overlay :show="allshow" z-index="10000">
    <div style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center">
      <van-loading color="#CDF202"/>
    </div>
  </van-overlay>
  <div class="page flex-col">
    <!-- 出售 Section -->
    <div class="group flex-col">
      <div class="header flex-row justify-center">
<!--        <img class="thumbnail" src="@/assets/swap/sale@2x.png" />-->
<!--        <span class="text-group">{{ $t('swap.sell') }}</span>-->
      </div>
      <div class="content flex-row justify-between">
        <div class="token-info flex-row">
          <img class="token-icon" src="@/assets/swap/DBTC@2x.png" />
          <div class="token-text flex-row">
            <span class="token-name">DBTC</span>
            <img class="dropdown-icon" src="@/assets/swap/Frame@2x(1).png" />
          </div>
        </div>
        <span class="token-amount">{{ $t('swap.balance') }}: {{ formattedDBTCBalance }} DBTC</span>
      </div>
      <div class="input-wrapper flex-col">
        <input
            type="number"
            class="input-field"
            :placeholder="$t('swap.enterAmount')"
            v-model="dbtcAmount"
            @input="calculateUSDT"
        />
      </div>
    </div>

    <!-- 中间图标 -->
    <div class="icon-wrapper">
      <img class="label_5" referrerpolicy="no-referrer" src="@/assets/swap/Group%20729@2x.png" alt="Swap Icon" />
    </div>

    <!-- 购买 Section -->
    <div class="group flex-col">
      <div class="header flex-row justify-center">
<!--        <img class="thumbnail" src="@/assets/swap/buy@2x.png" />-->
<!--        <span class="text-group">{{ $t('swap.buy') }}</span>-->
      </div>
      <div class="content flex-row justify-between">
        <div class="token-info flex-row">
          <img class="token-icon" src="@/assets/swap/usdt@2x.png" />
          <div class="token-text flex-row">
            <span class="token-name">USDT</span>
            <img class="dropdown-icon" src="@/assets/swap/Frame@2x(1).png" />
          </div>
        </div>
        <span class="token-amount">{{ $t('swap.balance') }}: {{ formattedUSDTBalance }} USDT</span>
      </div>
      <div class="input-wrapper flex-col">
        <input type="text" class="input-field" :value="calculatedUSDT" readonly />
      </div>
    </div>

    <!-- 新增的面板 -->
    <div class="price-panel flex-col">
      <div class="price-info flex-row justify-between">
        <span class="price-label">{{ $t('swap.price') }}</span>
        <span class="price-value">{{ bestPrice }} USDT / DBTC</span>
      </div>
      <div class="slippage-info flex-row justify-between">
        <span class="slippage-label">{{ $t('swap.slippage') }}</span>
        <select v-model="slippage" class="slippage-select" @change="calculateUSDT">
          <option value="10">10%</option>
          <option value="15">15%</option>
          <option value="20">20%</option>
          <option value="30">30%</option>
          <option value="40">40%</option>
          <option value="50">50%</option>
        </select>
      </div>
    </div>

    <!-- Swap Button -->
    <div class="button-wrapper flex-col">
      <button
          :class="['swap-button', isApproved ? 'green-button' : '', !canSwap ? 'gray-button' : '']"
          @click="isApproved && canSwap ? handleSwap() : handleApprove()"
          :disabled="allshow || !canSwap"
      >
        {{ isApproved ? $t('swap.exchange') : $t('swap.approve') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useWeb3 } from "@/web3/index.js";
import { SwapDbtcAPI } from "@/components/SwapDBTC_ABI";
import { UsdtAPI } from "@/components/Usdt_API";
import { DbtcAPI } from "@/components/Dbtc_API";
import { useStore } from "vuex";
import {showSuccessToast, showFailToast} from 'vant';
let allshow = ref(false);
let canSwap = ref(false); // To store the result from startSwap method
const store = useStore();
const USDT = store.state.USDT; // USDT contract address
const DBTC = store.state.DBTCoinNew; // DBTCoinNew contract address
const SwapDBTC = store.state.SwapDBTC; // Swap contract address
import {useI18n} from "vue-i18n";
const {t} = useI18n();

// Web3 initialization
const web3 = ref(null);
const usdtBalance = ref(0);
const dbtcBalance = ref(0);
const dbtcAmount = ref(""); // User input for DBTC
const calculatedUSDT = ref(0); // 用户输入的DBTC计算出的USDT
const bestPrice = ref(0); // 最优惠的价格 (1 DBTC 对应多少 USDT)
const slippage = ref("10");
const userAddress = localStorage.getItem("address"); // User address
const isApproved = ref(false); // 用于存储用户是否已经授权
const formattedUSDTBalance = computed(() => parseFloat(usdtBalance.value).toFixed(8));
const formattedDBTCBalance = computed(() => parseFloat(dbtcBalance.value).toFixed(8));

onMounted(async () => {
  web3.value = await useWeb3();
  web3data(); // 获取余额
  await getBestPrice();

  // 调用startSwap方法来确定是否允许兑换
  await checkSwapStatus();

  // 检查用户是否已授权
  const dbtcContract = new web3.value.eth.Contract(DbtcAPI, DBTC);
  const allowance = await dbtcContract.methods.allowance(userAddress, SwapDBTC).call();

  if (parseFloat(allowance) > 0) {
    isApproved.value = true; // 已经授权
  } else {
    isApproved.value = false; // 未授权
  }
});

// Call startSwap method to check if the swap is allowed
async function checkSwapStatus() {
  try {
    const swapContract = new web3.value.eth.Contract(SwapDbtcAPI, SwapDBTC);
    canSwap.value = await swapContract.methods.startSwap().call();
  } catch (error) {
    console.error("Error checking swap status:", error);
  }
}

watch(dbtcAmount, (newValue) => {
  if (parseFloat(newValue) > parseFloat(dbtcBalance.value)) {
    dbtcAmount.value = dbtcBalance.value; // 如果输入的DBTC大于余额，则显示最大余额
  }
  calculateUSDT(); // 每次输入变化后重新计算USDT
});

watch(slippage, (newSlippage) => {
  calculateUSDT(); // 当滑点变化时重新计算USDT
});
// 计算用户输入的DBTC对应的实际USDT数量
function calculateUSDT() {
  if (bestPrice.value > 0 && dbtcAmount.value > 0) {
    const dbtcAfterSlippage = parseFloat(dbtcAmount.value) * (1 - parseFloat(slippage.value) / 100);
    calculatedUSDT.value = (dbtcAfterSlippage * bestPrice.value * 0.9975).toFixed(8);
  } else {
    calculatedUSDT.value = 0;
  }
}

// 获取最优惠的价格
async function getBestPrice() {
  try {
    const swapContract = new web3.value.eth.Contract(SwapDbtcAPI, SwapDBTC);
    const price = await swapContract.methods.getPrice().call();
    bestPrice.value = parseFloat(web3.value.utils.fromWei(price, "ether")).toFixed(4);
  } catch (error) {
    showFailToast(t('swap.bestPriceError'));
  }
}

async function web3data() {
  try {
    const usdtContract = new web3.value.eth.Contract(UsdtAPI, USDT);
    const dbtcContract = new web3.value.eth.Contract(DbtcAPI, DBTC);

    // Get USDT balance
    const usdtBal = await usdtContract.methods.balanceOf(userAddress).call({ from: userAddress });
    usdtBalance.value = web3.value.utils.fromWei(usdtBal, "ether");

    // Get DBTC balance
    const dbtcBal = await dbtcContract.methods.balanceOf(userAddress).call({ from: userAddress });
    dbtcBalance.value = web3.value.utils.fromWei(dbtcBal, "ether");
  } catch (error) {
    console.error("Error fetching balances:", error);
  }
}

async function handleSwap() {
  allshow.value = true;
  try {
    if (!dbtcAmount.value || parseFloat(dbtcAmount.value) <= 0) {
      showFailToast(t('swap.invalidAmount'));// 提示用户输入有效数量
      return;
    }

    // 检查用户是否已经授权DBTC
    const dbtcContract = new web3.value.eth.Contract(DbtcAPI, DBTC);
    const allowance = await dbtcContract.methods.allowance(userAddress, SwapDBTC).call();

    if (parseFloat(allowance) < parseFloat(web3.value.utils.toWei(dbtcAmount.value.toString(), "ether"))) {
      showFailToast(t('swap.notEnoughAllowance'));
      return;
    }

    // 将DBTC转换为Wei
    const amountInWei = web3.value.utils.toWei(dbtcAmount.value.toString(), "ether");

    const swapContract = new web3.value.eth.Contract(SwapDbtcAPI, SwapDBTC);

    // 发送兑换交易
    const tx = await swapContract.methods.swapDBTC(amountInWei).send({
      from: userAddress,
    });
    showSuccessToast(t('swap.exchangeSuccess'));
    await web3data();
    dbtcAmount.value = "";
    calculatedUSDT.value = 0;
  } catch (error) {
    showFailToast(t('swap.exchangeFail'));
  } finally {
    allshow.value = false;
  }
}

async function handleApprove() {
  allshow.value = true;
  try {
    const dbtcContract = new web3.value.eth.Contract(DbtcAPI, DBTC);
    const amountInWei = web3.value.utils.toWei("1000000000", "ether"); // 授权大量DBTC
    const tx = await dbtcContract.methods.approve(SwapDBTC, amountInWei).send({
      from: userAddress,
    });
    showSuccessToast(t('swap.approveSuccess'));
    isApproved.value = true; // 授权成功后更新状态
  } catch (error) {
    showFailToast(t('swap.approveFail'));
  } finally {
    allshow.value = false;
  }
}
</script>

<style scoped lang="scss">
.page {
  position: relative;
  width: 100%;
  max-width: 375px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  margin: 0 auto;
}

.group {
  box-shadow: 0px 30px 60px rgba(6, 19, 13, 0.08);
  background-color: rgba(27, 27, 29, 1);
  border-radius: 16px;
  width: 90%;
  padding: 20px;
  margin-bottom: 15px;
  height: 167px; /* Fixed height for group panels */
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.thumbnail {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.text-group {
  font-size: 15px;
  color: rgba(255, 255, 255, 1);
}

.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}

.token-info {
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  width: 85px;
}

.token-icon {
  width: 24px;
  height: 24px;
}

.token-text {
  margin-left: 5px;
  display: flex;
  align-items: center;
}

.token-name {
  font-size: 15px;
  color: rgba(255, 255, 255, 1);
  margin-right: 5px;
}

.dropdown-icon {
  width: 14px;
  height: 14px;
}

.token-amount {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
}

.input-wrapper {
  margin-top: 15px;
  width: 100%;
  padding: 0 5%;
}

.input-field {
  width: 80%;
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  outline: none;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 11px; /* 11px between panels */
}

.label_5 {
  width: 30px;
  height: 30px;
}

.button-wrapper {
  margin-top: 30px;
  width: 90%;
  margin-bottom: 80px; /* 80px space below the button */
}

.swap-button {
  width: 100%;
  padding: 15px;
  background-color: #CDF202; /* 按钮颜色修改为 #CDF202 */
  border-radius: 40px;
  color: rgba(27, 27, 29, 1); /* 设置按钮文字颜色 */
  font-size: 14px;
  text-align: center;
  border: none;
}

.price-panel {
  background-color: rgba(27, 27, 29, 1);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 15px;
  width: 90%;
  box-shadow: 0px 30px 60px rgba(6, 19, 13, 0.08);
}

.price-info, .slippage-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.price-label, .slippage-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.price-value {
  color: #CDF202;
  font-size: 16px;
}

.slippage-select {
  background-color: rgba(255, 255, 255, 0.07);
  color: white;
  border-radius: 8px;
  padding: 5px;
  border: none;
  outline: none;
}

.gray-button {
  background-color: gray;
  cursor: not-allowed;
}
</style>
