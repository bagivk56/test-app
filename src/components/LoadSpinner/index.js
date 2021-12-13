import React from "react";
import {
  View,
  Easing,
  Animated,
  StyleSheet,
} from "react-native/index";
import Svg, { Path, Rect } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

class LoadSpinner extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      spinValue: new Animated.Value(0)
    }
  }

  componentDidMount = () => {
    this.startAnimation();
  }

  startAnimation = () => {

    Animated.loop(
      Animated.timing(
        this.state.spinValue,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ).start();

  }


  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const {
      color
    } = this.props;

    return (
      <View style={styles.root}>

        <AnimatedSvg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: [{ rotate: spin }]
          }}
        >
          <Rect width="108" height="108" fill={ color } />

          <Path
            d="M94 54C94 76.0914 76.0914 94 54 94C31.9086 94 14 76.0914 14 54C14 31.9086 31.9086 14 54 14C76.0914 14 94 31.9086 94 54ZM19.7348 54C19.7348 72.9241 35.0759 88.2652 54 88.2652C72.9241 88.2652 88.2652 72.9241 88.2652 54C88.2652 35.0759 72.9241 19.7348 54 19.7348C35.0759 19.7348 19.7348 35.0759 19.7348 54Z"
            fill="#3D3D3D"
          />

          <Path
            d="M91.1326 54C92.7162 54 94.0107 52.7145 93.8973 51.135C93.2417 42.0014 89.4668 33.3355 83.1587 26.6181C76.8507 19.9007 68.439 15.5891 59.3645 14.3613C57.7952 14.149 56.431 15.3602 56.3316 16.9407V16.9407C56.2321 18.5212 57.436 19.8707 59.0027 20.1019C66.6203 21.2259 73.6691 24.8902 78.9783 30.5439C84.2874 36.1976 87.5019 43.4625 88.1453 51.1357C88.2777 52.7138 89.549 54 91.1326 54V54Z"
            fill="#FFB800"
          />
        </AnimatedSvg>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",

    width: 108,
    height: 108,
  },

  lightning: {
    position: "absolute",
    alignSelf: "center",
  }
});

LoadSpinner.defaultProps = {
  color: "black"
};

export default LoadSpinner;
