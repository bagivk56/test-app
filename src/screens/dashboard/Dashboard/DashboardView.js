import React, {Component} from "react";
import {
    View,
    StyleSheet,
    ScrollView,
} from "react-native/index";
import {
    Text,
    Button,
} from "react-native-ui-lib";
import {
    Header,
    Controls,
    ModalCamera,
    ModalLoading,
    Modalize
} from "../../../components";
import {
    InfoWallet as InfoWalletComponent,
    BuyEch as BuyEchComponent,

    TransactionHistory as TransactionHistoryComponent,
    ContentSend as ContentSendComponent,
    ContentRecive as ContentReciveComponent,
    ContentVerify as ContentVerifyComponent,
    ContentQrScan as ContentQrScanComponent
} from "./components";
import Notification from "../../../common/Notification";
import getClientXrpl, {createTransaction, getTransactionList} from "../../../utils/client/client";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import {isValidAddress, isValidSecret} from "xrpl/dist/npm/utils";
import {getWalletSeed} from "../../../utils/wallet-import/getWallets";
import {getBalances} from "xrpl/dist/npm/sugar";
import {convertorNumber} from "../../../helpers/convertor";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],

            qrScanData: {},
            sendTransactionData: {},

            view: "transaction", // transaction || transfer-send || receive || verify || qr-scan
            initalAddress: "",

            isOpenQrScan: false,
            isModalLoading: false
        };

        this.refModalize = React.createRef();
        this.refModalizeConfirmTransaction = React.createRef();
    }

    componentDidMount = async () => {

        await this.setState({view: "transaction"});

        await this.updateBalance();
        await this.getListTransactions();

        this.props.navigation.addListener("focus", async () => {

            await this.setState({view: "transaction"});

            await this.updateBalance();
            await this.getListTransactions();
        });
    };

    updateBalance = async () => {
        if (!this.props.navigation.isFocused()) {
            return null
        }

        const client = await getClientXrpl();
        const balanceXrp = await client.getXrpBalance(this?.props?.wallets?.address).catch((err) => {
            return 0;
        });

        this.props.updateWallets({
            ...this?.props?.wallets,
            balance: balanceXrp,
        });

        setTimeout(async () => {
            await this.updateBalance();
        }, 10 * 1000);
    };
    getListTransactions = async () => {

        if (!this.props.navigation.isFocused()) {
            return null
        }

        const walletAddress = this.props?.wallets?.address || "";

        const list = await getTransactionList({
            address: walletAddress,
        });

        this.setState({
            transactions: list,
        });


        setTimeout(async () => {
            await this.getListTransactions();
        }, 10 * 1000);
    };


    sendTransaction = async (data, isConfirm) => {
        const {
            address,
            amount,
        } = data;

        if (!isConfirm) {
            this.refModalizeConfirmTransaction.current.open();

            this.setState({ sendTransactionData: data });

            return null
        }
        this.refModalizeConfirmTransaction.current.close();

        await this.setState({isModalLoading: true});

        const transaction = await createTransaction({
            address,
            amount,
        });
        if (transaction.error) {
            await this.setState({isModalLoading: false});

            Notification.send({
                title: transaction?.error?.message,
                type: "danger"
            })

            return null
        }

        if (!transaction?.result?.hash) {
            await this.setState({isModalLoading: false});

            Notification.send({
                message: allTranslations(localization.dashboard.errors.errorSendTransaction),
                type: "danger"
            })

            return null
        }

        await this.updateBalance();
        await this.getListTransactions();

        Notification.send({
            message: allTranslations(localization.dashboard.success.successSendTransaction),
            type: "success"
        })

        await this.setState({isModalLoading: false});

    };
    cancelSendTransaction = () => {
        this.refModalizeConfirmTransaction.current.close();
    }

    openQrScan = () => {
        this.setState({isOpenQrScan: true});
    }
    closeQrScan = () => {
        this.setState({isOpenQrScan: false});
    }
    eventQrScan = async (event) => {
        await this.closeQrScan();

        const data = event.data;
        const isAddress = Boolean((data[0] === "r") && isValidAddress(data));
        if (isAddress) {
            this.setState({
                qrScanData: {
                    type: "address",
                    value: data,
                    onSend: this.sendAmount.bind(this)
                }
            })

            return null
        }

        const isSeed = Boolean((data[0] === "s") && isValidSecret(data));
        if (isSeed) {

            const wallet = await getWalletSeed({seed: data});
            const walletAddress = wallet.address;
            const client = await getClientXrpl();
            const balanceXrp = await client.getXrpBalance(walletAddress).catch((err) => {
                return 0;
            });

            this.setState({
                qrScanData: {
                    type: "seed",
                    value: data,
                    balanceXrp,
                    onSend: this.sendAmountFromCash.bind(false),
                    onCancel: this.sendAmountFromCashCancel.bind(false),
                }
            })

            return null
        }

        Notification.send({
            type: "danger",
            message: allTranslations(localization.qrScan.errorScann)
        })
    }


    sendAmountFromCash = async (isConfirm) => {

        if (!isConfirm) {
            this.refModalize.current.open();

            return null
        }
        this._closeModalize();

        this.setState({isModalLoading: true});

        const {
            wallets
        } = this.props;
        const {
            qrScanData
        } = this.state;
        const {
            value
        } = qrScanData;


        const wallet = await getWalletSeed({seed: value});
        const walletAddress = wallet.address;
        const client = await getClientXrpl();
        const balanceXrp = await client.getXrpBalance(walletAddress).catch((err) => {
            return 0;
        });

        const walletAccount = {
            ...wallet,
            address: wallet.address
        }

        const response = await createTransaction({
            amount: balanceXrp,
            address: wallets.address,
            walletInit: walletAccount
        })

        await this.updateBalance();

        this.setState({isModalLoading: false});
    }
    sendAmountFromCashCancel = async () => {
        this.setState({ qrScanData: {} });
    }

    sendAmount = async () => {
        this.setState({
            view: "transfer-send",
            initalAddress: this.state.qrScanData?.value
        })
    }

    changeView = async (view) => {
        await this.setState({view});

        if (view === "qr-scan") {
            this.setState({isOpenQrScan: true});
        }
    }

    _routeTransactionDetails = (transaction) => {
        this.props.navigation.navigate("TransactionDetails", {
            transaction
        });
    };
    _closeModalize = () => {
        this.refModalize.current.close();
    }

    render() {
        const {
            transactions,
            view,
            initalAddress,

            qrScanData,

            isOpenQrScan,
            isModalLoading,
        } = this.state;
        const {
            wallets
        } = this.props;

        return (
            <View style={styles.root}>

                <Header
                    onLogoTap={() => this.setState({view: "transaction"})}
                />

                <ScrollView contentContainerStyle={styles.scrollView}>

                    <InfoWalletComponent/>

                    <View style={{marginTop: 18}}/>

                    <Controls
                        active={view}
                        onChange={this.changeView}
                    />

                    <View style={{marginTop: 18}}/>

                    <BuyEchComponent/>

                    <View style={{marginTop: 40}}/>


                    <>

                        {Boolean(view === "transaction") && (
                            <TransactionHistoryComponent
                                routeTransactionDetails={this._routeTransactionDetails}
                                transactions={transactions}
                                wallet={wallets}
                            />
                        )}

                        {Boolean(view === "transfer-send") && (
                            <ContentSendComponent
                                onSend={this.sendTransaction}
                                initalAddress={initalAddress}
                                wallet={wallets}
                            />
                        )}

                        {Boolean(view === "receive") && (
                            <ContentReciveComponent/>
                        )}

                        {Boolean(view === "verify") && (
                            <ContentVerifyComponent/>
                        )}


                        {Boolean(view === "qr-scan") && (
                            <ContentQrScanComponent
                                data={qrScanData}
                            />
                        )}


                    </>

                </ScrollView>


                {
                    Boolean(isOpenQrScan) && (
                        <ModalCamera
                            open={true}

                            onBarCodeRead={this.eventQrScan}
                            onClose={this.closeQrScan}
                        />
                    )
                }

                <ModalLoading
                    open={isModalLoading}
                />


                <Modalize innerRef={this.refModalize}>
                    <View style={styles.confirm}>
                        <Text style={styles.confirmLabel}>
                            {allTranslations(localization.transferSend.confirm.title)}
                        </Text>
                        <Text style={styles.confirmMessage}>
                            {allTranslations(localization.qrScan.scannedCash.messageConfirm, {
                                balance: convertorNumber(qrScanData.balanceXrp, 2, '.')
                            })}
                        </Text>
                        <View style={styles.confirmControls}>
                            <Button
                                label={allTranslations(localization.common.confirm)}
                                style={styles.confirmButtonSuccess}
                                onPress={() => this.sendAmountFromCash(true)}
                            />
                            <Button
                                label={allTranslations(localization.common.cancel)}
                                style={styles.confirmButtonCancel}
                                onPress={this._closeModalize}
                            />
                        </View>
                    </View>
                </Modalize>

                <Modalize innerRef={this.refModalizeConfirmTransaction}>
                    <View style={styles.confirm}>
                        <Text style={styles.confirmLabel}>
                            {allTranslations(localization.transferSend.confirm.title)}
                        </Text>
                        <Text style={styles.confirmMessage}>
                            {allTranslations(localization.transferSend.confirm.message, {
                                amount: this.state.sendTransactionData?.amount,
                                address: this.state.sendTransactionData?.address,
                            })}
                        </Text>
                        <View style={styles.confirmControls}>
                            <Button
                                label={allTranslations(localization.common.confirm)}
                                style={styles.confirmButtonSuccess}
                                onPress={() => this.sendTransaction(this.state.sendTransactionData, true)}
                            />
                            <Button
                                label={allTranslations(localization.common.cancel)}
                                style={styles.confirmButtonCancel}
                                onPress={this.cancelSendTransaction}
                            />
                        </View>
                    </View>
                </Modalize>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#000000",
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 26,
        paddingVertical: 22,
    },

    modalizeContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 16
    },



    confirm: {
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 16,
        paddingTop: 36
    },
    confirmLabel: {
        fontSize: 25,
        lineHeight: 30,
        fontWeight: "500",
        color: "#282828",
        textAlign: "center",
        marginBottom: 24
    },
    confirmMessage: {
        fontSize: 14,
        lineHeight: 23,
        color: "#8E8E8E",
        marginBottom: 16
    },
    confirmControls: {
        flexDirection: "row",
        marginLeft: -12
    },
    confirmButtonSuccess: {
        flex: 1,
        backgroundColor: "#ABCE30",
        borderColor: "#ABCE30",
        marginLeft: 12
    },
    confirmButtonCancel: {
        flex: 1,
        backgroundColor: "#CD5254",
        borderColor: "#CD5254",
        marginLeft: 12
    },
});

export default Dashboard;
