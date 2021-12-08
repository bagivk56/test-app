import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native/index';
import {
    Text,
    Button
} from "react-native-ui-lib";
import {
    Header,
    HeaderNavigation,
    VirtualKeyboard,
    Modalize,
    PopUpInformation
} from "../../../components";
import {setItem} from "../../../common/Storage";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import FingerprintScanner from "react-native-fingerprint-scanner";

class PinCode extends Component {
    constructor(props) {
        super(props);

        this.state = {

            value: "",

            pinCode: "",
            pinCodeRepeat: "",

            isConfirmPinCode: false

        };

        this.refConfiormSetPassword = React.createRef();
        this.refUseFingerprintScanner = React.createRef();
        this.refVirtualKeyboard = React.createRef();
        this.refPopUpInformation = React.createRef();
    }

    componentDidMount = () => {
    }

    changePassword = async (value) => {

        await this.setState({ value });

        if (value.length === 4 && !this.state.isConfirmPinCode) {
            this.setState({
                isConfirmPinCode: true,
                pinCode: value,
                value: ""
            })

            this.refVirtualKeyboard.current.state.text = "";

            return null
        }
        if (value.length === 4 && this.state.isConfirmPinCode) {
            await this.setState({
                pinCodeRepeat: value,
                value: ""
            });

            this.refVirtualKeyboard.current.state.text = "";

            if (this.state.pinCode !== this.state.pinCodeRepeat) {
                await this.setState({
                    pinCode: "",
                    pinCodeRepeat: "",
                    value: "",
                    isConfirmPinCode: false
                });

                Notification.send({
                    message: allTranslations(localization.pinCode.errors.passwordMismatch),
                    type: "danger"
                });

                return null
            }

            this.refConfiormSetPassword.current.open();
        }
    }


    setPasswordStorage = async () => {
        const pinCode = this.state.pinCode;

        await setItem(pinCode, "pin-code");

        await this.cancelPasswordStorage();

        this.refConfiormSetPassword.current.close();
        this.refUseFingerprintScanner.current.open();
    }
    cancelPasswordStorage = async () => {
        await this.setState({
            pinCode: "",
            pinCodeRepeat: "",
            value: "",
            isConfirmPinCode: false
        });

        this.refConfiormSetPassword.current.close();
    }


    useFingerprintScanner = async () => {
        const isFingerprintScanner = await FingerprintScanner.authenticate({
            title: allTranslations(localization.pinCode.useFingerprintScanner.title),
            cancelButton: allTranslations(localization.pinCode.useFingerprintScanner.cancelButton)
        }).then(async () => {
            return true;
        }).catch(async (error) => {
            return false;
        });
        await FingerprintScanner.release();

        await setItem(String(isFingerprintScanner), "is-fingerprint-scanner");

        await this.closeFingerprintScanner();
    }
    closeFingerprintScanner = async () => {
        this.refUseFingerprintScanner.current.close();

        this.refPopUpInformation.current.open({
            title: allTranslations(localization.pinCode.successSetupPassword.title),
            message: allTranslations(localization.pinCode.successSetupPassword.message),
            onConfirm: this.routeHomePage.bind()
        });

    }

    routeHomePage = () => {
        this.props.navigation.navigate("DashboardHome");
    }

    render() {
        const {
            value,

            pinCode,
            pinCodeRepeat,

            isConfirmPinCode
        } = this.state;

        return (
            <View style={styles.root}>

                <Header/>

                <ScrollView contentContainerStyle={{paddingHorizontal: 24, paddingVertical: 20}}>

                    <HeaderNavigation
                        label={allTranslations(localization.pinCode.label)}
                    />

                    <View style={{marginTop: 46}}/>

                    <Text style={styles.label}>
                        { allTranslations(Boolean(!this.state.isConfirmPinCode) ? localization.pinCode.enterPin : localization.pinCode.enterPinRepeat) }
                    </Text>

                    <View style={{marginTop: 24}}/>

                    <View style={styles.pinCodeContrainer}>
                        {
                            value.split("").map((item, index) => (
                                <Text style={styles.pinCodeItem} key={`item-${ index }`}>*</Text>
                            ))
                        }
                    </View>

                    <View style={{marginTop: 24}}/>

                    <VirtualKeyboard
                        ref={this.refVirtualKeyboard}

                        color="black"
                        pressMode="string"
                        isUseBiometrics={false}

                        onPress={this.changePassword}
                    />

                </ScrollView>


                <Modalize innerRef={this.refConfiormSetPassword}>
                    <View style={styles.confirm}>
                        <Text style={styles.confirmLabel}>
                            { allTranslations(localization.pinCode.confirmSetPassword.label) }
                        </Text>
                        <Text style={styles.confirmMessage}>
                            { allTranslations(localization.pinCode.confirmSetPassword.message) }
                        </Text>
                        <View style={styles.confirmControls}>
                            <Button
                                label={allTranslations(localization.common.confirm)}
                                style={styles.confirmButtonSuccess}
                                onPress={this.setPasswordStorage}
                            />
                            <Button
                                label={allTranslations(localization.common.cancel)}
                                style={styles.confirmButtonCancel}
                                onPress={this.cancelPasswordStorage}
                            />
                        </View>
                    </View>
                </Modalize>
                <Modalize innerRef={this.refUseFingerprintScanner}>
                    <View style={styles.confirm}>
                        <Text style={styles.confirmLabel}>
                            { allTranslations(localization.pinCode.useFingerprintScanner.label) }
                        </Text>
                        <Text style={styles.confirmMessage}>
                            { allTranslations(localization.pinCode.useFingerprintScanner.message) }
                        </Text>
                        <View style={styles.confirmControls}>
                            <Button
                                label={allTranslations(localization.common.confirm)}
                                style={styles.confirmButtonSuccess}
                                onPress={this.useFingerprintScanner}
                            />
                            <Button
                                label={allTranslations(localization.common.cancel)}
                                style={styles.confirmButtonCancel}
                                onPress={this.closeFingerprintScanner}
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

    label: {
        fontSize: 30,
        lineHeight: 30,
        color: "#C1C7D0",
        textAlign: "center",
    },

    pinCodeContrainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 40
    },
    pinCodeItem: {
        fontSize: 40,
        lineHeight: 40,
        color: "#FFB800"
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

export default PinCode
