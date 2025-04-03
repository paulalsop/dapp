<template>
  <van-overlay :show="allshow" z-index="10000">
    <div style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center">
      <van-loading color="#CDF202"/>
    </div>
  </van-overlay>
  <div class="page flex-col">
    <!-- 切换类型选择器 -->
    <div class="swap-type-selector">
      <div
        :class="['type-option', swapType === 'DBTC' ? 'active' : '']"
        @click="changeSwapType('DBTC')"
      >
        DBTC → USDT
      </div>
      <div
        :class="['type-option', swapType === 'USDA' ? 'active' : '']"
        @click="changeSwapType('USDA')"
      >
        USDT → USDA
      </div>
    </div>

    <!-- 出售 Section -->
    <div class="group flex-col">
      <div class="content flex-row justify-between">
        <div class="token-info flex-row">
          <div class="token-icon-wrapper">
            <img class="token-icon" :src="inputTokenIcon" />
          </div>
          <div class="token-text flex-row">
            <span class="token-name">{{ inputTokenName }}</span>
            <img class="dropdown-icon" src="@/assets/swap/Frame@2x(1).png" />
          </div>
        </div>
        <span class="token-amount">{{ $t('swap.balance') }}: {{ inputTokenBalance }} {{ inputTokenName }}</span>
      </div>
      <div class="input-wrapper flex-col">
        <input
            type="number"
            class="input-field"
            :placeholder="$t('swap.enterAmount')"
            v-model="inputAmount"
            @input="calculateToken"
        />
      </div>
    </div>

    <!-- 中间图标 -->
    <div class="icon-wrapper">
      <img class="label_5" referrerpolicy="no-referrer" src="@/assets/swap/Group%20729@2x.png" alt="Swap Icon" />
    </div>

    <!-- 购买 Section -->
    <div class="group flex-col">
      <div class="content flex-row justify-between">
        <div class="token-info flex-row">
          <div class="token-icon-wrapper" :class="swapType === 'USDA' && outputTokenName === 'USDA' ? 'usda-icon-wrapper' : ''">
            <img class="token-icon" :src="outputTokenIcon" />
          </div>
          <div class="token-text flex-row">
            <span class="token-name">{{ outputTokenName }}</span>
            <img class="dropdown-icon" src="@/assets/swap/Frame@2x(1).png" />
          </div>
        </div>
        <span class="token-amount">{{ $t('swap.balance') }}: {{ outputTokenBalance }} {{ outputTokenName }}</span>
      </div>
      <div class="input-wrapper flex-col">
        <input
          type="text"
          class="input-field"
          :value="calculatedToken"
          readonly
        />
      </div>
    </div>

    <!-- 价格面板 -->
    <div class="price-panel flex-col" v-show="swapType === 'DBTC'">
      <div class="price-info flex-row justify-between">
        <span class="price-label">{{ $t('swap.price') }}</span>
        <span class="price-value">{{ bestPrice }} {{ swapType === 'DBTC' ? 'USDT / DBTC' : 'USDT / USDA' }}</span>
      </div>
      <div class="slippage-info flex-row justify-between">
        <span class="slippage-label">{{ $t('swap.slippage') }}</span>
        <select v-model="slippage" class="slippage-select" @change="calculateToken">
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
import { USDASwapABI } from "@/components/USDASwap_ABI";
import { USDAAPI } from "@/components/USDA_API";
import { useStore } from "vuex";
import { showSuccessToast, showFailToast } from 'vant';

let allshow = ref(false);
let canSwap = ref(false); // To store the result from startSwap method
const store = useStore();
const USDT = store.state.USDT; // USDT contract address
const DBTC = store.state.DBTCoinNew; // DBTCoinNew contract address
const SwapDBTC = store.state.SwapDBTC; // Swap contract address
const Usda = store.state.USDA; // Usda contract address
const SwapUsda = store.state.USDASwap; // SwapUsda contract address
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// Web3 initialization
const web3 = ref(null);
const usdtBalance = ref(0);
const dbtcBalance = ref(0);
const usdaBalance = ref(0);
const inputAmount = ref(""); // User input amount
const calculatedToken = ref(0); // 计算出的代币数量
const bestPrice = ref(0); // 最优惠的价格
const slippage = ref("10");
const userAddress = localStorage.getItem("address"); // User address
const isApproved = ref(false); // 用于存储用户是否已经授权
const formattedUSDTBalance = computed(() => parseFloat(usdtBalance.value).toFixed(8));
const formattedDBTCBalance = computed(() => parseFloat(dbtcBalance.value).toFixed(8));
const formattedUSDABalance = computed(() => parseFloat(usdaBalance.value).toFixed(8));

// 添加代币切换相关
const swapType = ref("DBTC"); // 默认兑换DBTC到USDT

// 根据当前选择的代币类型，确定输入和输出代币
const inputTokenName = computed(() => {
  return swapType.value === "DBTC" ? "DBTC" : "USDT";
});

const outputTokenName = computed(() => {
  return swapType.value === "DBTC" ? "USDT" : "USDA";
});

// 根据当前选择的代币类型，返回对应的输入代币图标
const inputTokenIcon = computed(() => {
  return swapType.value === "DBTC" 
    ? require("@/assets/swap/DBTC@2x.png") 
    : require("@/assets/swap/usdt@2x.png");
});

// 根据当前选择的代币类型，返回对应的输出代币图标
const outputTokenIcon = computed(() => {
  return swapType.value === "DBTC" 
    ? require("@/assets/swap/usdt@2x.png") 
    : require("@/assets/swap/USDA.png");
});

// 根据当前选择的代币类型，返回对应的输入代币余额
const inputTokenBalance = computed(() => {
  return swapType.value === "DBTC" 
    ? formattedDBTCBalance.value 
    : formattedUSDTBalance.value;
});

// 根据当前选择的代币类型，返回对应的输出代币余额
const outputTokenBalance = computed(() => {
  return swapType.value === "DBTC" 
    ? formattedUSDTBalance.value 
    : formattedUSDABalance.value;
});

// 切换兑换类型
const changeSwapType = async (type) => {
  swapType.value = type;
  await getBestPrice();
  await checkSwapStatus();
  await checkApprovalStatus();
  calculateToken();
};

onMounted(async () => {
  web3.value = await useWeb3();
  web3data(); // 获取余额
  await getBestPrice();

  // 调用startSwap方法来确定是否允许兑换
  await checkSwapStatus();

  // 检查用户是否已授权
  await checkApprovalStatus();
});

// 检查授权状态
async function checkApprovalStatus() {
  try {
    let contractToCheck, targetContract;
    
    if (swapType.value === "DBTC") {
      // 如果是DBTC->USDT，需要检查DBTC的授权
      contractToCheck = new web3.value.eth.Contract(DbtcAPI, DBTC);
      targetContract = SwapDBTC;
    } else {
      // 如果是USDT->USDA，需要检查USDT的授权
      contractToCheck = new web3.value.eth.Contract(UsdtAPI, USDT);
      targetContract = SwapUsda;
    }
    
    const allowance = await contractToCheck.methods.allowance(userAddress, targetContract).call();

    if (parseFloat(allowance) > 0) {
      isApproved.value = true; // 已经授权
    } else {
      isApproved.value = false; // 未授权
    }
  } catch (error) {
    console.error("Error checking approval status:", error);
    isApproved.value = false;
  }
}

// Call startSwap method to check if the swap is allowed
async function checkSwapStatus() {
  try {
    if (swapType.value === "DBTC") {
      const swapContract = new web3.value.eth.Contract(SwapDbtcAPI, SwapDBTC);
      canSwap.value = await swapContract.methods.startSwap().call();
    } else {
      // 对于USDA兑换，默认允许兑换
      canSwap.value = true;
    }
  } catch (error) {
    console.error("Error checking swap status:", error);
    canSwap.value = false;
  }
}

watch(inputAmount, (newValue) => {
  if (swapType.value === "DBTC") {
    // DBTC->USDT兑换时检查DBTC余额
    if (parseFloat(newValue) > parseFloat(dbtcBalance.value)) {
      inputAmount.value = dbtcBalance.value;
    }
  } else {
    // USDT->USDA兑换时检查USDT余额
    if (parseFloat(newValue) > parseFloat(usdtBalance.value)) {
      inputAmount.value = usdtBalance.value;
    }
  }
  calculateToken(); // 每次输入变化后重新计算
});

watch(slippage, (newSlippage) => {
  calculateToken(); // 当滑点变化时重新计算
});

watch(swapType, () => {
  inputAmount.value = ""; // 切换类型时清空输入
  calculatedToken.value = 0;
});

// 计算代币兑换数量
function calculateToken() {
  if (bestPrice.value > 0 && inputAmount.value > 0) {
    if (swapType.value === "DBTC") {
      // DBTC->USDT兑换
      const dbtcAfterSlippage = parseFloat(inputAmount.value) * (1 - parseFloat(slippage.value) / 100);
      calculatedToken.value = (dbtcAfterSlippage * bestPrice.value * 0.9975).toFixed(8);
    } else {
      // USDT->USDA兑换，比例为1:2
      // USDA兑换不考虑滑点
      calculatedToken.value = (parseFloat(inputAmount.value) * 2).toFixed(8);
    }
  } else {
    calculatedToken.value = 0;
  }
}

// 获取最优惠的价格
async function getBestPrice() {
  try {
    if (swapType.value === "DBTC") {
      const swapContract = new web3.value.eth.Contract(SwapDbtcAPI, SwapDBTC);
      const price = await swapContract.methods.getPrice().call();
      bestPrice.value = parseFloat(web3.value.utils.fromWei(price, "ether")).toFixed(4);
    } else {
      // 对于USDA兑换，使用固定价格1:2 (0.5表示1USDT=2USDA)
      bestPrice.value = 0.5;
    }
  } catch (error) {
    showFailToast(t('swap.bestPriceError'));
  }
}

async function web3data() {
  try {
    const usdtContract = new web3.value.eth.Contract(UsdtAPI, USDT);
    const dbtcContract = new web3.value.eth.Contract(DbtcAPI, DBTC);
    const usdaContract = new web3.value.eth.Contract(USDAAPI, Usda);

    // Get USDT balance
    const usdtBal = await usdtContract.methods.balanceOf(userAddress).call({ from: userAddress });
    usdtBalance.value = web3.value.utils.fromWei(usdtBal, "ether");

    // Get DBTC balance
    const dbtcBal = await dbtcContract.methods.balanceOf(userAddress).call({ from: userAddress });
    dbtcBalance.value = web3.value.utils.fromWei(dbtcBal, "ether");

    // Get USDA balance
    const usdaBal = await usdaContract.methods.balanceOf(userAddress).call({ from: userAddress });
    usdaBalance.value = web3.value.utils.fromWei(usdaBal, "ether");
  } catch (error) {
    console.error("Error fetching balances:", error);
  }
}

async function handleSwap() {
  allshow.value = true;
  try {
    if (!inputAmount.value || parseFloat(inputAmount.value) <= 0) {
      showFailToast(t('swap.invalidAmount')); // 提示用户输入有效数量
      return;
    }

    let contractToCheck, targetContract, swapContract, amountInWei;
    
    // 根据当前兑换类型设置相关合约和参数
    if (swapType.value === "DBTC") {
      // DBTC->USDT兑换
      contractToCheck = new web3.value.eth.Contract(DbtcAPI, DBTC);
      targetContract = SwapDBTC;
      swapContract = new web3.value.eth.Contract(SwapDbtcAPI, SwapDBTC);
      amountInWei = web3.value.utils.toWei(inputAmount.value.toString(), "ether");
    } else {
      // USDT->USDA兑换
      contractToCheck = new web3.value.eth.Contract(UsdtAPI, USDT);
      targetContract = SwapUsda;
      swapContract = new web3.value.eth.Contract(USDASwapABI, SwapUsda);
      amountInWei = web3.value.utils.toWei(inputAmount.value.toString(), "ether");
    }
    
    // 检查授权额度
    const allowance = await contractToCheck.methods.allowance(userAddress, targetContract).call();
    if (parseFloat(allowance) < parseFloat(amountInWei)) {
      showFailToast(t('swap.notEnoughAllowance'));
      return;
    }

    // 发送兑换交易
    if (swapType.value === "DBTC") {
      // DBTC->USDT兑换
      await swapContract.methods.swapDBTC(amountInWei).send({
        from: userAddress
      });
    } else {
      // USDT->USDA兑换
      await swapContract.methods.swap(amountInWei).send({
        from: userAddress
      });
    }
    
    showSuccessToast(t('swap.exchangeSuccess'));
    await web3data();
    inputAmount.value = "";
    calculatedToken.value = 0;
  } catch (error) {
    showFailToast(t('swap.exchangeFail'));
  } finally {
    allshow.value = false;
  }
}

async function handleApprove() {
  allshow.value = true;
  try {
    let contractToApprove, targetContract;
    
    if (swapType.value === "DBTC") {
      // DBTC->USDT兑换，授权DBTC
      contractToApprove = new web3.value.eth.Contract(DbtcAPI, DBTC);
      targetContract = SwapDBTC;
    } else {
      // USDT->USDA兑换，授权USDT
      contractToApprove = new web3.value.eth.Contract(UsdtAPI, USDT);
      targetContract = SwapUsda;
    }
    
    const amountInWei = web3.value.utils.toWei("1000000000", "ether"); // 授权大量代币
    
    await contractToApprove.methods.approve(targetContract, amountInWei).send({
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

/* 添加代币类型选择器样式 */
.swap-type-selector {
  display: flex;
  width: 90%;
  background-color: rgba(27, 27, 29, 1);
  border-radius: 40px;
  margin-bottom: 20px;
  overflow: hidden;
}

.type-option {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-option.active {
  background-color: #CDF202;
  color: rgba(27, 27, 29, 1);
  font-weight: bold;
}

.group {
  box-shadow: 0px 30px 60px rgba(6, 19, 13, 0.08);
  background-color: rgba(27, 27, 29, 1);
  border-radius: 16px;
  width: 90%;
  padding: 20px;
  margin-bottom: 15px;
  height: auto; /* 修改为自适应高度 */
  min-height: 130px; /* 设置最小高度 */
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
  margin-top: 10px;
  margin-bottom: 15px;
}

.token-info {
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  width: auto;
  min-width: 85px;
}

.token-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1);
}

.usda-icon-wrapper {
  background-color: rgba(255, 255, 255, 0.3); /* 为USDA图标增加更明显的背景 */
  border: 1px solid rgba(255, 255, 255, 0.5); /* 添加边框增加对比度 */
}

.token-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.token-text {
  margin-left: 8px;
  display: flex;
  align-items: center;
}

.token-name {
  font-size: 15px;
  color: rgba(255, 255, 255, 1);
  margin-right: 5px;
  font-weight: 500;
}

.dropdown-icon {
  width: 14px;
  height: 14px;
}

.token-amount {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.input-wrapper {
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  margin: -5px 0; /* 减小上下间距 */
  z-index: 2;
  position: relative;
}

.label_5 {
  width: 30px;
  height: 30px;
  background-color: rgba(27, 27, 29, 1);
  border-radius: 50%;
  padding: 5px;
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
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
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
  font-weight: 500;
}

.slippage-select {
  background-color: rgba(255, 255, 255, 0.07);
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  cursor: pointer;
}

.gray-button {
  background-color: gray;
  cursor: not-allowed;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: none;
  }
}
</style>
