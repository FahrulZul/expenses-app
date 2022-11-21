import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

const ButtonIcon = ({ iconName, text, btnStyle, onPress }) => {
    return (
        <View style={[styles.container, btnStyle]}>
            <Pressable
                style={styles.pressable}
                android_ripple={{ color: GlobalStyles.colors.slate100 }}
                onPress={onPress}
            >
                <Ionicons
                    name={iconName}
                    size={20}
                    color={GlobalStyles.colors.slate900}
                    style={styles.icon}
                />
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </View>
    );
};

export default ButtonIcon;

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        overflow: "hidden",
        elevation: 2,
    },
    pressable: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 4,
    },
    text: {
        fontFamily: "poppins-400",
        transform: [{ translateY: 1 }],
        fontSize: 12,
        color: GlobalStyles.colors.slate90,
    },
});
