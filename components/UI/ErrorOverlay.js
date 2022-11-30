import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const ErrorOverlay = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorTitle}>An error occured!</Text>
            <Text style={styles.errorText}>{message}</Text>
        </View>
    );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    errorTitle: {
        fontFamily: "lexend-600",
        fontSize: 16,
        marginBottom: 5,
    },
    errorText: {
        fontFamily: "lexend-400",
        color: GlobalStyles.colors.slate500,
    },
});
