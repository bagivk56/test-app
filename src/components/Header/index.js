import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  useNavigation
} from '@react-navigation/native';
import { Portal } from "react-native-portalize";
import Icon from "react-native-vector-icons/FontAwesome5";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import {Linking} from "react-native";

const heightStatusBar = getHeightStatusBar();

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false
    };
  }

  onLogoTap = () => {

    this.setState({ openMenu: false });

    if (!this.props.onLogoTap) {
      return null
    }

    this.props.onLogoTap();
  }

  openSupport = async () => {
    await Linking.openURL("https://escobarinc.com/contact");
  }

  render() {
    const {
      styleRoot
    } = this.props;
    const {
      openMenu
    } = this.state;

    return (
      <>

        <View style={[styles.root, styleRoot || {}]}>

          <BigLogo onLogoTap={this.onLogoTap}/>

          <View style={{flex: 1, marginRight: 24}}>
            <TextLogo onLogoTap={this.onLogoTap}/>
          </View>

          <TouchableOpacity style={styles.buttonMenu} onPress={() => this.setState({ openMenu: !openMenu })}>
            <Icon name="bars" size={24} color="#FFB800"/>
          </TouchableOpacity>

        </View>

        {Boolean(openMenu) && (
          <View style={styles.dropDownMenu}>

            <View style={styles.separate}/>

            <ButtonMenu
              path="Account"
              image={require("../../assets/png/header/user-circle.png")}
              label={allTranslations(localization.header.account )}
              onClose={() => this.setState({openMenu: !openMenu})}
            />

            <View style={styles.separate}/>

            <ButtonMenu
              path="SecurityMenu"
              image={require("../../assets/png/header/lock-alt.png")}
              label={allTranslations(localization.header.security )}
              onClose={() => this.setState({openMenu: !openMenu})}
            />
            <View style={styles.separate}/>
            <ButtonMenu
                path="Preference"
                image={require("../../assets/png/header/cog.png")}
                label={allTranslations(localization.header.preference )}
                onClose={() => this.setState({openMenu: !openMenu})}
            />
            <View style={styles.separate}/>
            <ButtonMenu
                onClick={this.openSupport}
                image={require("../../assets/png/header/chat-info.png")}
                label={allTranslations(localization.header.support )}
                onClose={() => this.setState({openMenu: !openMenu})}
            />
            <View style={styles.separate}/>

          </View>
        )}

      </>
    );
  }
}

const BigLogo = (props) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    props.onLogoTap();
    navigation.navigate("DashboardHome");
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleGoBack}>
      <Image
        source={require("../../assets/png/header/header-logo.png")}
        style={styles.headerLogo}
      />
    </TouchableOpacity>
  )
}
const TextLogo = (props) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    props.onLogoTap();
    navigation.navigate("DashboardHome");
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleGoBack} style={{flex: 1}}>
      <Image
          style={{height: 50, width: "100%"}}
          source={require("../../assets/png/header/text-only-white.png")}
          resizeMode="contain"
      />
    </TouchableOpacity>
  )
}
const ButtonMenu = (props) => {
  const {
    label,
    image,
    path,

    onClose,
    onClick
  } = props;
  const navigation = useNavigation();

  const handleRoute = () => {
    if (!!onClick) {

      onClick();

      return null
    }

    navigation.navigate(path);

    onClose();
  }

  return (
    <TouchableOpacity disabled={Boolean(!path && !onClick)} onPress={handleRoute} activeOpacity={0.8} style={styles.row}>
      <View style={styles.rowIcon}>
        <Image
          style={{width: "100%",height: "100%"}}
          resizeMode="contain"
          source={image}
        />
      </View>
      <Text style={styles.rowLabel}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: heightStatusBar + 13,
    paddingBottom: 13,
    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black"
  },

  headerLogo: {
    width: 53,
    height: 53,
    marginRight: 24
  },

  buttonMenu: {
    marginLeft: "auto",

    width: 32,
    height: 32,

    justifyContent: "center",
    alignItems: "center"
  },

  dropDownMenu: {
    position: "absolute",
    left: 0,
    top: heightStatusBar + 26 + 50,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    zIndex: 999
  },

  separate: {
    height: 1,
    backgroundColor: "#FFB800"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 16
  },
  rowIcon: {
    width: 24,
    height: 24,
    marginRight: 24
  },
  rowLabel: {
    fontSize: 20,
    color: "#FFFFFF",
    textTransform: "uppercase"
  }
});

export default function (props) {
  const navigation = useNavigation();

  return <Header {...props} navigation={navigation}/>
}
