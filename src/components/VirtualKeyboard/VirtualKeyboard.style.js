import {StyleSheet, Dimensions, Platform} from 'react-native';
import {getFontFamily} from "../../theme/theme-manager/Text";

const {height, width} = Dimensions.get('window');

module.exports = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'flex-start',
    },
    row: {
        flexDirection: 'row'
    },
    number: {
        fontSize: 25,
        lineHeight: 30,
		color: "#373737",
		textAlign: 'center'
    },
    backspace: {
        flex: 1,
        justifyContent: 'center',
    },
    cell: {
        flex: 1,
		height: 64,
		width: 64,
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.8)",
		borderRadius: 10,
        justifyContent: 'center',
		marginLeft: 16,
		marginBottom: 16
    },
});
