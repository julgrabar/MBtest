import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";

export default BtnScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={() => Alert.alert("ok")}
      >
        <Text>Press me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    padding: 20,
    backgroundColor: "#00BFFF",
    borderRadius: 10,
  },
});
