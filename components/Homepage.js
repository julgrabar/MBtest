import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { ITEMS_PER_PAGE, statusList } from "../constants";
//import {getItemFromAsyncStorage, mergeItemInAsyncStorage, deleteItemFromAsyncStorage} from './AsyncStorageMethods'
const getShownUsers = (data, page) => {
  return data.slice(0, page * ITEMS_PER_PAGE);
};

const UserItem = ({ item }) => {
  return (
    <View style={styles.userItem}>
      <Image source={{ uri: item.userAvatar }} style={styles.userAvatar} />
      <View>
        <Text style={styles.userName}>{item.name}</Text>
        <Text>{item.email}</Text>
      </View>
    </View>
  );
};

const ListFooter = (setPage) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => setPage((prev) => prev + 1)}
        style={styles.button}
      >
        <Text>Load more</Text>
      </TouchableOpacity>
    </View>
  );
};
export default function Homepage({ userData, setUserData, users, status }) {
  const [page, setPage] = useState(1);
  const totalPages = users.length / ITEMS_PER_PAGE;

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.homeView}>
          {status === statusList.IDLE && users && (
            <FlatList
              style={{ marginBottom: -10 }}
              data={getShownUsers(users, page)}
              renderItem={UserItem}
              keyExtractor={(item) => item._id}
              ListFooterComponent={totalPages > page && ListFooter(setPage)}
            />
          )}
          {status === statusList.LOAD && <Text>Loading...</Text>}
          {status === statusList.ERR && <Text>Something went wrong..</Text>}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 0,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  homeView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  userItem: {
    flex: 1,
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 30,
  },
  userName: { color: "black", fontSize: 20 },
  footer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#00BFFF",
    borderRadius: 10,
  },
});
