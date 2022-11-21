import { FlatList, View, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
    const renderExpenseItem = (itemData) => {
        return <ExpenseItem {...itemData.item} />;
    };

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
            />
        </View>
    );
};

export default ExpensesList;

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingTop: 16,
    },
});
