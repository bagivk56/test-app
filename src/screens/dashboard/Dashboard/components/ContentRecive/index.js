import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getQrCodeUrl } from "../../../../../common/QrCode";
import Clipboard from "@react-native-clipboard/clipboard";
import Notification from "../../../../../common/Notification";
import { compose } from "recompose";
import { connect } from "react-redux";

const ContentRecive = (props) => {
  const {
    wallet
  } = props;

  const _copyAddress = async () => {
    await Clipboard.setString(wallet?.address);

    Notification.send({
      message: allTranslations(localization.receiveAmount.successCopyAddress),
      type: "success"
    })
  }

  return (
    <>

      <Text style={styles.addressTitle}>
        {allTranslations(localization.receiveAmount.addressTitle)}
      </Text>
      <TouchableOpacity onPress={_copyAddress} style={{justifyContent: "center", alignItems: "center"}}>
        <Text style={styles.addressValue} numberOfLines={1}>
          { wallet?.address }
        </Text>
      </TouchableOpacity>
      <Text style={styles.addressTapCopy}>
        {allTranslations(localization.receiveAmount.tapToCopy)}
      </Text>
      <View style={{alignItems: "center"}}>
        <TouchableOpacity style={styles.addressQrCode} onPress={_copyAddress} activeOpacity={0.8}>
          <Image
            style={{width: "100%",height: "100%"}}
            resizeMode="contain"
            source={{uri: getQrCodeUrl({data: wallet?.address, size: 244, opacity: 0.6})}}
          />
        </TouchableOpacity>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black"
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingVertical: 22,
  },

  addressTitle: {
    fontSize: 22,
    textAlign: "center",
    color: "#C1C7D0",
    marginBottom: 8
  },
  addressValue: {
    fontSize: 14,
    color: "#ABCE30"
  },
  addressTapCopy: {
    fontSize: 18,
    textAlign: "center",
    color: "#5E5E5E",
    marginTop: 40
  },
  addressQrCode: {
    width: 200,
    height: 200,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginTop: 18,
    padding: 0,
    overflow: "hidden"
  }
});

export default compose(
  connect(
    state => ({
      wallet: state?.globalState?.wallets
    }),
    dispatch => ({}),
  ),
)(ContentRecive)
