import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Calendar, Home } from "@screens/admin";
import { colors, icons } from "@utils";

const Tab = createBottomTabNavigator();

export function AdminNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        // tabBarInactiveTintColor: "#ccc",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => icons.HomeIcon({ size, color }),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({ color, size }) => icons.CalendarIcon({ size, color }),
        }}
      />
    </Tab.Navigator>
  );
}
