import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import firebase from "@firebase/helpers";
import { Expandable } from "@components/shared";
import { colors, icons, strings } from "@utils";

interface UsersListProps {
  name: string;
  phone: string;
  uid: string;
}

export function UsersList() {
  const [users, setUsers] = React.useState<UsersListProps[]>([]);

  React.useEffect(() => {
    const fetchUsersList = async () => {
      const usersInStorage = await firebase.getAllUsersFromCloud();
      setUsers(usersInStorage ?? []);
    };

    fetchUsersList();
  }, []);

  const noUserInList = React.useMemo(
    () => (
      <View>
        <Text>{strings.usersAdmin.noUserInList}</Text>
      </View>
    ),
    [strings.usersAdmin.noUserInList]
  );

  const title =
    users.length === 0
      ? strings.loading
      : `${strings.usersAdmin.mainHeading} (${users.length})`;

  return (
    <Expandable title={title}>
      <FlatList
        data={users}
        bounces={false}
        style={{ maxHeight: Dimensions.get("window").height * 0.4 }}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={noUserInList}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.infoContainer,
              index === users.length - 1 ? styles.lastInfoContainer : null,
            ]}
          >
            <View style={styles.infoWrapper}>
              {icons.UserIcon({ size: 22, color: "gray" })}
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                {item.name.length != 0 ? item.name : strings.usersAdmin.noName}
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              {icons.TelIcon({ size: 22, color: "gray" })}
              <Text>{item.phone}</Text>
            </View>
          </View>
        )}
      />
    </Expandable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  lastInfoContainer: {
    borderBottomWidth: 0,
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "50%",
  },
});
