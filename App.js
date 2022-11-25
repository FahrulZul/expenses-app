import { StatusBar } from "expo-status-bar";
import { useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";
import ManageExpense from "./screens/ManageExpense";
import ExpensesContextProvider from "./store/expenses-context";

export default function App() {
    const [fontsLoaded] = useFonts({
        "lexend-400": require("./assets/fonts/Lexend/Lexend-Regular.ttf"),
        "lexend-500": require("./assets/fonts/Lexend/Lexend-Medium.ttf"),
        "lexend-600": require("./assets/fonts/Lexend/Lexend-SemiBold.ttf"),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const Stack = createNativeStackNavigator();
    const BottomTab = createBottomTabNavigator();

    const ExpenseOverview = () => {
        return (
            <BottomTab.Navigator
                screenOptions={{
                    headerTitleStyle: {
                        fontFamily: "lexend-500",
                        fontSize: 16,
                    },
                    tabBarStyle: {
                        height: 60,
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                    tabBarItemStyle: {
                        paddingBottom: 6,
                        paddingTop: 12,
                    },
                    tabBarLabelStyle: {
                        fontFamily: "lexend-400",
                        fontSize: 12,
                    },
                    tabBarActiveTintColor: GlobalStyles.colors.slate800,
                    tabBarInactiveTintColor: GlobalStyles.colors.slate400,
                    headerTransparent: true,
                }}
            >
                <BottomTab.Screen
                    name="recentExpenses"
                    component={RecentExpenses}
                    options={{
                        title: "Recent Expenses",
                        tabBarLabel: "Recent",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="hourglass-outline"
                                size={22}
                                color={color}
                            />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="allExpensesScreen"
                    component={AllExpenses}
                    options={{
                        title: "All Expenses",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="calendar-outline"
                                size={22}
                                color={color}
                            />
                        ),
                    }}
                />
            </BottomTab.Navigator>
        );
    };

    return (
        <>
            <StatusBar style="dark" />
            <View style={styles.rootContainer} onLayout={onLayoutRootView}>
                <ExpensesContextProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                contentStyle: {
                                    backgroundColor: "white",
                                },
                            }}
                        >
                            <Stack.Screen
                                name="expenseOverviewScreen"
                                component={ExpenseOverview}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="manageExpense"
                                component={ManageExpense}
                                options={{
                                    presentation: "modal",
                                    headerTitleStyle: {
                                        fontFamily: "lexend-500",
                                        fontSize: 16,
                                    },
                                    headerShadowVisible: false,
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ExpensesContextProvider>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
});
