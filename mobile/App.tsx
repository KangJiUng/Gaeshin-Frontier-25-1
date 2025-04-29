import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>안전한 화재 대피를 위해</Text>
        <Text style={styles.appName}>EZ-IT</Text>

        {/* 🔻 아이콘 자리 (아직 기능 없음, 클릭해도 아무 동작 없음) */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconPlaceholder} />
          <TouchableOpacity style={styles.iconPlaceholder} />
          <TouchableOpacity style={styles.iconPlaceholder} />
          <TouchableOpacity style={styles.iconPlaceholder} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("./assets/images/fire_guide_1.jpg")}
          style={styles.guideImage}
        />
        <Image
          source={require("./assets/images/fire_guide_2.jpg")}
          style={styles.guideImage}
        />
        <Image
          source={require("./assets/images/fire_guide_3.jpg")}
          style={styles.guideImage}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerText: {
    paddingTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  appName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: "#e0f0e9",
    borderRadius: 10,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  guideImage: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
