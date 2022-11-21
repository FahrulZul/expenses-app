import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const ManageExpense = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, []);

    return (
        <View style={styles.screenContainer}>
            <Text>This is a Manage Expense Screen</Text>
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 24,
    },
});
