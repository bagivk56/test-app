import React from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  ModalCamera
} from "../../../../../components";
import TextInputMask from "react-native-text-input-mask";
import Notification from "../../../../../common/Notification";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { isValidAddress } from "xrpl/dist/npm/utils";

const Form = (props) => {
  const { onSend, wallet, initalAddress } = props;

  const [address, setAddress] = React.useState(initalAddress || "");
  const [amount, setAmount] = React.useState("");
  const [isShowModalCamera, setIsShowModalCamera] = React.useState(false);

  const handleSubmit = () => {

    const isBigAmount = Boolean(+(wallet?.balance || "0") < +(amount || '0'));
    const isAddress = Boolean(!!address);
    const isAmount = Boolean(!!amount);

    if (!isAddress) {
      Notification.send({
        type: "danger",
        message: allTranslations(localization.transferSend.form.errorAddressEmpty)
      })

      return null
    }
    if (!isValidAddress(address)) {
      Notification.send({
        type: "danger",
        message: allTranslations(localization.transferSend.form.errorAddressNotValid)
      })

      return null
    }
    if (!isAmount) {
      Notification.send({
        type: "danger",
        message: allTranslations(localization.transferSend.form.errorAddressAmount)
      })

      return null
    }
    if (isBigAmount) {
      Notification.send({
        type: "danger",
        message: allTranslations(localization.transferSend.form.errorAddressAmountBig)
      })

      return null
    }

    onSend({
      address,
      amount
    })
  }

  const handleEventScan = (event) => {
    setAddress(event.data);
    setIsShowModalCamera(false);
  }

  return (
    <View style={styles.root}>

      <View style={styles.textInput}>
        <TextInput
          value={address}

          style={styles.textInputItem}
          placeholder={allTranslations(localization.transferSend.form.addressPlaceholder)}
          placeholderTextColor="#373737"

          onChangeText={(value) => setAddress(value)}
        />
        <TouchableOpacity style={styles.buttonQrCode} onPress={() => setIsShowModalCamera(true)}>
          <Image
            source={require("../../../../../assets/png/transfer-send/qrcode-scan.png")}
            style={{width: "100%",height: "100%"}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textInput}>
        <TextInputMask
          value={amount}

          style={styles.textInputItem}
          mask={"[99999999999999].[99999999]"}
          keyboardType="decimal-pad"
          placeholder={allTranslations(localization.transferSend.form.amountPlaceholder)}
          placeholderTextColor="#373737"

          onChangeText={(value) => setAmount(value)}
        />
      </View>

      <Button
        label={allTranslations(localization.transferSend.form.buttonSend)}
        style={styles.buttonSend}
        onPress={handleSubmit}
      />


      <ModalCamera
          open={isShowModalCamera}

          onBarCodeRead={handleEventScan}
          onClose={() => setIsShowModalCamera(false)}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  root: {},

  textInput:  {
    flexDirection: "row",
    alignItems: "center",
    height: 43,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 8,
    marginTop: 21
  },
  textInputItem: {
    flex: 1,

    fontSize: 18,
    paddingHorizontal: 0,
    paddingVertical: 0
  },

  buttonQrCode: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonSend: {
    marginTop: 28,

  }
});

export default Form
