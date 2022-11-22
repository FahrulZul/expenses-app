import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
    const expensesContext = useContext(ExpensesContext);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const dateOfSevenDaysAgo = getDateMinusDays(today, 7);

        return expense.date >= dateOfSevenDaysAgo && expense.date <= today;
    });

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 days"
        />
    );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
