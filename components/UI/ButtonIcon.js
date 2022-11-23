import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

const ButtonIcon = ({
    isIcon = false,
    iconName,
    iconColor = GlobalStyles.colors.slate800,
    text,
    onPress,
    dark = false,
}) => {
    return (
        <View style={[styles.container, dark ? styles.containerDark : {}]}>
            <Pressable
                style={styles.pressable}
                android_ripple={
                    dark
                        ? { color: GlobalStyles.colors.slate700 }
                        : { color: GlobalStyles.colors.slate50 }
                }
                onPress={onPress}
            >
                {isIcon && (
                    <Ionicons
                        name={iconName}
                        size={20}
                        color={iconColor}
                        style={styles.icon}
                    />
                )}

                <Text style={[styles.text, dark ? styles.darkText : {}]}>
                    {text}
                </Text>
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
        backgroundColor: "white",
    },
    containerDark: {
        backgroundColor: GlobalStyles.colors.slate800,
    },
    pressable: {
        flexDirection: "row",
        alignItems: "center",
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
        color: GlobalStyles.colors.slate900,
    },
    darkText: {
        color: GlobalStyles.colors.slate50,
    },
});
