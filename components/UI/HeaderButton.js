import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

const HeaderButton = ({ onPress, iconName, iconColor, containerStyle }) => {
    return (
        <View style={[styles.btnContainer, containerStyle]}>
            <Pressable
                onPress={onPress}
                style={styles.pressableContainer}
                android_ripple={{ color: GlobalStyles.colors.slate100 }}
            >
                <Ionicons name={iconName} size={22} color={iconColor} />
            </Pressable>
        </View>
    );
};

export default HeaderButton;

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 50,
        overflow: "hidden",
    },
    pressableContainer: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },
});
