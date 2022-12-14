import axios from "axios";

const FIREBASE_API_URL =
    "https://react-native-course-d3f4a-default-rtdb.asia-southeast1.firebasedatabase.app";

export const storeExpense = async (expenseData) => {
    const response = await axios.post(
        FIREBASE_API_URL + "/expenses.json",
        expenseData
    );

    const id = response.data.name;

    return id;
};

export const fetchExpenses = async () => {
    const response = await axios.get(FIREBASE_API_URL + "/expenses.json");

    const expenses = [];

    for (const key in response.data) {
        let expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };

        expenses.push(expenseObj);
    }

    return expenses;
};

export const updateExpense = (id, expenseData) => {
    return axios.put(`${FIREBASE_API_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
    return axios.delete(`${FIREBASE_API_URL}/expenses/${id}.json`);
};
