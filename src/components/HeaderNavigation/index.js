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
import { useNavigation } from "@react-navigation/native";

const HeaderNavigation = (props) => {
  const {
    label
  } = props;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.root}>

      <TouchableOpacity style={styles.buttonGoBack} onPress={handleGoBack}>
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          source={require("../../assets/png/navigation/arrow-circle-left.png")}
        />
      </TouchableOpacity>

      <Text style={styles.label}>
        { label }
      </Text>

      <View style={styles.buttonGoBack}/>

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
     height: 40,
    flexDirection: "row",
    paddingHorizontal: 28
  },
  buttonGoBack: {
    width: 32,
    height: 32,
  },
  label: {
    flex: 1,
    fontSize: 20,
    color: "white",
    textAlign: "center"
  }
});

export default HeaderNavigation
