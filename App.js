import { StatusBar } from "expo-status-bar";
import { useEffect, useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    const Stack = createNativeStackNavigator();
    const BottomTab = createBottomTabNavigator();

    const ExpenseOverview = () => {
        return (
            <BottomTab.Navigator
                screenOptions={{
                    headerTitleStyle: {
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
