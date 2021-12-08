import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native/index";
import {
    Text
} from "react-native-ui-lib";
import Notification from "../../../../../common/Notification";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import {convertorNumber} from "../../../../../helpers/convertor";
import {compose} from "recompose";
import {connect} from "react-redux";
import Clipboard from "@react-native-clipboard/clipboard";

const InfoWallet = (props) => {
    const {
        wallets
    } = props?.global || {};
    const wallet = wallets || {};

    const handleCopyAddress = async () => {
      await Clipboard.setString(wallet?.address);

      Notification.send({
        type: "success",
        message: allTranslations(localization.receiveAmount.successCopyAddress)
      })
    }

    return (
        <TouchableOpacity onPress={handleCopyAddress} activeOpacity={0.8}>
          <View style={styles.root}>

            <Text style={styles.label}>
              {allTranslations(localization.dashboard.infoWallet.label)}
            </Text>

            <Text style={styles.balance}>
              {convertorNumber((wallet?.balance || 0), "2", ".")} ECH
            </Text>

            <Text style={styles.walletAddress}>
              {wallet?.address}
            </Text>

          </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(255, 184, 0, 0.2)",
        borderRadius: 10,

        paddingTop: 12,
        paddingBottom: 9,
    },

    label: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: "black",

        fontSize: 10,
        color: "#FFB800",
        textTransform: "uppercase",

        position: "absolute",
        top: -12,
        alignSelf: "center"
    },

    balance: {
        fontSize: 20,
        lineHeight: 22,
        color: "#FFB800",
        textAlign: "center"
    },

    walletAddress: {
        fontSize: 10,
        textAlign: "center",
        color: "#777777",
        marginTop: 3
    }
});

export default compose(
    connect(
        state => ({
            global: state.globalState
        }),
        dispatch => ({}),
    ),
)(InfoWallet)
