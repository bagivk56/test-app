import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  Header,
  HeaderNavigation
} from "../../../components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";

class SecurityMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
  };

  _routePinCode = () => {
    this.props.navigation.navigate("PinCode");
  }
  _routeImportWallet = () => {
    this.props.navigation.navigate("ImportWallet");
  }
  _routeExportWallet = () => {
    this.props.navigation.navigate("ExportWallet");
  }

  render() {
    return (
      <View style={styles.root}>

        <Header/>

        <View style={{marginTop: 24}}/>

        <HeaderNavigation
          label={allTranslations(localization.header.security)}
        />

        <ScrollView contentContainerStyle={{paddingVertical: 20}}>

          {
            Boolean(false) && (
              <>
                <View style={styles.separate}/>
                <View style={styles.row}>
                  <Text style={styles.rowLeft}>
                    { allTranslations(localization.security.emailConfirmation) }
                  </Text>
                  <Text style={styles.rowRight}>
                    { allTranslations(localization.security.off) }
                  </Text>
                </View>
              </>
            )
          }
          <View style={styles.separate}/>
          <TouchableOpacity activeOpacity={0.8} onPress={this._routePinCode} style={styles.row}>
            <Text style={styles.rowLeft}>
              { allTranslations(localization.security.pinCode) }
            </Text>
          </TouchableOpacity>
          <View style={styles.separate}/>
          <TouchableOpacity activeOpacity={0.8} onPress={this._routeExportWallet} style={styles.row}>
            <Text style={styles.rowLeft}>
              { allTranslations(localization.security.exportWallet) }
            </Text>
          </TouchableOpacity>
          <View style={styles.separate}/>
          <TouchableOpacity activeOpacity={0.8} onPress={this._routeImportWallet} style={styles.row}>
            <Text style={styles.rowLeft}>
              { allTranslations(localization.security.importWallet) }
            </Text>
          </TouchableOpacity>
          <View style={styles.separate}/>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black"
  },
  separate: {
    height: 1,
    backgroundColor: "#FFB800"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18
  },
  rowLeft: {
    fontSize: 20,
    color: "#FFFFFF",
    width: "70%"
  },
  rowRight: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#CD5254",
    borderRadius: 10,
    fontSize: 12,
    lineHeight: 12,
    color: "white"
  },
});

export default SecurityMenu;
