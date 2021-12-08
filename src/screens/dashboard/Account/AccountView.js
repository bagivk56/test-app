import React, {Component} from "react";
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native/index";
import {
    Text
} from "react-native/index";
import {
    Header,
    HeaderNavigation
} from "../../../components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import Clipboard from "@react-native-clipboard/clipboard";


class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => {
    };

    copyAddress = async () => {
        await Clipboard.setString(this.props?.wallets?.address);

        Notification.send({
            type: "success",
            message: allTranslations(localization.receiveAmount.successCopyAddress)
        })
    }

    render() {
        const {
            wallets
        } = this.props;

        return (
            <View style={styles.root}>

                <Header/>

                <ScrollView contentContainerStyle={{paddingVertical: 20}}>

                    <HeaderNavigation
                        label={allTranslations(localization.account.label)}
                    />

                    <View style={{marginTop: 24}}/>

                    <View style={styles.separate}/>
                    <View style={styles.row}>
                        <Text style={styles.rowLabel}>
                            {allTranslations(localization.account.accountId)}
                        </Text>

                        <TouchableOpacity onPress={this.copyAddress}>
                            <Text style={styles.rowValue}>
                                {wallets?.address}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separate}/>

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

    separate: {
        height: 1,
        backgroundColor: "#FFB800"
    },

    row: {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 20,
        paddingVertical: 24
    },
    rowLabel: {
        color: "#787878",
        fontSize: 20,
        marginRight: 14,
        lineHeight: 20,
    },
    rowValue: {
        fontSize: 11,
        lineHeight: 20,
        color: "#ABCE30"
    },
});

export default Account;
