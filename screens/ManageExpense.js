import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonIcon from "../components/UI/ButtonIcon";
import HeaderButton from "../components/UI/HeaderButton";
import { GlobalStyles } from "../constants/styles";

const ManageExpense = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
            headerLeft: () => (
                <HeaderButton
                    iconName="chevron-back"
                    onPress={() =>
                        navigation.canGoBack() ? navigation.goBack() : null
                    }
                />
            ),
        });
    }, [isEditing]);

    const confirmHandler = () => {
        navigation.goBack();
    };

    const deleteExpenseHandler = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.screenContainer}>
            <View style={styles.buttonWrapper}>
                <ButtonIcon
                    isIcon={false}
                    text={isEditing ? "Update" : "Add"}
                    bgColor={GlobalStyles.colors.slate100}
                    onPress={confirmHandler}
                />
            </View>
            {isEditing && (
                <View style={[styles.buttonWrapper, styles.deleteBtnWrapper]}>
                    <ButtonIcon
                        isIcon={true}
                        iconName="trash-outline"
                        iconColor="#f87171"
                        bgColor={GlobalStyles.colors.slate100}
                        text="Delete"
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 24,
    },
    buttonWrapper: {
        alignItems: "center",
    },
    deleteBtnWrapper: {
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: GlobalStyles.colors.slate200,
    },
});
