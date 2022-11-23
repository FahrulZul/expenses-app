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

    const confirmHandler = () => {
        navigation.goBack();
        if (isEditing) {
            expensesContext.updateExpense(editedExpenseId, {
                description: "Updated Item",
                amount: 10.52,
                date: new Date("2022-11-19"),
            });
        } else {
            expensesContext.addExpense({
                description: "New added Item",
                amount: 16.72,
                date: new Date(),
            });
        }
    };

    const deleteExpenseHandler = () => {
        navigation.goBack();
        expensesContext.deleteExpense(editedExpenseId);
    };

    return (
        <View style={styles.screenContainer}>
            <ExpenseForm />
            <View style={styles.buttonWrapper}>
                <ButtonIcon
                    isIcon={false}
                    text={isEditing ? "Update" : "Add"}
                    dark={true}
                    onPress={confirmHandler}
                />
            </View>
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
    deleteBtnWrapper: {
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: GlobalStyles.colors.slate200,
    },
});
