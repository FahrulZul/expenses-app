import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";

const ExpenseForm = () => {
    const [inputValues, setInputValues] = useState({
        amount: "",
        date: "",
        description: "",
    });

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputValues((curInputValues) => {
            return { ...curInputValues, [inputIdentifier]: enteredValue };
        });
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
});
