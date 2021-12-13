import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Header,
  HeaderNavigation
} from "../../../components";
import {
  Header as HeaderComponent,
  Informations as InformationsComponent
} from "./components";


class TransactionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaction: props?.route?.params?.transaction || {}
    };
  }

  componentDidMount = () => {
  };

  render() {
    const {
      transaction
    } = this.state;

    return (
      <View style={styles.root}>

        <Header/>

        <ScrollView contentContainerStyle={styles.scrollView}>

          <HeaderComponent/>

          <View style={{marginTop: 34}}/>

          <InformationsComponent
            transaction={transaction}
          />

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

  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingVertical: 22,
  },


});

export default TransactionDetails;
