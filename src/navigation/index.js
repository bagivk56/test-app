import React from "react";
import {
  Linking,
  Keyboard,
  StatusBar,
} from "react-native/index";
import {
  NavigationContainer
} from "@react-navigation/native";
import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import {
  NavigationMenu as NavigationMenuComponent,
} from "./components";
import {
  ApplicationGreeting
} from "../components";
import { compose } from "recompose";
import { connect } from "react-redux";

import TabDashboard from "./tabs/TabDashboard";

const Tab = createBottomTabNavigator();

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLightStatusBar: false,
      isOpenKeyboard: false
    };

    this.refNavigationContainer = React.createRef();
  }

  navigationContainer = (props) => {
    this.updateStatusBar(props);
  }

  updateStatusBar = ({history}) => {
    const lastHistoryItem = history[history.length - 1] || {};
    const routePath = (lastHistoryItem?.key || "").split('-')[0];

    const isLightStatusBar = Boolean(lightStatusBarScreens.includes(routePath));

    if (this.state.isLightStatusBar === isLightStatusBar) {
      return null
    }

    this.setState({isLightStatusBar})
  }

  // Обработка открытия / закрытия клавиатуру
  onChangeViewKeyboard = async (isOpenKeyboard = false) => {
    await this.setState({ isOpenKeyboard });
  }


  render() {
    const { isLightStatusBar, isOpenKeyboard } = this.state;
    const isHideTabBar = Boolean(isOpenKeyboard);

    return (
      <>

        <StatusBar
          barStyle="light-content"
          backgroundColor={"rgba(255, 255, 255, 0)"}
          translucent={true}
        />

        <NavigationContainer
          ref={this.refNavigationContainer}
          onStateChange={this.navigationContainer}
        >

          <Tab.Navigator
            screenOptions={{
              tabBarVisible: false
            }}
          >

              <Tab.Screen
                name="Dashboard"
                component={TabDashboard}
              />


          </Tab.Navigator>

        </NavigationContainer>

      </>
    );
  }
}

const lightStatusBarScreens = [

];

export default compose(
  connect(
    state => ({
      global: state.globalState,
    })
  ),
)(Navigation);
