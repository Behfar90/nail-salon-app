import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appointments, Home, Profile, Service } from "@screens";
import { colors, icons, strings } from "@utils";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function UserNavigation() {
  console.log("UserNavigation");
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        // tabBarInactiveTintColor: "#ccc",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name={strings.tabNavigator.home}
        component={HomeMavogation}
        options={{
          tabBarIcon: ({ color, size }) => icons.HomeIcon({ size, color }),
        }}
      />
      <Tab.Screen
        name={strings.tabNavigator.appointments}
        component={Appointments}
        options={{
          tabBarIcon: ({ color, size }) => icons.CalendarIcon({ size, color }),
        }}
      />
      <Tab.Screen
        name={strings.tabNavigator.profile}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => icons.PersonIcon({ size, color }),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeMavogation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={strings.tabNavigator.home} component={Home} />
      <Stack.Screen name="Service" component={Service} />
    </Stack.Navigator>
  );
}
