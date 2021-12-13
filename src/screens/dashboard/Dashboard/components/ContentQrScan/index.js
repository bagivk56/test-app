import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text,
    Button
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import {convertorNumber} from "../../../../../helpers/convertor";

const ContentQrScan = (props) => {
  const {
    data
  } = props;

  return (
    <>

      {Boolean(data?.type === "seed") && (
          <ScannedCash {...data}/>
      )}

      {Boolean(data?.type === "address") && (
          <ScannedAddress {...data}/>
      )}

    </>
  )
}

const ScannedCash = (props) => {
  const {
    balanceXrp,
    onSend,
    onCancel
  } = props;

  return (
    <View style={{ paddingHorizontal: 18 }}>

      <Text style={styles.label}>
        { allTranslations(allTranslations(localization.qrScan.escobarCashNoteScanned)) }
      </Text>

      <View style={styles.row}>
        <Text style={styles.labelBigYellow}>
          { allTranslations(localization.qrScan.scannedCash.balance) }
        </Text>
        <Text style={styles.valueBigWhite}>{ convertorNumber(balanceXrp, 2, '.') } ECH</Text>
      </View>

      <Button
          style={{ marginTop: 24 }}
          label={allTranslations(Boolean(+balanceXrp === 0) ? localization.qrScan.ok : localization.qrScan.moveECHToWallet)}
          onPress={() => {

            if (+balanceXrp === 0) {
              return onCancel()
            }

            onSend()

          }}
      />

    </View>
  )
}
const ScannedAddress = (props) => {
  const {
    value,
    onSend
  } = props;

  return (
    <View style={{ paddingHorizontal: 18 }}>

      <Text style={[styles.label, {textAlign: "center"}]}>
        { allTranslations(allTranslations(localization.qrScan.walletAddressScanned)) }
      </Text>


      <Text style={[styles.label, {color: "#ABCE30", textAlign: "center"}]}>
        { value }
      </Text>

      <Button
          style={{ marginTop: 24 }}
          label={allTranslations(localization.qrScan.buttonSend)}
          onPress={() => onSend()}
      />

    </View>
  )
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  label: {
    fontSize: 22,
    color: "#C1C7D0",
    marginBottom: 24
  },

  labelBigYellow: {
    fontSize: 25,
    lineHeight: 25,
    color: "#FFB800"
  },
  valueBigWhite: {
    fontSize: 20,
    lineHeight: 20,
    color: "white",
    flex: 1,
    textAlign: "right"
  }

});

export default ContentQrScan
