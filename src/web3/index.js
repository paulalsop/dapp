import Web3 from "web3";
// import detectEthereumProvider from "@metamask/detect-provider";
async function getEth() {
    const provider = Web3.givenProvider;
    if (provider !== window.ethereum) {
        alert("error 10404:MetaMask not installed");
    } else {
        return provider;
    }
}

export async function useWeb3(callback) {
    const web3Provider = await getEth();
    let userAddress;
    let web3;
    try {
        userAddress = await web3Provider.request({method: 'eth_requestAccounts'});
        web3 = new Web3(web3Provider)
    } catch (e) {
        console.log(e)
        alert('Please open it in a browser with a wallet')
        return ;
    }
    callback && callback(web3, userAddress[0]);
    return web3;
    // console.log(web3)

}

export function getContract(web3, abi, abiAddress) {
    return new web3.eth.Contract(abi, abiAddress);
}