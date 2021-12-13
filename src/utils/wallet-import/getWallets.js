import {
  Wallet
} from "xrpl";

const getWalletSeed = async ({ seed }) => {
  const initWallet = Wallet.fromSeed(seed);

  return {
    ...initWallet,
    address: initWallet.address
  }
}
const getWalletNew = async () => {
  const initWallet = Wallet.generate();

  return {
    ...initWallet,
    address: initWallet.address
  }
}

export {
  getWalletSeed,
  getWalletNew
}
