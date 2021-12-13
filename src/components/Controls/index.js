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
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";

const Controls = (props) => {
  const { active } = props;

  const handleNavigation = (path) => {
    props.onChange(path);
  }

  return (
    <View style={styles.root}>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigation("transfer-send")}>
        <View style={styles.buttonIcon}>
          <Image
            source={require("../../assets/png/controls/export.png")}
            style={[
              { width: "100%", height: "100%", tintColor: "white" },
              Boolean(active === "transfer-send") && { tintColor: "#FFB800" }
            ]}
          />
        </View>
        <Text style={[
          styles.buttonLabel,
          Boolean(active === "transfer-send") && { color: "#FFB800" }
        ]}>
          { allTranslations(localization.controls.send) }
        </Text>
      </TouchableOpacity>

      <View style={styles.separate}/>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigation("receive")}>
        <View style={styles.buttonIcon}>
          <Image
            source={require("../../assets/png/controls/import.png")}
            style={[
              { width: "100%", height: "100%", tintColor: "white" },
              Boolean(active === "receive") && { tintColor: "#FFB800" }
            ]}
          />
        </View>
        <Text style={[
          styles.buttonLabel,
          Boolean(active === "receive") && { color: "#FFB800" }
        ]}>
          { allTranslations(localization.controls.receive) }
        </Text>
      </TouchableOpacity>

      <View style={styles.separate}/>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigation("qr-scan")}>
        <View style={styles.buttonIcon}>
          <Image
            source={require("../../assets/png/controls/qrcode.png")}
            style={[
              { width: "100%", height: "100%", tintColor: "white" },
              Boolean(active === "qr-scan") && { tintColor: "#FFB800" }
            ]}
          />
        </View>
        <Text style={[
          styles.buttonLabel,
          Boolean(active === "qr-scan") && { color: "#FFB800" }
        ]}>
          { allTranslations(localization.controls.scan) }
        </Text>
      </TouchableOpacity>

      <View style={styles.separate}/>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigation("verify")}>
        <View style={styles.buttonIcon}>
          <Image
            source={require("../../assets/png/controls/check.png")}
            style={[
              { width: "100%", height: "100%", tintColor: "white" },
              Boolean(active === "verify") && { tintColor: "#FFB800" }
            ]}
            resizeMode="contain"
          />
        </View>
        <Text style={[
          styles.buttonLabel,
          Boolean(active === "verify") && { color: "#FFB800" }
        ]}>
          { allTranslations(localization.controls.verify) }
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  root: {
    flexDirection: "row",

    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
    borderRadius: 10,

    height: 90
  },

  separate: {
    width: 1,
    backgroundColor: "white",
  },

  button:  {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonIcon: {
    width: 34,
    height: 34
  },
  buttonLabel: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    marginTop: 8
  },

});

export default Controls
