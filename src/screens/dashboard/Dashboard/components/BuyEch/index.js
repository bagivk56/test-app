import React from "react";
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import urls from "../../../../../constants/urls";

const BuyEch = () => {

  const handleRoute = async () => {
    await Linking.openURL(urls.linkECHOnline);
  }

  return (
    <TouchableOpacity style={styles.root} onPress={handleRoute} activeOpacity={0.6}>

      <Text style={styles.label}>
        { allTranslations(localization.dashboard.buyEch.label) }
      </Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  root: {
    height: 57,

    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 184, 0, 0.2)",

    justifyContent: "center",
    alignItems: "center"
  },

  label: {
    fontSize: 20,
    lineHeight: 20,
    color: "#FFFFFF"
  }

});

export default BuyEch
