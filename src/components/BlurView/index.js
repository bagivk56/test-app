import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";

class BlurView extends React.PureComponent {

  render() {
    return (
      <View style={styles.root}>
        { this.props.children }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(255, 184, 0, 0.8)"
  }
});

export default BlurView
