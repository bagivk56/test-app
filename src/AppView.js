import React, { Component } from "react";
import {
  Text,
  View,
  AppState,
  Platform,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
} from "react-native/index";
import { compose } from "recompose";
import { connect } from "react-redux";
import Navigation from "./navigation";
import { clearAll, getItem, setItem } from "./common/Storage";
import {
  SafeAreaProvider,
} from "react-native-safe-area-context";
import "./theme/theme-manager";
import {
  FlashMessage as FlashMessageComponent,
  LoadingApp as LoadingAppComponent,
  WelcomeScreen as WelcomeScreenComponent
} from "./components";
import { Host } from "react-native-portalize";
import FlashMessage from "react-native-flash-message";
import { getWalletNew } from "./utils/wallet-import/getWallets";
import {
   updateWallets,
    updateLanguage
} from "./state/GlobalState";
import getClientXrpl from "./utils/client/client";
import ModalApplicationLock from "./components/ModalApplicationLock";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verificationCode: "",

      isLoading: true,
      isLockApp: false,
      isBackground: false,
      isShowStartApp: false
    };

    this.refRootContainer = React.createRef();
    this.appState = React.createRef(AppState.currentState);

    this.timeOutStartBlockApp = null;
  }

  componentDidMount = async () => {
    // await clearAll();

    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;

    await this.initLockApp();
    await this.initWallets();
    await this.setLanguage();

    // Запуск приложения
    this.setState({ isLoading: false });

  };

  // Получение списка кошелька (на момент старта всего один)
  initWallets = async () => {
    const wallets = await getItem("wallets");

    if (!wallets) {
      await this.setState({ isShowStartApp: true })

      return null
    }

    let walletsParse = JSON.parse(wallets);
    const client = await getClientXrpl();
    const balanceXrp = await client.getXrpBalance(walletsParse?.address).catch((err) => {
      return 0
    });

    walletsParse.balance = balanceXrp;

    this.props.updateWallets(walletsParse);
  }

  setLanguage = async () => {
    const language = await getItem("language");

    this.props.updateLanguage(language || "en-EN");
  }

  // Создание кошелька если нет у пользователя (через WelcomeScreenComponent)
  createWalletAccount = async (locale) => {

    await this.setState({ isLoading: true });

    let wallet = await getWalletNew();

    this.props.updateWallets(wallet);
    this.props.updateLanguage(locale);


    await this.setState({
      isLoading: false,
      isShowStartApp: false
    });
  }

  // Инит
  initLockApp = async () => {
    const pinCode = await getItem("pin-code");

    this.setState({
      isLockApp: Boolean(pinCode)
    })
  }


  onLockApp = async () => {
    this.setState({
      isLockApp: false
    })
  }

  render() {
    const { isLoading, isLockApp, isShowStartApp } = this.state;
    const { account } = this.props;

    if (isLoading) {
      return (
        <LoadingAppComponent />
      );
    }
    if (isShowStartApp) {
      return (
        <>
          <StatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content"/>
          <WelcomeScreenComponent
            onStart={this.createWalletAccount}
          />
        </>
      )
    }

    return (
      <View
        ref={this.refRootContainer}
        style={{ flex: 1 }}
      >

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "height" : "height"}
          style={{ flex: 1 }}
        >
          <Host style={{ flex: 1 }}>
            <SafeAreaProvider>
              <Navigation />
            </SafeAreaProvider>
          </Host>
        </KeyboardAvoidingView>

        {
            Boolean(isLockApp) && (
                <ModalApplicationLock
                    open={isLockApp}
                    onNext={this.onLockApp}
                />
            )
        }

        <FlashMessage
          position="bottom"
          MessageComponent={FlashMessageComponent}
          hideOnPress={true}
        />

      </View>
    );
  }

}

export default compose(
  connect(
    state => ({}),
    dispatch => ({
      updateWallets: (wallets) => dispatch(updateWallets(wallets)),
      updateLanguage: (lang) => dispatch(updateLanguage(lang)),
    }),
  ),
)(App);
