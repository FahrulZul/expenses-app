import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import ButtonIcon from "../UI/ButtonIcon";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const ExpenseForm = ({ isEditing, onCancel, onSubmit, defaultExpense }) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultExpense ? defaultExpense.amount.toString() : "",
            isValid: true,
        },
        date: {
            value: defaultExpense
                ? getFormattedDate(defaultExpense.date)
                : getFormattedDate(new Date()),
            isValid: true,
        },
        description: {
            value: defaultExpense ? defaultExpense.description : "",
            isValid: true,
        },
    });

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInput) => {
            return {
                ...curInput,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    };

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert("Invalid input!", "Please check your input.");
            setInputs((curInputs) => {
                return {
                    amount: {
                        value: curInputs.amount.value,
                        isValid: amountIsValid,
                    },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: {
                        value: curInputs.description.value,
                        isValid: descriptionIsValid,
                    },
                };
            });
            return;
        }

        onSubmit(expenseData);
    };

    const formIsValid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View>
            {formIsValid && (
                <View style={styles.errorContainer}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={24}
                        style={styles.errorIcon}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.errorTitle}>Invalid Input!</Text>
                        <Text style={styles.errorText}>
                            Please check your input data
                        </Text>
                    </View>
                </View>
            )}
            <View style={styles.inputRowWrapper}>
                <Input
                    label="Amount"
                    style={styles.rowInput}
                    invalid={!inputs.amount.isValid}
                    inputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputs.amount.value,
                    }}
                />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    invalid={!inputs.date.isValid}
                    inputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputs.date.value,
                    }}
                />
            </View>

            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                inputConfig={{
                    multiline: true,
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputs.description.value,
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
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        marginBottom: 16,
        elevation: 2,
    },
    errorIcon: {
        color: GlobalStyles.colors.rose400,
        marginRight: 8,
    },
    errorTitle: {
        fontFamily: "lexend-600",
        fontSize: 12,
        color: GlobalStyles.colors.slate800,
    },
    errorText: {
        fontFamily: "lexend-400",
        fontSize: 12,
        color: GlobalStyles.colors.slate400,
    },
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
