import { View, Text, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, style, inputConfig }) => {
    const inputStyles = [styles.input];

    if (inputConfig && inputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...inputConfig} />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
    },
    label: {
        fontFamily: "poppins-500",
        fontSize: 12,
        color: GlobalStyles.colors.slate600,
        marginBottom: 4,
    },
    input: {
        fontFamily: "poppins-400",
        fontSize: 12,
        backgroundColor: GlobalStyles.colors.slate100,
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
        paddingVertical: 10,
    },
});
