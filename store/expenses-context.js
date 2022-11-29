import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expense: [],
    addExpense: ({ description, amount, date }) => {},
    setExpenses: (expenses) => {},
    updateExpense: (id, { description, amount, date }) => {},
    deleteExpense: (id) => {},
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "SET":
            const inverted = action.payload.reverse();
            return inverted;
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex((expense) => {
                return expense.id === action.payload.id;
            });
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
};

const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const addExpense = (expenseData) => {
        dispatch({ type: "ADD", payload: expenseData });
    };

    const setExpenses = (expenses) => {
        dispatch({ type: "SET", payload: expenses });
    };

    const updateExpense = (id, expenseData) => {
        dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
    };

    const deleteExpense = (id) => {
        dispatch({ type: "DELETE", payload: id });
    };

    const value = {
        expenses: expensesState,
        setExpenses,
        addExpense,
        deleteExpense,
        updateExpense,
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
};

export default ExpensesContextProvider;
