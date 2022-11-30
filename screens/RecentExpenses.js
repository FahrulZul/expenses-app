import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
    const [error, setError] = useState(false);
    const [isFecthing, setIsFetching] = useState(null);
    const expensesContext = useContext(ExpensesContext);

    useEffect(() => {
        const getExpenses = async () => {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesContext.setExpenses(expenses);
            } catch (error) {
                setError("Could not fetch expense.");
            }
            setIsFetching(false);
        };

        getExpenses();
    }, []);

    if (error && !isFecthing) {
        return <ErrorOverlay message={error} />;
    }

    if (isFecthing) {
        return <LoadingOverlay />;
    }

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const dateOfSevenDaysAgo = getDateMinusDays(today, 7);

        return expense.date >= dateOfSevenDaysAgo && expense.date <= today;
    });

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 days"
            fallbackText="No expenses registered for the last 7 days."
        />
    );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
