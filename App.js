import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { gStyle } from "./Style/style";
import TabNavigation from "./navigate";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  getItemFromAsyncStorage,
  storeItemToAsyncStorage,
} from "./components/AsyncStorageMethods";
import { CURRENT_USER_ID, statusList } from "./constants";

const fonts = {
  "Roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  Delicious: require("./assets/fonts/DeliciousHandrawn-Regular.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(statusList.IDLE);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    setStatus(statusList.LOAD);
    fetch("https://moduleblocks.net/testing/Users.json")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
        setStatus(statusList.IDLE);
        const user = response.find((el) => el._id === CURRENT_USER_ID);
        if (user) storeItemToAsyncStorage("user", user);
      })
      .catch((error) => {
        setStatus(statusList.ERR);
        console.error(error);
      });
  }, []);

  const getUserData = async () => {
    const newItem = await getItemFromAsyncStorage("user");
    /// wait until loaded
    if (newItem) {
      // set state
      setUserData(newItem);
    }
  };

  useEffect(() => {
    /// call it once by this method
    getUserData();
  }, []);

  return (
    <View style={gStyle.main} onLayout={onLayoutRootView}>
      <TabNavigation
        userData={userData}
        setUserData={setUserData}
        status={status}
        users={users}
      />
    </View>
  );
}
