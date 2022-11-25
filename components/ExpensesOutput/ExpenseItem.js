import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

const ExpenseItem = ({ id, description, amount, date }) => {
    const navigation = useNavigation();

    const expensePresshandler = () => {
        navigation.navigate("manageExpense", {
            expenseId: id,
        });
    };

    return (
        <Pressable
            android_ripple={{ color: GlobalStyles.colors.slate100 }}
            onPress={expensePresshandler}
        >
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.descText}>{description}</Text>
                    <Text style={styles.dateText}>
                        {getFormattedDate(date)}
                    </Text>
                </View>
                <View>
                    <Text style={styles.amountText}>{amount}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 0.7,
        borderBottomColor: GlobalStyles.colors.slate200,
        marginHorizontal: 16,
    },
    descText: {
        fontFamily: "lexend-400",
        fontSize: 14,
        marginBottom: 5,
    },
    dateText: {
        fontFamily: "lexend-400",
        fontSize: 12,
        color: GlobalStyles.colors.slate400,
    },
    amountText: {
        fontFamily: "lexend-500",
        fontSize: 14,
    },
});
