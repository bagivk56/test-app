import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,

  BackHandler
} from "react-native/index";
import { Portal } from "react-native-portalize";
import { RNCamera } from "react-native-camera";
import {

} from "../../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome5";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";

const { width } = Dimensions.get("window");
const sizeCamera = width * 0.72;
const heightStatusBar = getHeightStatusBar();

class ModalCamera extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      flashMode: "off",
    };

    this.refCamera = React.createRef();
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = (event) => {
    return true
  }

  onScanImage = () => {}

  render() {
    const {
      flashMode,
    } = this.state;
    const {
      open,
      onClose,
      onBarCodeRead,
    } = this.props;

    if (!open) {
      return null;
    }

    return (
      <Portal>
        <View style={styles.root}>
          <View style={styles.container}>
            <View style={styles.containerRow}>
              <Cell/>
            </View>
            <View style={{height: sizeCamera, flexDirection: "row"}}>
              <Cell/>
              <View style={styles.containerCamera}/>
              <Cell/>
            </View>
            <View style={styles.containerRow}>
              <Cell/>
            </View>
          </View>

          <RNCamera
            ref={this.refCamera}
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode[flashMode]}
            onBarCodeRead={onBarCodeRead}
          />

          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Icon
                name="times"
                color="black"
                size={24}
            />
          </TouchableOpacity>

        </View>
      </Portal>
    );
  }
}
class Cell extends React.PureComponent {
  render() {
    return (
      <View style={styles.containerCell}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  header: {
    paddingTop: heightStatusBar + 16,
    paddingBottom: 16,
    paddingHorizontal: 34,

    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 2,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500'
  },
  headerButtonBack: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  headerLeftContent: {
    width: 32,
    height: 32
  },
  headerRightContent: {
    width: 32,
    height: 32
  },

  container: {
    flex: 1,
    zIndex: 2
  },
  containerRow: {
    flex: 1,
    flexDirection: "row"
  },
  containerCell: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  containerCamera: {
    width: sizeCamera,
    height: sizeCamera,
    zIndex: 5
  },

  angle: {
    width: 82,
    height: 82,
    position: "absolute"
  },
  angleTopLeft: {
    top: -25,
    left: -25
  },
  angleTopRight: {
    top: -25,
    right: -25
  },
  angleBottomLeft: {
    bottom: -25,
    left: -25
  },
  angleBottomRight:  {
    bottom: -25,
    right: -25
  },

  footer: {
    zIndex: 5,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",

    flexDirection: "row",
    paddingHorizontal: 56,
    paddingBottom: 20,
    marginLeft: -16
  },
  footerButton: {
    marginLeft: 16
  },

  buttonLabel: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "white"
  },
  buttonGallery: {
    height: 52,
    width: 52,
    minWidth: 0,
    marginLeft: 12,
    paddingHorizontal: 0
  },

  buttonClose: {
    zIndex: 999,
    position: "absolute",
    right: 16,
    top: 16 + heightStatusBar,

    width: 44,
    height: 44,
    borderRadius: 999,


    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.8)"
  }
});

export default ModalCamera;
