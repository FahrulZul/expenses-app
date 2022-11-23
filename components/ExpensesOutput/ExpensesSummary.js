import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ButtonIcon from "../UI/ButtonIcon";
import { useNavigation } from "@react-navigation/native";

const ExpensesSummary = ({ expenses, periodName }) => {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    const navigation = useNavigation();

    const addExpenseHandler = () => {
        navigation.navigate("manageExpense");
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.periodText}>{periodName}</Text>
                <Text style={styles.amountText}>${expensesSum.toFixed(2)}</Text>
            </View>
            <ButtonIcon
                isIcon={true}
                iconName="ios-add-circle-outline"
                text="Add Expense"
                onPress={addExpenseHandler}
            />
        </View>
    );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.slate200,
        paddingTop: 100,
        paddingBottom: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    periodText: {
        fontFamily: "outfit-400",
        fontSize: 13,
        color: GlobalStyles.colors.slate500,
    },
    amountText: {
        fontFamily: "poppins-500",
        fontSize: 40,
        backgroundColor: "red",
    },
});
