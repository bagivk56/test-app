import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { convertorNumber } from "../../../../../helpers/convertor";
import moment from "moment";

const TransactionHistory = (props) => {
  const {
    transactions,
    wallet
  } = props;
  return (
    <View>

      <Text style={styles.title}>
        { allTranslations(localization.dashboard.transactionHistory.title) }
      </Text>

      <View>

        {
          transactions.map((transaction, index) => (
            <>

              {Boolean(index> 0) && (
                <View style={styles.transactionItemSeparate}/>
              )}

              <TransactionItem
                transaction={transaction}
                wallet={wallet}
                onRoute={props.routeTransactionDetails}
              />

            </>
          ))
        }

      </View>

    </View>
  )
}
const TransactionItem = (props) => {
  const {
    transaction,
    wallet
  } = props;
  const isReceived = Boolean(transaction.Destination === wallet?.address);
  const image = Boolean(isReceived) ? require("../../../../../assets/png/transaction/arrow-circle-left.png") : require("../../../../../assets/png/transaction/arrow-circle-right.png");
  const amount = Number.parseFloat(transaction?.Amount || "0") / 1000000;

  const _dateTime = () => {
    const date = (transaction.date + 946684800) * 1000;

    return moment(date).format("MM/DD/YYYY HH:mm:ss")
  }

  return (
    <TouchableOpacity
      onPress={() => props.onRoute(transaction)}
      activeOpacity={0.8}
    >
      <View style={styles.transactionItem}>
        <View style={{ width: 80 }}>
          <Text style={styles.transactionItemTitle}>
            { moment(_dateTime()).format("DD.MM.YYYY") }
          </Text>
        </View>
        <View style={styles.transactionItemBody}>
          <Text style={[styles.transactionItemTitle, {flex: 1}]}>
            { convertorNumber(amount, 2, '.') } ECH
          </Text>
        </View>
        <View style={styles.transactionItemIcon}>
          <Image
            source={image}
            style={{width: "100%", height: "100%"}}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  title: {
    fontSize: 16,
    lineHeight: 16,
    color: "#C1C7D0",
    textAlign: "center",

    marginBottom: 40
  },

  transactionItem: {
    flexDirection: "row",
    paddingHorizontal: 16
  },
  transactionItemTitle: {
    fontSize: 15,
    color: "#C1C7D0"
  },
  transactionItemIcon: {
    marginLeft: "auto",

    width: 20,
    height: 20
  },
  transactionItemSeparate: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.2,
    marginVertical: 8
  },

  transactionItemBody: {
    paddingHorizontal: 12
  },

});

export default TransactionHistory
