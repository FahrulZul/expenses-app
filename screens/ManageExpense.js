import { useLayoutEffect, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import HeaderButton from "../components/UI/HeaderButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
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

    const confirmHandler = async (expenseData) => {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                expensesContext.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesContext.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError("Could not save data - please try again later!");
            setIsSubmitting(false);
        }
    };

    const deleteExpenseHandler = async () => {
        setIsSubmitting(true);
        try {
            expensesContext.deleteExpense(editedExpenseId);
            await deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError("Could not delete expense - please try again later!");
            setIsSubmitting(false);
        }
    };

    const cancelhandler = () => {
        navigation.goBack();
    };

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />;
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
    }

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
