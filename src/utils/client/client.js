import {
  Client,
  Wallet,
  isoTimeToRippleTime,

  isValidSecret
} from "xrpl";
import {
  store
} from "../../store/store";
import urls from "../../constants/urls";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";

const getClientXrpl = async () => {

  const client = new Client(urls.clientServer);
  await client.connect();

  return client

}

const getTransactionList = async ({ address }) => {

  const client = await getClientXrpl();

  const transactionListInit = await client.request({
    "command": 'account_tx',
    "account": address,
    "ledger_index_min": -1,
    "ledger_index_max": -1,
    "binary": false,
    "limit": 50,
    "forward": false
  });

  const transactionList = (transactionListInit?.result?.transactions || [])
    .map((item) => {
    return {
      ...item?.tx
    }
  });

  return transactionList || []

};
const createTransaction = async ({ address, amount, walletInit }) => {
  const { globalState } = store.getState();
  const wallet = walletInit || globalState.wallets || {};

  const client = await getClientXrpl();
  const walletFund = Wallet.fromSeed(wallet.seed);


  let amountSend = (amount || 0) * 1000000;

  const tx = {
    Account: walletFund.address,
    Amount: String(amountSend),
    Destination: address,
    TransactionType: 'Payment'
  };

  const createEscrowResponse = await client.submitAndWait(tx, {
    wallet: walletFund,
  });

  return createEscrowResponse

}
const isValidSeed = (seed) => {
  return isValidSecret(seed)
}

export default getClientXrpl
export {
  getTransactionList,
  createTransaction,

  isValidSeed
}
