import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  Header,
  Modalize,
  HeaderNavigation,
} from "../../../components";
import Clipboard from "@react-native-clipboard/clipboard";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";


class ExportWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.refModalize = React.createRef();
  }

  componentDidMount = () => {
  };


  exportWallet = () => {
    this.refModalize.current.open();
  };

  _copy = async (message) => {
    await Clipboard.setString(message);

    Notification.send({
      message: allTranslations(localization.exportWallet.successCopy),
      type: "success"
    })
  };

  render() {
    const {
      wallet,
    } = this.props;

    return (
      <View style={styles.root}>

        <Header />

        <View style={{ marginTop: 20 }} />

        <HeaderNavigation
          label={allTranslations(localization.exportWallet.label)}
        />

        <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 24 }}>

          <TouchableOpacity style={styles.button} onPress={this.exportWallet} activeOpacity={0.8}>
            <Text style={styles.buttonLabel}>
              {allTranslations(localization.exportWallet.buttonExportScreen)}
            </Text>
          </TouchableOpacity>

        </ScrollView>


        <Modalize innerRef={this.refModalize}>
          <View style={styles.contentExport}>
            <View style={styles.contentExportRow}>
              <Text style={styles.contentExportRowLabel}>
                {allTranslations(localization.exportWallet.modal.secretKeyLabel)}:
              </Text>
              <TouchableOpacity onPress={() => this._copy(wallet?.seed)}>
                <Text style={styles.contentExportRowValue} numberOfLines={1}>
                  {wallet?.seed}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 10,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 184, 0, 0.2)",
  },
  buttonLabel: {
    fontSize: 20,
    lineHeight: 22,
    color: "#FFFFFF",
  },

  content: {},


  contentExport: {
    padding: 24,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "white",
  },
  contentExportRow: {
    display: "flex",
    marginTop: 12,
  },
  contentExportRowLabel: {
    fontSize: 20,
    lineHeight: 20,
    color: "black",
    opacity: 0.8,
    marginRight: 12,
  },
  contentExportRowValue: {
    fontSize: 16,
    lineHeight: 16,
    color: "#FFB800",
    flex: 1,
    marginTop: 8
  },
});

export default ExportWallet;
