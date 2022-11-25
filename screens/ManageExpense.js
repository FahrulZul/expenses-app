import { useLayoutEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ButtonIcon from "../components/UI/ButtonIcon";
import HeaderButton from "../components/UI/HeaderButton";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
    const expensesContext = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const expenseData = expensesContext.expenses.find(
        (expense) => expense.id === editedExpenseId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
            headerLeft: () => (
                <HeaderButton
                    iconName="chevron-back"
                    containerStyle={{
                        marginRight: 16,
                    }}
                    onPress={() =>
                        navigation.canGoBack() ? navigation.goBack() : null
                    }
                />
            ),
            headerRight: () => {
                if (isEditing) {
                    return (
                        <HeaderButton
                            iconName="trash-outline"
                            iconColor="#fb7185"
                            containerStyle={{
                                marginRight: 8,
                            }}
                            onPress={deleteExpenseHandler}
                        />
                    );
                }
            },
        });
    }, [isEditing]);

    const confirmHandler = (expenseData) => {
        if (isEditing) {
            expensesContext.updateExpense(editedExpenseId, expenseData);
        } else {
            expensesContext.addExpense(expenseData);
        }
        navigation.goBack();
    };

    const deleteExpenseHandler = () => {
        navigation.goBack();
        expensesContext.deleteExpense(editedExpenseId);
    };

    const cancelhandler = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.screenContainer}>
            <ExpenseForm
                isEditing={isEditing}
                onCancel={cancelhandler}
                onSubmit={confirmHandler}
                defaultExpense={expenseData}
            />
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 16,
    },
    buttonWrapper: {
        alignItems: "flex-start",
        marginTop: 24,
    },
});
