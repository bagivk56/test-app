import React, {Component} from "react";
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView
} from "react-native/index";
import {
    Text,
    Button,
} from "react-native-ui-lib";
import {
    Header,
    Modalize,
    ModalLoading,
    HeaderNavigation,
    PopUpInformation
} from "../../../components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import {getWalletSeed} from "../../../utils/wallet-import/getWallets";
import getClientXrpl, {isValidSeed} from "../../../utils/client/client";

class ImportWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seed: "",

            isModalLoading: false
        };

        this.refModalizeConfirmImport = React.createRef();
        this.refPopUpInformation = React.createRef();
    }

    componentDidMount = () => {
    };

    importWallet = async (isConfirm) => {
        const {
            seed
        } = this.state;

        if (!seed) {
            Notification.send({
                message: allTranslations(localization.importWallet.errors.seedEmpty),
                type: "danger"
            })

            return null
        }

        const isValid = await isValidSeed(seed);
        if (!isValid) {
            Notification.send({
                message: allTranslations(localization.importWallet.errors.seedNotValid),
                type: "danger"
            })

            return null
        }

        if (!isConfirm) {
            this.refModalizeConfirmImport.current.open();

            return null
        }
        this.refModalizeConfirmImport.current.close();

        this.setState({isModalLoading: true});

        const walletInit = await getWalletSeed({seed: seed});
        const client = await getClientXrpl();
        const balanceXrp = await client.getXrpBalance(walletInit?.address).catch((err) => {
            return 0
        });

        const wallet = {
            ...walletInit,
            balance: balanceXrp
        };

        this.props.updateWallets(wallet);

        this.setState({isModalLoading: false});

        this.refPopUpInformation.current.open({
            title: allTranslations(localization.importWallet.popUpInfo.title),
            message: allTranslations(localization.importWallet.popUpInfo.message),
            onConfirm: this.routeHomaPage.bind()
        });

    }
    cancelImportWallet = () => {
        this.refModalizeConfirmImport.current.close();
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
    routeHomaPage = () => {
        this.props.navigation.navigate("DashboardHome");
    }

    render() {
        const {
            seed,
            isModalLoading
        } = this.state;

        return (
            <View style={styles.root}>

                <Header/>

                <View style={{marginTop: 12}}/>

                <HeaderNavigation
                    label={allTranslations(localization.importWallet.title)}
                />

                <ScrollView contentContainerStyle={{paddingVertical: 20, paddingHorizontal: 30}}>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoContainerIcon}>
                            <Image
                                source={require("../../../assets/png/wallet-import/info-circle.png")}
                                style={{width: "100%", height: "100%"}}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.infoContainerMessage}>
                            {allTranslations(localization.importWallet.message)}
                        </Text>
                    </View>

                    <TextInput
                        value={seed}
                        style={styles.input}
                        placeholder={allTranslations(localization.importWallet.secretKey)}
                        placeholderTextColor="#373737"

                        onChangeText={(seed) => this.setState({seed})}
                    />

                    <Button
                        label={allTranslations(localization.importWallet.buttonConfirm)}
                        style={styles.buttonConfirm}
                        onPress={() => this.importWallet(false)}
                    />

                    <Button
                        label={allTranslations(localization.importWallet.buttonCancel)}
                        style={styles.buttonCancel}
                        onPress={this.goBack}
                    />

                </ScrollView>


                <ModalLoading
                    open={isModalLoading}
                />


                <Modalize innerRef={this.refModalizeConfirmImport}>
                    <View style={styles.confirmImport}>
                        <Text style={styles.confirmImportLabel}>
                            {allTranslations(localization.importWallet.confirmImport.title)}
                        </Text>
                        <Text style={styles.confirmImportMessage}>
                            {allTranslations(localization.importWallet.confirmImport.message)}
                        </Text>
                        <View style={styles.confirmImportControls}>
                            <Button
                                style={styles.confirmImportButtonSuccess}
                                label={allTranslations(localization.importWallet.buttonConfirm)}
                                onPress={() => this.importWallet(true)}
                            />
                            <Button
                                style={styles.confirmImportButtonCancel}
                                label={allTranslations(localization.importWallet.buttonCancel)}
                                onPress={this.cancelImportWallet}
                            />
                        </View>
                    </View>
                </Modalize>

                <PopUpInformation
                    ref={this.refPopUpInformation}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "black"
    },

    infoContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    infoContainerIcon: {
        width: 44,
        height: 44,
        marginRight: 30
    },
    infoContainerMessage: {
        color: "#C1C7D0",
        fontSize: 15,
        flex: 1,
        opacity: 0.6
    },

    input: {
        height: 44,
        backgroundColor: "#F4F5F7",
        marginTop: 32,
        borderRadius: 10,
        paddingHorizontal: 16,

        fontSize: 18
    },

    buttonConfirm: {
        backgroundColor: "#ABCE30",
        borderColor: "#ABCE30",
        marginTop: 21
    },
    buttonCancel: {
        backgroundColor: "#CD5254",
        borderColor: "#CD5254",
        marginTop: 18
    },

    confirmImport: {
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 16,
        paddingTop: 36
    },
    confirmImportLabel: {
        fontSize: 25,
        lineHeight: 30,
        fontWeight: "500",
        color: "#282828",
        textAlign: "center",
        marginBottom: 24
    },
    confirmImportMessage: {
        fontSize: 14,
        lineHeight: 23,
        color: "#8E8E8E",
        marginBottom: 16
    },
    confirmImportControls: {
        flexDirection: "row",
        marginLeft: -12
    },
    confirmImportButtonSuccess: {
        flex: 1,
        backgroundColor: "#ABCE30",
        borderColor: "#ABCE30",
        marginLeft: 12
    },
    confirmImportButtonCancel: {
        flex: 1,
        backgroundColor: "#CD5254",
        borderColor: "#CD5254",
        marginLeft: 12
    },
});

export default ImportWallet;
