import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
    const expensesContext = useContext(ExpensesContext);

    return (
        <ExpensesOutput
            expenses={expensesContext.expenses}
            expensesPeriod="Total"
        />
    );
};

export default AllExpenses;

const styles = StyleSheet.create({});
