import React from "react";
import {
  StyleSheet,
} from "react-native/index";
import {
  View,
} from "react-native-ui-lib";
import {
  Portal,
} from "react-native-portalize";
import LoadSpinner from "../LoadSpinner";

const ModalLoading = (props) => {
  const { open } = props;

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <View style={styles.blurViewContainer}>
        <LoadSpinner
          color="rgba(0,0,0,0)"
        />
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  blurViewContainer: {
    flex: 1,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 184, 0, 0.8)",
  }
});

export default ModalLoading;
