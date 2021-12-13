export default {

    dashboard: {
        infoWallet: {
            label: "Ditt konto"
        },
        buyEch: {
            label: "Köp ECH online",
        },
        transactionHistory: {
            title: "Transaktionshistorik",
        },


        errors: {
            errorSendTransaction: "Transaktionen kunde inte skickas",
        },
        success: {
            successSendTransaction: "Transaktionen har skickats",
        }
    },
    transactionDetails: {
        header: {
            title: "Transaktionsdetaljer",

            payment: "Betalning",
        },
        information: {
            send: "Summa",
            destinationAccount: "mottagarkonto",
            transactionConfirmation: "transaktionsbekräftelse",
            ledgerIndex: "Indexering",
            fromAccount: "från konto",
            sequenceNumber: "Sekvens",
            blockExplorer: "Visa i block-explorer",
        }
    },
    transferSend: {
        form: {
            addressPlaceholder: "Plånboksadress:",
            amountPlaceholder: "Summa:",
            buttonSend: "Skicka",

            errorAddressEmpty: "Ange plånboksadress",
            errorAddressNotValid: "Angiven plånboksadress inte giltig",
            errorAddressAmount: "Ange summa att skicka",
            errorAddressAmountBig: "Summan överstiger ditt saldo",
        },

        confirm: {
            title: "Bekräfta",
            message: "Vill du skicka {{amount}} ECH till: {{address}}",
        },
        error: {
            insufficientFunds: "Otillräckligt saldo för att skicka (transfer amount + commission)"
        }
    },
    receiveAmount: {
        addressTitle: "Min ECH plånboksadress",
        addressValue: "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",

        tapToCopy: "Klicka för att kopiera",
        successCopyAddress: "Adressen kopierad!",
    },
    qrScan: {
        walletAddressScanned: "Escobar Cash-plånbok scannad",
        buttonSend: "Skicka ECH till min plånbok",

        errorScann: "Felaktig adress",
        escobarCashNoteScanned: "Escobar Cash-plånbok scannad",

        moveECHToWallet: "Flytta ECH till plånbok",
        ok: "Ok",

        scannedCash: {
            messageConfirm: "Vill du överföra {{balance}} ECH till din plånbok?",

            balance: "Summa:",
            serial: "Serienummer:",
        }
    },
    verify: {
        title: "Ange serienummer från seden och säkerhetsord för att verifiera giltighet.",

        noteSerial: "Serienummer:",
        secret1: "Secret 1:",
        secret2: "Secret 2:",
        secret3: "Secret 3:",

        buttonSend: "Skicka",

        errorValid: "Fyll i formuläret",

        notValidCash1: "Din Escobar Cash-sedel är",
        notValidCash2: "ogiltig!",
        notValidCashCaption: "En ogiltig sedel kan orsakas av att sedelns summa redan skickats eller att sedeln inte är äkta.",

        validCashCash1: "Din Escobar Cash-sedel är",
        validCashCash2: "giltig!",
        validCashCaption: "Scanna QR-koden för att flytta saldot till din plånbok.",

        buttonUpdate: "Ange igen",
    },
    security: {
        pinCode: "Pinkod",
        emailConfirmation: "Emailbekräftelse",
        exportWallet: "Exportera plånbok",
        importWallet: "Importera plånbok",

        off: "av",
        notDone: "inte utfört",
        notAvailable: "inte tillgänglig",
    },
    importWallet: {
        title: "Importera plånbok",
        message: "Importerar du en plånbok kommer din nuvarande skrivas över, ta en kopia genom att exportera din plånbok om du har saldo på den.",

        secretKey: "Säkerhetsnyckel:",

        buttonConfirm: "Bekräfta",
        buttonCancel: "Avbryt",

        errors: {
            seedEmpty: "Ange säkerhetsnyckel",
            seedNotValid: "Angiven secret key ogiltig",
        },
        confirmImport: {
            title: "Bekräftelse",
            message: "Din nuvarande plånbok kommer raderas och kan enbart importeras tillbaka om du har exporterat din plånbok. Är du säker på att du vill importera ny plånbok?",
        },
        popUpInfo: {
            title: "Bekräftat!",
            message: "Plnånbok importerad",
        }
    },
    welcome: {
        buttonStart: "START",
    },
    account: {
        label: "Konto",

        accountId: "Konto-id:"
    },
    exportWallet: {
        label: "Exportera plånbok",

        buttonExportScreen: "Exportera plånbok på skärmen",
        successCopy: "Kopierat!",

        modal: {
            secretKeyLabel: "Secret Key",
            addressLabel: "Konto-id",
        },
    },
    pinCode: {
        label: "Pinkod",
        enterPin: "Ange pin",
        enterPinRepeat: "Bekräfta pin",

        confirmSetPassword: {
            label: "Bekräfta",
            message: "Är du säker att du vill ställa in en pin-kod?",
        },
        useFingerprintScanner: {
            label: "Scanna fingeravtryck",
            message: "Vill du använda fingeravtryck för att låsa upp appen?",

            title: "Autentisiering\nkrävs",
            cancelButton: "Avbryt",
        },
        errors: {
            passwordMismatch: "Lösenord matchar inte",
        },
        success: {
            setupPinCode: "Lösenord har sparats",
        },
        successSetupPassword: {
            title: "Notifikation",
            message: "PIN code has been successfully installed",
        },
    },
    modalApplicationLock: {
        title: "Ange pin-kod",

        fingerprintScannerTitle: "Autentisiering\nkrävs",
        fingerprintScannerCancelButton: "PIN",
    },

    header: {
        account: "Konto",
        security: "Säkerhet",
        preference: "Inställningar",
        support: "Support",
    },
    controls: {
        send: "SKICKA",
        receive: "TA EMOT",
        scan: "SCANNA",
        verify: "VERIFIERA",
    },
    common: {
        confirm: "Bekräfta",
        cancel: "Avbryt"
    },
    popUpInformation: {
        close: "Stäng",
        confirm: "Bekräfta",
    },
    locale: {

        popUpLabel: "Välj språk",
    },

}
