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
                <View style={styles.amountContainer}>
                    <Text style={styles.priceUnit}>RM</Text>
                    <Text style={styles.amount}>{expensesSum.toFixed(2)}</Text>
                </View>
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
        paddingBottom: 20,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    periodText: {
        fontSize: 14,
        color: GlobalStyles.colors.slate500,
        marginBottom: 16,
    },
    amountContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    amount: {
        fontSize: 40,
    },
    priceUnit: {
        fontSize: 20,
        marginTop: 10,
        marginRight: 3,
        color: GlobalStyles.colors.slate600,
    },
});
