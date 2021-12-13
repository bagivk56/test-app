import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native/index";
import {
    Text
} from "react-native-ui-lib";
import {
    colors,
    icons
} from "../../common/Notification";

const FlashMessage = (props) => {
    const { message } = props;
    const color = colors[message.type];
    const icon = icons[message.type];

    const handleOnClose = () => {

        props?.onClick();
    }

    return (
        <>

            <TouchableOpacity
                style={[styles.container, { backgroundColor: color }]}
                activeOpacity={1}
                onPress={handleOnClose}
            >

                {
                    Boolean(message?.message) && (
                        <Text style={styles.title}>{ message?.message }</Text>
                    )
                }

                {
                    Boolean(message?.description) && (
                        <Text style={styles.description}>{ message?.description }</Text>
                    )
                }

            </TouchableOpacity>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 16,

        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,

        backgroundColor: 'white',


    },

    title: {
        fontSize: 18,
        lineHeight: 20,
        color: 'white',
        fontWeight: '500',
        marginBottom: 8
    },
    description: {
        fontSize: 14,
        lineHeight: 18,
        color: 'white'
    }
});

export default FlashMessage
