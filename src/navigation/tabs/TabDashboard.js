import React from "react";
import {
  createStackNavigator, TransitionPresets,
} from "@react-navigation/stack";
import {
  DashboardHome as DashboardHomeScreen,
  TransactionDetails as TransactionDetailsScreen,
  SecurityMenu as SecurityMenuScreen,
  ImportWallet as ImportWalletScreen,
  Account as AccountScreen,
  ExportWallet as ExportWalletScreen,
  PinCode as PinCodeScreen,
  Preference as PreferenceScreen
} from "../../screens";
import {
  store,
} from "../../store/store";

const Stack = createStackNavigator();

class TabAccount extends React.Component {
  render() {
    const options = {
      ...optionsInit,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    };

    return (
      <Stack.Navigator>
        {
          Object.keys(tabScreensAuth).map((key, idx) => {
            const screen = tabScreensAuth[key];
            const Component = screen.screen;

            return (
              <Stack.Screen
                key={`${key}-${idx}`}
                name={screen.name}
                component={Component}
                options={options}
              />
            );
          })
        }
      </Stack.Navigator>
    );
  }
}

const tabScreensAuth = {
  DashboardHome: {
    name: "DashboardHome",
    screen: DashboardHomeScreen,
    params: {
      hideHeader: true,
    },
  },
  TransactionDetails: {
    name: "TransactionDetails",
    screen: TransactionDetailsScreen,
    params: {
      hideHeader: true,
    },
  },
  SecurityMenu: {
    name: "SecurityMenu",
    screen: SecurityMenuScreen,
    params: {
      hideHeader: true,
    },
  },
  ImportWallet: {
    name: "ImportWallet",
    screen: ImportWalletScreen,
    params: {
      hideHeader: true,
    },
  },
  Account: {
    name: "Account",
    screen: AccountScreen,
    params: {
      hideHeader: true,
    },
  },
  ExportWallet: {
    name: "ExportWallet",
    screen: ExportWalletScreen,
    params: {
      hideHeader: true,
    },
  },
  PinCode: {
    name: "PinCode",
    screen: PinCodeScreen,
    params: {
      hideHeader: true,
    },
  },
  Preference: {
    name: "Preference",
    screen: PreferenceScreen,
    params: {
      hideHeader: true,
    },
  },
};
const optionsInit = {
  headerStyle: {
    backgroundColor: "black",
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 0,
    opacity: 0,
  },
  headerBackTitleStyle: {
    tintColor: "#black",
  },
  cardStyle: {
    backgroundColor: "black",
  },
  headerTintColor: "black",
  headerBackTitle: " ",
};

export default TabAccount;
