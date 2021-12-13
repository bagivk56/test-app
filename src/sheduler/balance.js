import { getItem } from "../common/Storage";
import axiosInstance from "../agent/agent";
import urls from "../constants/urls";
import ethConvert from "ether-converter";
import btcConvert from "satoshi-bitcoin";
import { getWalletsList } from "../helpers/walletsList";
import currency_rank from "../constants/currency_rank";
import agent from "../agent/agent";

const getBalanceMain = async (wallet = null) => {
  if (!wallet) {
    wallet = await getItem("wallet") || "{}";
    wallet = JSON.parse(wallet);
  }
  if (Object.keys(wallet).length <= 0) {
    return wallet
  }

  let list = wallet?.list || [];

  await Promise.all(list.map(async (coin) => {

    let balance = '0';

    if (coin?.rank === currency_rank.MAIN_BNB) {
      balance = await _balanceMainBNB(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_BNB) {
      balance = await _balanceTokenBNB(coin?.address, coin?.contract);
    }

    if (coin?.rank === currency_rank.MAIN_ETH) {
      balance = await _balanceMainETH(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_ETH) {
      balance = await _balanceTokenETH(coin?.address, coin?.contract);
    }

    if (coin?.rank === currency_rank.MAIN_BTC) {
      balance = await _balanceMainBTC(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_BTC) {}

    if (coin?.rank === currency_rank.MAIN_LTC) {}
    if (coin?.rank === currency_rank.TOKEN_LTC) {}

    if (coin?.rank === currency_rank.MAIN_SOL) {}
    if (coin?.rank === currency_rank.TOKEN_SOL) {}

    if (coin?.rank === currency_rank.MAIN_POLYGON) {
      balance = await _balanceMainPOLYGON(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_POLYGON) {
      balance = await _balanceTokenPOLYGON(coin?.address, coin?.contract);
    }

    coin.indivisibleBalance = balance;
    coin.printedBalance = balance;
  }));

  const { wallet: walletNew } = await getWalletsList({
    walletName: wallet.key,
    walletList: list
  });

  return walletNew
}
const getBalanceTokens = async (wallet = null) => {
  if (!wallet) {
    wallet = await getItem("wallet") || "{}";
    wallet = JSON.parse(wallet);
  }
  if (Object.keys(wallet).length <= 0) {
    return wallet
  }

  let list = wallet?.list || [];

  await Promise.all(list.map(async (coin) => {

    let balance = '0';

    if (coin?.rank === currency_rank.CUSTOM_TOKEN_BNB) {
      balance = await _balanceTokenBNB(coin?.address, coin?.contract);
    }

    if (coin?.rank === currency_rank.CUSTOM_TOKEN_ETH) {
      balance = await _balanceTokenETH(coin?.address, coin?.contract);
    }

    if (coin?.rank === currency_rank.CUSTOM_TOKEN_BTC) {}

    if (coin?.rank === currency_rank.CUSTOM_TOKEN_LTC) {}

    if (coin?.rank === currency_rank.CUSTOM_TOKEN_SOL) {}

    if (coin?.rank === currency_rank.CUSTOM_TOKEN_POLYGON) {}

    console.log('balance: ', balance);

    coin.indivisibleBalance = balance;
    coin.printedBalance = balance;
  }));

  const { wallet: walletNew } = await getWalletsList({
    walletName: wallet.key,
    walletList: list
  });

  return walletNew
}

const _balanceMainBNB = async (address) => {
  return await agent.get(`${ urls.bnbBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceTokenBNB = async (address, contract) => {
  return await agent.get(`${ urls.bnbBalance }?address=${ address }&contract=${ contract }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceMainETH = async (address) => {
  return await agent.get(`${ urls.ethBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceTokenETH = async (address, contract) => {
  return await agent.get(`${ urls.ethBalance }?address=${ address }&contract=${ contract }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceMainBTC = async (address) => {
  return await agent.get(`${ urls.btcBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance;
    return btcConvert.toBitcoin(Number.parseFloat(balance));
  }).catch((err) => {
    return '0'
  })
}
const _balanceMainLTC = async () => {}
const _balanceMainSOL = async () => {}
const _balanceMainPOLYGON = async (address) => {
  return await agent.get(`${ urls.polygonBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceTokenPOLYGON = async (address, contract) => {
  return await agent.get(`${ urls.polygonBalance }?address=${ address }&contract=${ contract }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}

export {
  getBalanceMain,
  getBalanceTokens
}
