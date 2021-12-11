export default {

    dashboard: {
        infoWallet: {
            label: "Ваш аккаунт"
        },
        buyEch: {
            label: "Купить ECH на сайте",
        },
        transactionHistory: {
            title: "История транзакций",
        },


        errors: {
            errorSendTransaction: "Ошибка отправки транзакции",
        },
        success: {
            successSendTransaction: "Транзакция успешно осуществлена",
        }
    },
    transactionDetails: {
        header: {
            title: "Детали транзации",

            payment: "Оплата",
        },
        information: {
            send: "Количество",
            destinationAccount: "адрес получателя",
            transactionConfirmation: "подтверждение транзакции",
            ledgerIndex: "индекс ledger",
            fromAccount: "из аккаунта",
            sequenceNumber: "порядковый номер",
            blockExplorer: "Посмотреть в обозревателе блоков",
        }
    },
    transferSend: {
        form: {
            addressPlaceholder: "Кошелек-адрес:",
            amountPlaceholder: "Количество:",
            buttonSend: "Отправить",

            errorAddressEmpty: "Введите адрес кошелька",
            errorAddressNotValid: "Адрес кошелька недействителен",
            errorAddressAmount: "Укажите количество для отправки",
            errorAddressAmountBig: "Указанная сумма превышает ваш баланс",
        },

        confirm: {
            title: "Подтверждение",
            message: "Вы хотите отправить {{amount}} ECH в: {{address}}",
        },
        error: {
            insufficientFunds: "Недостаточно средств для отправки (transfer amount + commission)"
        }
    },
    receiveAmount: {
        addressTitle: "Адрес моего ECH кошелька",
        addressValue: "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",

        tapToCopy: "Нажмите на QR-код чтобы скопировать",
        successCopyAddress: "Адрес скопирован в буфер обмена",
    },
    qrScan: {
        walletAddressScanned: "Кошелек Escobar Cash просканирован",
        buttonSend: "Отправить ECH в этот кошелек",

        errorScann: "Неправильный адрес",
        escobarCashNoteScanned: "Кошелек Escobar Cash просканирован",

        moveECHToWallet: "Отправить ECH в Кошелек",
        ok: "Ок",

        scannedCash: {
            messageConfirm: "Вы хотите отправить {{balance}} ECH в ваш кошелек?",

            balance: "Баланс:",
            serial: "Серийный номер:",
        }
    },
    verify: {
        title: "Введите серийный номер банкноты и секретные слова чтобы Верифицировать валидность банкноты",

        noteSerial: "Серийный номер банкноты:",
        secret1: "Секрет 1:",
        secret2: "Секрет 2:",
        secret3: "Секрет 3:",

        buttonSend: "Отправить",

        errorValid: "Заполните форму",

        notValidCash1: "Ваша Эскобар банкнота",
        notValidCash2: "Недействительна!",
        notValidCashCaption: "Недействительность банкноты может быть обусловлена тем, что баланс уже отправлен в кошелек или это недействиельная банкнота.",

        validCashCash1: "Ваша Эскобар банкнота",
        validCashCash2: "Действительна!",
        validCashCaption: "Чтобы отправить или переместить баланс в кошелек, вам необходимо отсканировать QR-код.",

        buttonUpdate: "Войти снова",
    },
    security: {
        pinCode: "Пин-код",
        emailConfirmation: "Подтверждение Email",
        exportWallet: "Экспорт кошелька",
        importWallet: "Импорт кошелька",

        off: "выкл",
        notDone: "не завершено",
        notAvailable: "недоступно",
    },
    importWallet: {
        title: "Импорт кошелька",
        message: "Импорт кошелька приведет к закрытию вашего текущего кошелька. Не забудьте сделать резервную копию текущего кошелька на случай, если у вас есть баланс.",

        secretKey: "Секретный ключ:",

        buttonConfirm: "Подтвердить",
        buttonCancel: "Отмена",

        errors: {
            seedEmpty: "Введите секретный ключ",
            seedNotValid: "Введен некорректный секретный ключ",
        },
        confirmImport: {
            title: "Подтверждение",
            message: "Текущий открытый кошелек будет очищен и доступен только в том случае, если у вас есть секретный ключ. Вы уверены, что хотите импортировать свой новый кошелек?",
        },
        popUpInfo: {
            title: "Уведомление ",
            message: "Кошелек успешно импортирован",
        }
    },
    welcome: {
        buttonStart: "СТАРТ",
    },
    account: {
        label: "Аккаунт",

        accountId: "Адрес кошелька:"
    },
    exportWallet: {
        label: "Экспорт кошелька",

        buttonExportScreen: "Экспорт кошелька на экране",
        successCopy: "Успешно скопирован",

        modal: {
            secretKeyLabel: "Секретный ключ",
            addressLabel: "Адрес кошелька",
        },
    },
    pinCode: {
        label: "Пин-код",
        enterPin: "Введите пин-код",
        enterPinRepeat: "Повторите ввод пин-кода",

        confirmSetPassword: {
            label: "Подтвердить",
            message: "Вы уверены, что хотите установить пин-код?",
        },
        useFingerprintScanner: {
            label: "Сканер отпечатков пальцев",
            message: "Хотите использовать отпечаток пальца для разблокировки приложения?",

            title: "Авторизация\nобязательна",
            cancelButton: "Отмена",
        },
        errors: {
            passwordMismatch: "Пароли не совпадают",
        },
        success: {
            setupPinCode: "Пароль установлен успешно ",
        },
        successSetupPassword: {
            title: "Уведомление",
            message: "Пин-код был автоматически установлен",
        },
    },
    modalApplicationLock: {
        title: "Введите Пин-код",

        fingerprintScannerTitle: "Авторизация\nобязательна",
        fingerprintScannerCancelButton: "ПИН",
    },

    header: {
        account: "Аккаунт",
        security: "Безопасность",
        preference: "Настройки",
        support: "Поддержка",
    },
    controls: {
        send: "ОТПР",
        receive: "ПОЛУ",
        scan: "СКАН",
        verify: "ВЕРИФ",
    },
    common: {
        confirm: "Подтвердить",
        cancel: "Отмена"
    },
    popUpInformation: {
        close: "Закрыть",
        confirm: "Подтвердить",
    },
    locale: {

        popUpLabel: "Выбрать язык",
    },

}
