import React from "react";
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native/index";
import {
    Text
} from "react-native-ui-lib";
import VirtualKeyboard from "../VirtualKeyboard";
import Icon from "react-native-vector-icons/FontAwesome5";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import {compose} from "recompose";
import {connect} from "react-redux";
import {getItem} from "../../common/Storage";
import PropTypes from "prop-types";
import FingerprintScanner from "react-native-fingerprint-scanner";

const heightStatusBar = getHeightStatusBar();
const {width, height} = Dimensions.get("window");

class ModalApplicationLock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            passCode: "",

            isUseBiometrics: false
        };

        this.refVirtualKeyboard = React.createRef();
        this.shakeAnimation = new Animated.Value(0);
    }

    componentDidMount = async () => {
        let isUseBiometrics = Boolean(await getItem("is-fingerprint-scanner") === "true");

        this.setState({isUseBiometrics: isUseBiometrics});

        await this.onStartBiometrics();
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.open && !prevProps.open) {
            await this.onStartBiometrics();
        }
    }

    onChangePassCode = async (passCode) => {
        await this.setState({passCode});

        if (passCode.length === 4) {
            await this.onCheckPassCode();
        }
    }
    onCheckPassCode = async () => {
        const pinCode = await getItem("pin-code");

        if (Boolean(pinCode === this.state.passCode)) {
            this.props.onNext();
        } else {
            this.refVirtualKeyboard.current.state.text = "";
            await this.setState({passCode: ""});

            Animated.sequence([
                Animated.timing(this.shakeAnimation, {toValue: 10, duration: 100, useNativeDriver: true}),
                Animated.timing(this.shakeAnimation, {toValue: -10, duration: 100, useNativeDriver: true}),
                Animated.timing(this.shakeAnimation, {toValue: 10, duration: 100, useNativeDriver: true}),
                Animated.timing(this.shakeAnimation, {toValue: 0, duration: 100, useNativeDriver: true})
            ]).start();
        }
    }

    onStartBiometrics = async () => {
        if (!Boolean(this.state.isUseBiometrics) || !this.props.open) {
            return null
        }

        FingerprintScanner.authenticate({
            title: allTranslations(localization.modalApplicationLock.fingerprintScannerTitle),
            cancelButton: allTranslations(localization.modalApplicationLock.fingerprintScannerCancelButton)
        }).then(() => {
            this.props.onNext();
        }).catch(() => {
            return null
        });
        FingerprintScanner.release();
    }

    render() {
        const {open} = this.props;
        const {passCode, isUseBiometrics} = this.state;

        if (!open) {
            return null
        }

        return (
            <View style={styles.root}>

                <View style={styles.header}>

                    {
                        Boolean(isUseBiometrics) && (
                            <TouchableOpacity
                                style={styles.buttonFingerprint}
                                onPress={this.onStartBiometrics}
                            >
                                <Icon name="fingerprint" color="white" size={40}/>
                            </TouchableOpacity>
                        )
                    }

                </View>

                <Text style={styles.title}>{allTranslations(localization.modalApplicationLock.title)}</Text>

                <View style={styles.body}>

                    <View style={styles.codeContainer}>
                        {[0, 1, 2, 3].map((value) => (
                            <View
                                key={`chart-symbol-pass-code-${value}`}
                                style={[
                                    styles.code,
                                    Boolean(passCode[value]) && styles.codeActive
                                ]}
                            />
                        ))}
                    </View>

                    <Animated.View
                        style={[
                            {transform: [{translateX: this.shakeAnimation}]},
                            {marginTop: 36}
                        ]}
                    >
                        <VirtualKeyboard
                            ref={this.refVirtualKeyboard}
                            color='black'
                            pressMode='string'
                            onPress={this.onChangePassCode}
                            rowStyle={styles.keyboardRowStyle}
                            cellStyle={styles.keyboardCellStyle}
                        />
                    </Animated.View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        backgroundColor: "black",

        paddingHorizontal: 24,
        paddingTop: heightStatusBar,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        height: 40,
        paddingVertical: 12,
        marginBottom: 32
    },

    buttonFingerprint: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontSize: 18,
        lineHeight: 20,
        color: "white",
        textAlign: "center",
        opacity: 0.8
    },

    body: {
        flex: 1,
        justifyContent: "flex-end"
    },

    codeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: -12
    },
    code: {
        width: 20,
        height: 20,
        borderRadius: 999,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "white",
        marginLeft: 12
    },
    codeActive: {
        backgroundColor: "white"
    },

    keyboardRowStyle: {},
    keyboardCellStyle: {

    }
});


ModalApplicationLock.propTypes = {
  type: PropTypes.oneOf(["entrance", "transactionSignature"])
};

ModalApplicationLock.defaultProps = {
  type: "entrance"
};

export default compose(
    connect(
        state => ({
            global: state.globalState
        })
    ),
)(ModalApplicationLock);
