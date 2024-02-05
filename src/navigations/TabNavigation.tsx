import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Appointments, Home, Profile } from "@screens";
import { colors } from "@utils";
import { useUser } from "@clerk/clerk-expo";
import { UserContext, UserContextPropsType, UserDataType } from "@contexts";
import React from "react";

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  const [userData, setUserData] = React.useState<UserDataType | null>(null);
  const { isSignedIn, user } = useUser();

  React.useEffect(() => {
    if (isSignedIn) {
      setUserData({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.primaryEmailAddress?.emailAddress ?? null,
        role: "user",
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user]);

  const contextValue: UserContextPropsType = React.useMemo(
    () => ({ userData: userData, setUserData: setUserData }),
    [userData, setUserData]
  );

  return (
    <UserContext.Provider value={contextValue}>
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
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Appointments"
          component={Appointments}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}
