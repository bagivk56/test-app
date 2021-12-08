import React from "react";
import {
    StyleSheet, TextInput, View
} from "react-native/index";
import {Button, Text} from "react-native-ui-lib";
import Notification from "../../../../../common/Notification";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import axios from "axios";
import {isValidAddress} from "xrpl/dist/npm/utils";
import {
    ModalLoading
} from "../../../../../components";
import {convertorNumber} from "../../../../../helpers/convertor";
import getClientXrpl from "../../../../../utils/client/client";

const ContentVerify = (props) => {
    const [serial, setSerial] = React.useState("");
    const [s1, setS1] = React.useState("");
    const [s2, setS2] = React.useState("");
    const [s3, setS3] = React.useState("");
    const [balance, setBalance] = React.useState("0");
    const [showValidForm, setShowValidForm] = React.useState(false);
    const [isInvalid, setIsInvalid] = React.useState(false);
    const [isModalLoading, setModalLoading] = React.useState(false);


    const handleSubmit = async () => {

        const isValid = Boolean(!!serial && !!s1 && !!s2 && !!s3);
        if (!isValid) {
            Notification.send({
                type: "danger",
                message: allTranslations(localization.verify.errorValid)
            })

            return null
        }

        setModalLoading(true);

        const response = await axios.get(`https://e2.pabloescobar.com/verify.php?serial=${serial}&s1=${s1}&s2=${s2}&s3=${s3}`).then((res) => {
            return res.data
        }).catch((err) => {
            return {error: err.response}
        })

        if (response.error || response === 0) {
            setShowValidForm(true);
            setIsInvalid(false);
            setModalLoading(false);

            return
        }

        const address = response.replace(/\s+/g, ' ').trim();
        const isValidAdd = isValidAddress(address);

        const client = await getClientXrpl();
        const balanceXrp = await client.getXrpBalance(address).catch((err) => {
            return 0;
        });

        setBalance(balanceXrp);
        setShowValidForm(true);
        setIsInvalid(isValidAdd);
        setModalLoading(false);
    }

    return (

        <>

            {
                Boolean(!showValidForm) ? (
                    <>
                        <Text style={styles.title}>
                            {allTranslations(localization.verify.title)}
                        </Text>
                        <View style={styles.form}>
                            <View style={styles.formRow}>
                                <TextInput
                                    value={serial}
                                    style={styles.formItem}
                                    placeholder={allTranslations(localization.verify.noteSerial)}
                                    placeholderTextColor="#373737"
                                    onChangeText={(value) => setSerial(value)}
                                />
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.formRow, {flex: 1, marginLeft: 12}]}>
                                    <TextInput
                                        value={s1}
                                        style={styles.formItem}
                                        placeholder={allTranslations(localization.verify.secret1)}
                                        placeholderTextColor="#373737"
                                        onChangeText={(value) => setS1(value)}
                                    />
                                </View>
                                <View style={[styles.formRow, {flex: 1, marginLeft: 12}]}>
                                    <TextInput
                                        value={s2}
                                        style={styles.formItem}
                                        placeholder={allTranslations(localization.verify.secret2)}
                                        placeholderTextColor="#373737"
                                        onChangeText={(value) => setS2(value)}
                                    />
                                </View>
                                <View style={[styles.formRow, {flex: 1, marginLeft: 12}]}>
                                    <TextInput
                                        value={s3}
                                        style={styles.formItem}
                                        placeholder={allTranslations(localization.verify.secret3)}
                                        placeholderTextColor="#373737"
                                        onChangeText={(value) => setS3(value)}
                                    />
                                </View>
                            </View>
                            <Button
                                style={styles.buttonSend}
                                label={allTranslations(localization.verify.buttonSend)}
                                onPress={handleSubmit}
                            />
                        </View>
                    </>
                ) : (
                    <>

                        {

                            Boolean(isInvalid) ? (
                                <ValidForm
                                    balance={balance}
                                />
                            ) : (
                                <ErrorForm/>
                            )

                        }

                        <Button
                            style={{ marginTop: 24 }}
                            label={allTranslations(localization.verify.buttonUpdate)}
                            onPress={() => setShowValidForm(false)}
                        />


                    </>
                )
            }

            <ModalLoading
                open={isModalLoading}
            />

        </>

    )
}
const ValidForm = (props) => {
    return (
        <>

            <Text style={styles.messageScanWallet}>
                { allTranslations(localization.verify.validCashCash1) }&nbsp;
                <Text style={{ color: "#89b22d" }}>
                    { allTranslations(localization.verify.validCashCash2) }
                </Text>
            </Text>

            <View style={{ marginBottom: 34, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 }}>
                <Text style={styles.yellowLabel}>Balance:</Text>
                <Text style={styles.whiteLabel}>
                    { convertorNumber(props.balance, 2, '.') } ECH
                </Text>
            </View>

            <Text style={styles.captionScanWallet}>
                { allTranslations(localization.verify.validCashCaption) }
            </Text>

        </>
    )
}
const ErrorForm = (props) => {
    return (
        <>

            <Text style={styles.messageScanWallet}>
                { allTranslations(localization.verify.notValidCash1) }&nbsp;
                <Text style={{ color: "#d50000" }}>
                    { allTranslations(localization.verify.notValidCash2) }
                </Text>
            </Text>

            <Text style={styles.captionScanWallet}>
                {allTranslations(localization.verify.notValidCashCaption)}
            </Text>

        </>
    )
}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: "#000000",
    },

    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 26,
        paddingVertical: 22,
    },


    title: {
        fontSize: 22,
        textAlign: "center",
        color: "#C1C7D0",
        marginBottom: 30
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: -12
    },

    form: {
        marginTop: -18
    },
    formRow: {
        marginTop: 18
    },
    formItem: {
        backgroundColor: "#F4F5F7",
        height: 43,
        paddingHorizontal: 12,
        borderRadius: 10
    },

    buttonSend: {
        marginTop: 48
    },

    messageScanWallet: {
        fontSize: 22,
        color: "#C1C7D0",
        marginBottom: 24,
        textAlign: "center"
    },
    captionScanWallet: {
        fontSize: 15,
        color: "#C1C7D0",
        textAlign: "center",
        marginHorizontal: 24
    },

    yellowLabel: {
        fontSize: 25,
        color: "#FFB800"
    },
    whiteLabel: {
        fontSize: 20,
        color: "white"
    },

});

export default ContentVerify
