export default {

  dashboard: {
    infoWallet: {
      label: "Your account"
    },
    buyEch: {
      label: "Buy ECH online",
    },
    transactionHistory: {
      title: "Transaction history",
    },


    errors: {
      errorSendTransaction: "Error send transaction",
    },
    success: {
      successSendTransaction: "Transaction was successfully sent",
    }
  },
  transactionDetails: {
    header: {
      title: "Transaction details",

      payment: "Payment",
    },
    information: {
      send: "AMOUNT",
      destinationAccount: "destination account",
      transactionConfirmation: "transaction confirmation",
      ledgerIndex: "ledger index",
      fromAccount: "from account",
      sequenceNumber: "sequence number",
      blockExplorer: "View in block explorer",
    }
  },
  transferSend: {
    form: {
      addressPlaceholder: "Wallet-address:",
      amountPlaceholder: "Amount:",
      buttonSend: "Send",

      errorAddressEmpty: "Enter wallet address",
      errorAddressNotValid: "Enter wallet address not valid",
      errorAddressAmount: "Enter the amount to send",
      errorAddressAmountBig: "The amount entered exceeds your balance",
    },

    confirm: {
      title: "Confirmation",
      message: "Do you want to send {{amount}} ECH to: {{address}}",
    },
    error: {
      insufficientFunds: "Insufficient funds to send (transfer amount + commission)"
    }
  },
  receiveAmount: {
    addressTitle: "My ECH deposit address",
    addressValue: "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",

    tapToCopy: "Tap to copy",
    successCopyAddress: "Address copied to clipboard",
  },
  qrScan: {
    walletAddressScanned: "Escobar Cash wallet scanned",
    buttonSend: "Send ECH to this wallet",

    errorScann: "Invalid address",
    escobarCashNoteScanned: "Escobar Cash wallet scanned",

    moveECHToWallet: "Move ECH to Wallet",
    ok: "Ok",

    scannedCash: {
      messageConfirm: "Do you want to transfer {{balance}} ECH to your wallet?",

      balance: "Balance:",
      serial: "Serial:",
    }
  },
  verify: {
    title: "Enter note serial and secret words to Verify note validity",

    noteSerial: "Note serial:",
    secret1: "Secret 1:",
    secret2: "Secret 2:",
    secret3: "Secret 3:",

    buttonSend: "Send",

    errorValid: "Fill the form",

    notValidCash1: "Your Escobar cash note is",
    notValidCash2: "invalid!",
    notValidCashCaption: "An invalid note can be caused if the balance is already sent to a wallet or if it is an inauthentic note.",

    validCashCash1: "Your Escobar cash note is",
    validCashCash2: "valid!",
    validCashCaption: "To send or move balance to wallet you need to scan the QR code.",

    buttonUpdate: "Enter again",
  },
  security: {
    pinCode: "Pin code",
    emailConfirmation: "Email confirmation",
    exportWallet: "Export wallet",
    importWallet: "Import wallet",

    off: "off",
    notDone: "not done",
    notAvailable: "not available",
  },
  importWallet: {
    title: "Import wallet",
    message: "Importing a wallet will cause your current wallet to close, please be sure to backup your current wallet in the event you have a balance.",

    secretKey: "Secret key:",

    buttonConfirm: "Confirm",
    buttonCancel: "Cancel",

    errors: {
      seedEmpty: "Enter secret key",
      seedNotValid: "Entered incorrect secret key",
    },
    confirmImport: {
      title: "Confirmation",
      message: "The current opened wallet will be purged and only accessible if you have the secret key. Are you sure you want to import your new wallet?",
    },
    popUpInfo: {
      title: "Notification",
      message: "Wallet imported successfully",
    }
  },
  welcome: {
    buttonStart: "START",
  },
  account: {
    label: "Account",

    accountId: "Account-id:"
  },
  exportWallet: {
    label: "Export wallet",

    buttonExportScreen: "Export wallet on screen",
    successCopy: "Successfully copied",

    modal: {
      secretKeyLabel: "Secret Key",
      addressLabel: "Account-id",
    },
  },
  pinCode: {
    label: "Pin code",
    enterPin: "Enter pin",
    enterPinRepeat: "Repeat enter pin",

    confirmSetPassword: {
      label: "Confirm",
      message: "Are you sure you want to set a pin code?",
    },
    useFingerprintScanner: {
      label: "Fingerprint Scanner",
      message: "Would you like to use your fingerprint to unlock the app?",

      title: "Authentication\nrequired",
      cancelButton: "Cancel",
    },
    errors: {
      passwordMismatch: "Password mismatch",
    },
    success: {
      setupPinCode: "Password set successfully",
    },
    successSetupPassword: {
      title: "Notification",
      message: "PIN code has been successfully installed",
    },
  },
  modalApplicationLock: {
    title: "Enter pin code",

    fingerprintScannerTitle: "Authentication\nrequired",
    fingerprintScannerCancelButton: "PIN",
  },

  header: {
    account: "Account",
    security: "Security",
    preference: "Preferences",
    support: "Support",
  },
  controls: {
    send: "SEND",
    receive: "RECEIVE",
    scan: "SCAN",
    verify: "VERIFY",
  },
  common: {
    confirm: "Confirm",
    cancel: "Cancel"
  },
  popUpInformation: {
    close: "Close",
    confirm: "Confirm",
  },
  locale: {

    popUpLabel: "Choose language",
  },

}
