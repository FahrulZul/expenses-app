import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    return (
        <View style={styles.screenContainer}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "white",
    },
});
