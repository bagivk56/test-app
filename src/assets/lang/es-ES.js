export default {

    dashboard: {
        infoWallet: {
            label: "Su cuenta"
        },
        buyEch: {
            label: "Compre ECH en línea",
        },
        transactionHistory: {
            title: "Historial de transacciones",
        },


        errors: {
            errorSendTransaction: "Error al enviar la transacción",
        },
        success: {
            successSendTransaction: "La transacción se envió correctamente",
        }
    },
    transactionDetails: {
        header: {
            title: "Detalles de la transacción",

            payment: "Pago",
        },
        information: {
            send: "CANTIDAD",
            destinationAccount: "cuenta de destino",
            transactionConfirmation: "confirmación de transacción",
            ledgerIndex: "índice del libro mayor",
            fromAccount: "de la cuenta",
            sequenceNumber: "secuencia",
            blockExplorer: "Ver en el explorador de bloques",
        }
    },
    transferSend: {
        form: {
            addressPlaceholder: "Dirección de cartera:",
            amountPlaceholder: "Cantidad:",
            buttonSend: "Enviar",

            errorAddressEmpty: "Ingrese la dirección de la cartera",
            errorAddressNotValid: "Ingrese la dirección de la cartera no es válida",
            errorAddressAmount: "Ingrese la cantidad a enviar",
            errorAddressAmountBig: "La cantidad ingresada excede su saldo",
        },

        confirm: {
            title: "Confirmación",
            message: "Quieres enviar {{amount}} ECH a: {{address}}",
        },
        error: {
            insufficientFunds: "Saldo insuficientes para enviar (transfer amount + commission)"
        }
    },
    receiveAmount: {
        addressTitle: "Mi dirección de depósito ECH",
        addressValue: "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn",

        tapToCopy: "Toca para copiar",
        successCopyAddress: "Dirección copiada al portapapeles",
    },
    qrScan: {
        walletAddressScanned: "Escobar Cash cartera escaneado",
        buttonSend: "Envíe ECH a esta cartera",

        errorScann: "Invalid address",
        escobarCashNoteScanned: "Escobar Cash cartera escaneado",

        moveECHToWallet: "Moverse ECH a cartera",
        ok: "Ok",

        scannedCash: {
            messageConfirm: "Quieres transferir{{balance}} ECH a tu cartera?",

            balance: "Saldo:",
            serial: "Serial:",
        }
    },
    verify: {
        title: "Ingrese el número dserial y las palabras secretas de la nota para verificar la validez de la nota",

        noteSerial: "Nota serial:",
        secret1: "Secreto 1:",
        secret2: "Secreto 2:",
        secret3: "Secreto 3:",

        buttonSend: "Enviar",

        errorValid: "Completa el formulario",

        notValidCash1: "Tu nota de Escobar Cash es",
        notValidCash2: "inválido!",
        notValidCashCaption: "Una nota inválida puede ser causada si el saldo ya se envió a una cartera o si es una nota no auténtica.",

        validCashCash1: "Tu nota de Escobar Cash es",
        validCashCash2: "válido!",
        validCashCaption: "Para enviar o mover el saldo a la cartera, debe escanear el código QR.",

        buttonUpdate: "Entre de Nuevo",
    },
    security: {
        pinCode: "Código pin",
        emailConfirmation: "Confirmación de correo electrónico",
        exportWallet: "Exportar cartera",
        importWallet: "Importar cartera",

        off: "apagado",
        notDone: "no hecho",
        notAvailable: "bo disponible",
    },
    importWallet: {
        title: "Importar cartera",
        message: "La importación de una cartera hará que se cierre su cartera actual, asegúrese de hacer una copia de seguridad de su cartera actual en caso de que tenga un saldo.",

        secretKey: "Llave secreta:",

        buttonConfirm: "Confirmar",
        buttonCancel: "Cancelar",

        errors: {
            seedEmpty: "Ingrese la clave secreta",
            seedNotValid: "Ingresó una clave secreta incorrecta",
        },
        confirmImport: {
            title: "Confirmación",
            message: "La cartera abierta actual se purgará y solo se podrá acceder a ella si tiene la clave secreta. ¿Está seguro de que desea importar su nueva cartera?",
        },
        popUpInfo: {
            title: "Notificación",
            message: "Cartera importado correctamente",
        }
    },
    welcome: {
        buttonStart: "COMIENZO",
    },
    account: {
        label: "Cuenta",

        accountId: "Dirección de cartera:"
    },
    exportWallet: {
        label: "Exportar cartera",

        buttonExportScreen: "Exportar cartera en pantalla",
        successCopy: "Copiado exitosamente",

        modal: {
            secretKeyLabel: "Llave secreta",
            addressLabel: "Dirección de cartera",
        },
    },
    pinCode: {
        label: "Código pin",
        enterPin: "Ingrese su código pin",
        enterPinRepeat: "Repita ingresar pin",

        confirmSetPassword: {
            label: "Confirmar",
            message: "¿Estás seguro de que quieres establecer un código pin?",
        },
        useFingerprintScanner: {
            label: "Escáner de huellas digital",
            message: "¿Le gustaría usar su huella digital para desbloquear la aplicación?",

            title: "Autenticación\nrequerida",
            cancelButton: "Cancelar",
        },
        errors: {
            passwordMismatch: "Contraseña no coincide",
        },
        success: {
            setupPinCode: "Contraseña establecida correctamente",
        },
        successSetupPassword: {
            title: "Notificación",
            message: "El código pin se ha instalado correctamente",
        },
    },
    modalApplicationLock: {
        title: "Ingrese el código pin",

        fingerprintScannerTitle: "Autenticación\nrequerida",
        fingerprintScannerCancelButton: "el código pin",
    },

    header: {
        account: "Cuenta",
        security: "Seguridad",
        preference: "Preferencias",
        support: "Apoyo",
    },
    controls: {
        send: "ENVIAR",
        receive: "RECIBIR",
        scan: "ESCANEAR",
        verify: "VERIFICAR",
    },
    common: {
        confirm: "Confirmar",
        cancel: "Cancelar"
    },
    popUpInformation: {
        close: "Cerrar",
        confirm: "Confirmar",
    },
    locale: {

        popUpLabel: "Elige lengua",
    },

}
