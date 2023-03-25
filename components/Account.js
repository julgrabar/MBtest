import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { deleteItemFromAsyncStorage } from "./AsyncStorageMethods";

//import {getItemFromAsyncStorage, mergeItemInAsyncStorage, deleteItemFromAsyncStorage} from './AsyncStorageMethods'

export default function Account({ userData, setUserData }) {
  const { navigate } = useNavigation();

  const handleLogout = () => {
    deleteItemFromAsyncStorage("user");
    setUserData(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        {userData && (
          <>
            <Image
              source={{ uri: userData.userAvatar }}
              style={styles.avatar}
            />
            <Text style={styles.text}>{userData.name}</Text>
            <Text style={styles.text}>{userData.email}</Text>
            <Text style={styles.logoutText} onPress={handleLogout}>
              Вийти з профілю
            </Text>
            <Text style={styles.link} onPress={() => navigate("Settings")}>
              Перейти до налаштувань
            </Text>
          </>
        )}
        {!userData && <Text>Ви не авторизовані</Text>}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 0,
    paddingTop: 44,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontFamily: "Delicious",
  },
  link: {
    marginTop: 80,
    color: "#00BFFF",
  },
  logoutText: {
    color: "red",
    marginTop: 20,
  },
});
