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
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <View>

      <Text style={styles.title}>
        { allTranslations(localization.transactionDetails.header.title) }
      </Text>

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navigationButton} onPress={handleGoBack} activeOpacity={0.8}>
          <Image
            source={require("../../../../../assets/png/navigation/arrow-circle-left.png")}
            style={{width: "100%", height: "100%"}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.navigationLabel}>
          { allTranslations(localization.transactionDetails.header.payment) }
        </Text>
        <View style={styles.navigationButton}/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  root: {},

  title: {
    fontSize: 16,
    textAlign: "center",
    color: "#C1C7D0",

    marginBottom: 21
  },

  navigation: {
    flexDirection: "row",
    alignItems: "center"
  },
  navigationButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  navigationLabel: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    flex: 1
  }

});

export default Header
