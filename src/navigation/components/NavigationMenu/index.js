import React, { PureComponent } from "react";
import {
  Image, Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  View,
  Text,
} from "react-native-ui-lib";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
} from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";

class NavigationMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onRoute = (route, isFocused) => {
    const event = this.props.navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      this.props.navigation.navigate(route.name);
    }
  };

  _getTitle = (name) => {
    switch (name) {
      case "Dashboard": {
        return allTranslations(localization.navigation.dashboard);
      }
      case "Wallet": {
        return allTranslations(localization.navigation.wallet);
      }
      case "Browser": {
        return allTranslations(localization.navigation.browser);
      }
      case "Trading": {
        return allTranslations(localization.navigation.trading);
      }
      case "Account": {
        return allTranslations(localization.navigation.account);
      }
    }
  };
  _getIcon = (name) => {
    switch (name) {
      case "Dashboard": {
        return NavigationDashboardIcon;
      }
      case "Wallet": {
        return NavigationWalletIcon;
      }
      case "Browser": {
        return NavigationBrowserIcon;
      }
      case "Trading": {
        return NavigationTradingIcon;
      }
      case "Account": {
        return NavigationSettingsIcon;
      }
    }
  };

  _stylesSafeAreaView = () => {
    const insets = useSafeAreaInsets();
    let styles = { backgroundColor: "white" };

    console.log("insets: ", insets);

    if (Platform.OS === "ios") {
      styles.marginBottom = -16;
    }

    return styles;
  };

  render() {
    const { state } = this.props;

    return (

      <SafeAreaInsetsContext.Consumer>
        {(insets) => {

          let bottom = 0;
          if (insets.bottom > 0) {
            bottom = 16;
          }

          return (
            <View style={[styles.root, { paddingBottom: bottom + 15 }]}>

              {
                state.routes.map((route, index) => {
                  const isFocused = state.index === index;
                  const IconComponent = this._getIcon(route.name);
                  const title = this._getTitle(route.name);
                  const isDisabled = Boolean(route.name === "");

                  return (
                    <TouchableOpacity
                      key={`tab-navigation-${index}`}
                      style={styles.button}
                      disabled={isDisabled}
                      onPress={() => this.onRoute(route, isFocused)}
                    >
                      <View style={styles.buttonIcon}>
                        <IconComponent isFocus={isFocused} />
                      </View>
                      <Text style={[styles.buttonLabel, isFocused && { color: "#282828" }]}>{title}</Text>
                    </TouchableOpacity>
                  );
                })
              }

            </View>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const spacingItems = 0;
const styles = StyleSheet.create({

    root: {
      borderTopWidth: 1,
      borderColor: "#C8CCD5",
      borderStyle: "solid",

      paddingVertical: 15,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      marginLeft: -spacingItems,
    },

    button: {
      flex: 1,
      marginLeft: spacingItems,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonIcon: {
      justifyContent: "center",
      alignItems: "center",

      width: 30,
      height: 30,

      marginBottom: 4,
    },
    buttonLabel: {
      fontSize: 13,
      lineHeight: 16,
      textAlign: "center",
      color: "#8E8E8E",
    },
  },
);

export default NavigationMenu;
