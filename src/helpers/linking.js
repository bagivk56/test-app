
const getLinkBrowserTransaction = ({hash, currency}) => {
  let link = "";

  if (currency === 'BNB' || currency === 'BUSD' || currency === 'WWT') {
    link = `https://bscscan.com/tx/${hash}`
  }
  if (currency === 'ETH' || currency === 'USDT') {
    link = `https://etherscan.io/tx/${hash}`
  }
  if (currency === 'POLYGON') {
    link = `https://polygonscan.com/tx/${hash}`
  }

  return link
}

export {
  getLinkBrowserTransaction
}
