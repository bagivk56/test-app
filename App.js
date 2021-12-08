import React from "react";
import AppView from "./src/AppView";
import {View, StatusBar} from "react-native/index";
import {Provider} from "react-redux";
import {store} from "./src/store/store";
import "./src/utils/ethers/optimization";


export default function App() {
    return (
      <AppContainer/>
    );
}

const AppContainer = () => {
  return (
    <>

      <StatusBar translucent backgroundColor="black" barStyle="light-content"/>

      <Provider store={store}>

        <AppView/>

      </Provider>

    </>
  )
}
