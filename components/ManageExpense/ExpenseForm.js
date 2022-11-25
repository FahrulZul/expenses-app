import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import ButtonIcon from "../UI/ButtonIcon";
import { getFormattedDate } from "../../util/date";

const ExpenseForm = ({ isEditing, onCancel, onSubmit, defaultExpense }) => {
    const [inputValues, setInputValues] = useState({
        amount: defaultExpense ? defaultExpense.amount.toString() : "",
        date: defaultExpense ? getFormattedDate(defaultExpense.date) : "",
        description: defaultExpense ? defaultExpense.description : "",
    });

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputValues((curInputValues) => {
            return { ...curInputValues, [inputIdentifier]: enteredValue };
        });
    };

    const submitHandler = () => {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
        };

        const amountISValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountISValid || !dateIsValid || !descriptionIsValid) {
            Alert.alert("Invalid input!", "Please check your input.");
            return;
        }

        onSubmit(expenseData);
    };

    return (
        <View>
            <View style={styles.inputRowWrapper}>
                <Input
                    label="Amount"
                    style={styles.rowInput}
                    inputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputValues.amount,
                    }}
                />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    inputConfig={{
                        placeholder: "YYYY-MM-DD",
                        keyboardType: "decimal-pad",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputValues.date,
                    }}
                />
            </View>

            <Input
                label="Description"
                inputConfig={{
                    multiline: true,
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputValues.description,
                }}
            />

            <View style={styles.buttonsContainer}>
                <ButtonIcon text="Cancel" ghost={true} onPress={onCancel} />
                <ButtonIcon
                    text={isEditing ? "Update" : "Add"}
                    dark={true}
                    onPress={submitHandler}
                />
            </View>
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    inputRowWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    rowInput: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: "row",
        marginTop: 24,
    },
});
