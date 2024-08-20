<template>
  <router-view />
</template>
<script setup>
import { showSuccessToast, showFailToast } from 'vant';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { useStore } from "vuex"
const store = useStore();
async function mong() {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
      localStorage.removeItem('address');
      store.commit('backlianje', false)
       getSignature()

    });
  }
}
mong()
async function getSignature() {//登录
  let accountval = ''
  if (window.ethereum) {
    try {
      // 请求用户授权应用连接到MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
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
    showSuccessToast('链接成功');
  } catch (switchError) {
    showFailToast(t('链接失败'));
    // 这个错误代码表示尚未将该链添加到MetaMask中
    if (switchError.code === 4902) {
      try {
        // 请求添加该网络
        // await window.ethereum.request({
        //   method: 'wallet_addEthereumChain',
        //   params: [
        //     {
        //       chainId: '0x38',
        //       // 这里添加其他网络参数，如rpcUrl等
        //     },
        //   ],
        // });
      } catch (addError) {
        // 处理添加网络时发生的错误
        console.error('Failed to add the network:', addError);
      }
    } else {
      // 处理切换网络时发生的其他错误
      console.error('Failed to switch the network:', switchError);
    }
  }
  // try {
  //   if (localStorage.getItem('address') == accountval) {
  //     showSuccessToast('链接钱包成功');
  //     return
  //   }
  //   const signature = await window.ethereum.request({
  //     method: 'personal_sign',
  //     params: ['aaaaaaaas', accountval],
  //   });
  //   console.log(signature);
  //   localStorage.setItem('address', accountval);
  //   showSuccessToast('链接钱包成功');
  // } catch (i) {
  //   console.log(i);
  //   showFailToast('链接钱包失败');
  // }
}
</script>
<style lang="scss">
body,
html {
  overscroll-behavior: none;
}
</style>
