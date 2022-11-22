import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

const HeaderButton = ({ onPress, iconName }) => {
    return (
        <View style={styles.btnContainer}>
            <Pressable
                onPress={onPress}
                style={styles.pressableContainer}
                android_ripple={{ color: GlobalStyles.colors.slate100 }}
            >
                <Ionicons
                    name={iconName}
                    size={22}
                    color={GlobalStyles.colors.slate800}
                />
            </Pressable>
        </View>
    );
};

export default HeaderButton;

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 50,
        overflow: "hidden",
        transform: [{ translateX: -6 }],
        marginRight: 16,
    },
    pressableContainer: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },
});
