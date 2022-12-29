import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
    let content = <Text style={styles.text}>{fallbackText}</Text>;

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />;
    }

    return (
        <View style={styles.screenContainer}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {content}
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    text: {
        fontSize: 14,
        paddingVertical: 24,
        textAlign: "center",
    },
});
