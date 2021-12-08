import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity, Linking,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import moment from "moment";
import urls from "../../../../../constants/urls";
import {convertorNumber} from "../../../../../helpers/convertor";

const Informations = (props) => {
  const {
    transaction
  } = props;

  const _dateTime = () => {
    const date = (transaction.date + 946684800) * 1000;

    return moment(date).format("MM/DD/YYYY HH:mm:ss")
  }
  const openListBlockChain = async () => {
    await Linking.openURL(`${ urls.linkBlockChain }${ transaction.hash }`)
  }

  return (
    <View>

      <View style={styles.rowSmall}>
        <Text style={styles.rowSmallLabel}>
          { allTranslations(localization.transactionDetails.information.send) }
        </Text>
        <Text style={styles.rowSmallValue}>
          { convertorNumber((transaction.Amount / 1000000), 2, '.') } ECH
        </Text>
      </View>
      <View style={styles.rowSmall}>
        <Text style={styles.rowSmallLabel}>
          { allTranslations(localization.transactionDetails.information.destinationAccount) }
        </Text>
        <Text style={styles.rowSmallValue}>{ transaction.Destination }</Text>
      </View>
      <View style={styles.rowSmall}>
        <Text style={styles.rowSmallLabel}>
          { allTranslations(localization.transactionDetails.information.transactionConfirmation) }
        </Text>
        <Text style={styles.rowSmallValue}>
          { _dateTime() }
        </Text>
      </View>
      <View style={styles.rowSmall}>
        <Text style={styles.rowSmallLabel}>
          { allTranslations(localization.transactionDetails.information.ledgerIndex) }
        </Text>
        <Text style={styles.rowSmallValue}>{ transaction.ledger_index }</Text>
      </View>
      <View style={styles.rowSmall}>
        <Text style={styles.rowSmallLabel}>
          { allTranslations(localization.transactionDetails.information.fromAccount) }
        </Text>
        <Text style={styles.rowSmallValue}>{ transaction.Account }</Text>
      </View>
      <View style={styles.rowSmall}>
        <Text style={styles.rowSmallLabel}>
          { allTranslations(localization.transactionDetails.information.sequenceNumber) }
        </Text>
        <Text style={styles.rowSmallValue}>{ transaction.Sequence }</Text>
      </View>

      <TouchableOpacity style={styles.buttonBlockExplorer} onPress={openListBlockChain}>
        <Text style={styles.buttonBlockExplorerLabel}>
          { allTranslations(localization.transactionDetails.information.blockExplorer) }
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
  },
  rowLabel: {
    fontSize: 15,
    color: "#FFB800",
    textTransform: "uppercase"
  },
  rowValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 15,
    color: "#C1C7D0"
  },

  rowSmall: {
    marginBottom: 26
  },
  rowSmallLabel: {
    fontSize: 15,
    color: "#FFB800",
    textTransform: "uppercase"
  },
  rowSmallValue: {
    color: "#C1C7D0",
    fontSize: 12,
    marginTop: 2
  },

  buttonBlockExplorer: {
    height: 58,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 184, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  buttonBlockExplorerLabel: {
    fontSize: 20,
    color: "#FFFFFF"
  },

});

export default Informations
