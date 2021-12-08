import React, {Component} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native/index';
import {Text} from "react-native-ui-lib";
import {
    Header
} from "../../../components";
import BlurView from "../../../components/BlurView";
import {Modalize as ModalizeRoot} from "react-native-modalize";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import Svg, {Path} from "react-native-svg";

const { width, height } = Dimensions.get("window");

class Preference extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locale: props.language
        }

        this.refLocale = React.createRef();
    }

    componentDidMount = () => {}


    _englishList = () => {
        return [
            { label: "English", key: "en-EN" },
            { label: "Svenska", key: "sv-SV" },
            { label: "Español", key: "es-ES" },
            { label: "Русский", key: "ru-RU" },
        ]
    }
    _setLanguage = (lang) => {
        this.setState({
            locale: lang
        });

        this.closeModalLocale();

        this.props.updateLanguage(lang);
    }

    openModalLocale = () => {
        this.refLocale.current.open();
    }
    closeModalLocale = () => {
        this.refLocale.current.close();
    }


    _FloatingComponent = () => {
        return (
            <TouchableOpacity
                style={styles.absolute}
                activeOpacity={1}
                onPress={this.closeModalLocale}
            >
                <BlurView style={styles.blurView}/>
            </TouchableOpacity>
        );
    }
    _HeaderComponent = () => {
        return (
            <View style={styles.header}>
                <View style={styles.headerIndicatorClose}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.root}>

                <Header/>

                <ScrollView contentContainerStyle={styles.scrollView}>

                    <TouchableOpacity style={styles.buttonLocale} onPress={this.openModalLocale}>
                        <View style={{width: 32, height: 32}}/>
                        <Text style={styles.buttonLocaleLabel}>
                            {this._englishList().find((t) => t.key === this.state.locale)?.label}
                        </Text>
                        <View style={{width: 32, height: 32, alignItems: "center", justifyContent: "center"}}>
                            <Svg width={ 24 } height={ 24 } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M4.30665 9.58121C4.10823 9.409 4 9.18982 4 8.93151C4 8.41487 4.469 8 5.06426 8C5.36189 8 5.63247 8.10959 5.83991 8.28963L12.009 13.7691L18.1601 8.28963C18.3675 8.10959 18.6471 8 18.9357 8C19.531 8 20 8.41487 20 8.93151C20 9.18982 19.8918 9.409 19.6933 9.58121L12.8388 15.6712C12.6043 15.8904 12.3157 15.9922 12 16C11.6843 16 11.4138 15.8904 11.1702 15.6712L4.30665 9.58121Z" fill="black"/>
                            </Svg>
                        </View>
                    </TouchableOpacity>

                </ScrollView>



                <ModalizeRoot
                    ref={this.refLocale}
                    adjustToContentHeight={true}
                    avoidKeyboardLikeIOS={false}
                    keyboardAvoidingBehavior="padding"
                    scrollViewProps={{
                        alwaysBounceHorizontal: false,
                        alwaysBounceVertical: false,
                        bounces: false,
                    }}
                    rootStyle={styles.rootStyle}
                    modalStyle={styles.noBackGround}
                    handleStyle={styles.noBackGround}
                    childrenStyle={styles.childrenStyle}
                    overlayStyle={styles.overlayStyle}

                    FloatingComponent={this._FloatingComponent}
                    HeaderComponent={this._HeaderComponent}
                >
                    <View style={styles.containerBody}>
                        <View style={styles.confirm}>
                            <Text style={styles.confirmLabel}>
                                {allTranslations(localization.locale.popUpLabel)}
                            </Text>

                            <View style={styles.confirmBody}>
                                {
                                    this._englishList().map((item, idx) => (
                                        <>
                                            {Boolean(idx === 0) && (
                                                <View style={{height: 1, marginVertical: 10, backgroundColor: "black", opacity: 0.1, marginHorizontal: -32}}/>
                                            )}
                                            <TouchableOpacity style={styles.language} key={idx} onPress={() => this._setLanguage(item.key)} activeOpacity={0.8}>
                                                <Text style={styles.languageLabel}>{ item.label }</Text>
                                            </TouchableOpacity>
                                            <View style={{height: 1, marginVertical: 10, backgroundColor: "black", opacity: 0.1, marginHorizontal: -32}}/>
                                        </>
                                    ))
                                }
                            </View>

                        </View>
                    </View>
                </ModalizeRoot>

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
        paddingHorizontal: 24,
        paddingVertical: 16
    },

    imageLogo: {
        width: 180,
        height: 180,
        marginBottom: 24
    },
    imageLabel: {
        width: (width - 84),
        height: 65
    },

    button: {
        marginTop: 16,
        textTransform: "uppercase",
        width: (width - 80)
    },



    confirm: {
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 16,
        paddingTop: 36
    },
    confirmLabel: {
        fontSize: 25,
        lineHeight: 30,
        fontWeight: "500",
        color: "#282828",
        textAlign: "center",
        marginBottom: 24
    },
    confirmBody: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 0
    },
    confirmMessage: {
        fontSize: 14,
        lineHeight: 23,
        color: "#8E8E8E",
        marginBottom: 16
    },
    confirmControls: {
        flexDirection: "row",
        marginLeft: -12
    },
    confirmButtonSuccess: {
        flex: 1,
        backgroundColor: "#ABCE30",
        borderColor: "#ABCE30",
        marginLeft: 12
    },
    confirmButtonCancel: {
        flex: 1,
        backgroundColor: "#CD5254",
        borderColor: "#CD5254",
        marginLeft: 12
    },


    buttonLocale: {
        flexDirection: "row",
        alignContent: "center",

        marginTop: 32,
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonLocaleLabel: {
        fontSize: 16,
        lineHeight: 18,
        color: "black",
        fontWeight: "500",
        flex: 1,
        textAlign: "center"
    },


    language: {
        height: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    languageLabel: {
        fontSize: 16,
        lineHeight: 18,
        color: "black"
    },





    rootStyle: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        zIndex: 999,
    },
    childrenStyle: {
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    overlayStyle: {
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0)",
    },
    absolute: {
        zIndex: -1,
        position: "absolute",
        right: 0,
        bottom: 0,
        width: width,
        height: height,
    },
    blurView: {
        position: "absolute",
        right: 0,
        bottom: 0,
        left: 0,
        top: 0,

        backgroundColor: "rgba(40, 40, 40, 0.4)",
    },
    noBackGround: {
        backgroundColor: "rgba(0, 0, 0, 0)",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,

        elevation: 0,
    },
    header: {
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: -20,
        zIndex: 99
    },
    headerIndicatorClose: {
        width: 32,
        height: 4,
        backgroundColor: "#8E8E8E",
        borderRadius: 999
    },
    containerBody: {
        zIndex: 2,
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
});

export default Preference
