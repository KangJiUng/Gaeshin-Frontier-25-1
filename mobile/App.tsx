import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import EmergencyContactsModal from "./EmergencyContactsModal";
import { useEvacuationStore } from "./useEvacuationStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { state } = useEvacuationStore();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <View style={styles.headerCenter}>
          <Text style={styles.headerText}>안전한 화재 대피를 위해</Text>
          <Text style={styles.appName}>EZ-IT</Text>
        </View>
        <TouchableOpacity style={styles.headerRight}>
          <Feather name="settings" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: "#333",
              marginBottom: 20,
            }}
          >
            내 주변 안전 시설
          </Text>
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                openURL(
                  "https://m.safekorea.go.kr/idsiSFK/neo/main_m/res/evacuateList.html"
                )
              }
            >
              <Feather
                name="map"
                size={40}
                color="#555"
                style={styles.iconImage}
              />
              <Text style={styles.iconLabel}>대피소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                openURL(
                  "https://www.nfds.go.kr/bbs/selectBbsList.do?bbs=B14&pageNo=1"
                )
              }
            >
              <Feather
                name="alert-circle"
                size={40}
                color="#555"
                style={styles.iconImage}
              />
              <Text style={styles.iconLabel}>화재정보</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setModalVisible(true)}
            >
              <Feather
                name="phone-call"
                size={40}
                color="#555"
                style={styles.iconImage}
              />
              <Text style={styles.iconLabel}>비상연락망</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                openURL(
                  "https://www.sejong.go.kr/prog/shelter/T/depart/sub01_0810/list.do"
                )
              }
            >
              <Feather
                name="home"
                size={40}
                color="#555"
                style={styles.iconImage}
              />
              <Text style={styles.iconLabel}>임시주거시설</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: "#333",
              marginBottom: -38,
            }}
          >
            화재 대피 요령
          </Text>

          <View style={{ ...styles.imageWrapper, marginBottom: -100 }}>
            <Image
              source={require("./assets/images/fire_guide_2.jpg")}
              style={styles.guideImage}
            />
          </View>
          <View style={{ ...styles.imageWrapper, marginBottom: -65 }}>
            <Image
              source={require("./assets/images/fire_guide_3.jpg")}
              style={styles.guideImage}
            />
          </View>
          <Image
            source={require("./assets/images/fire_guide_1.jpg")}
            style={styles.guideImage}
          />
          <View
            style={{
              ...styles.imageWrapper,
              marginTop: -17,
              marginBottom: -5,
            }}
          ></View>
        </View>
      </ScrollView>

      <EmergencyContactsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {state === "detected" && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate("FireDetected")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="exit-run" size={28} color="#fff" />
            <Text style={[styles.buttonText, { marginLeft: 10 }]}>
              대피화면으로
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {/* 화재대피화면 테스트용 코드 */}
      {__DEV__ && (
        <TouchableOpacity
          style={[
            styles.floatingButton,
            { bottom: 100, backgroundColor: "#555" },
          ]}
          onPress={() => {
            navigation.navigate("FireDetected");
            useEvacuationStore.getState().setState("detected");
          }}
        >
          <Feather name="tool" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerLeft: {
    width: 24,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerRight: {
    width: 24,
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  appName: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  iconButton: {
    alignItems: "center",
    marginBottom: 10,
  },
  iconImage: {
    marginBottom: 6,
  },
  iconLabel: {
    fontSize: 13,
    color: "#555",
  },
  imageWrapper: {
    width: "100%",
    marginBottom: 16,
  },
  guideImage: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    left: 25,
    right: 25,
    backgroundColor: "#009900",
    borderRadius: 50,
    padding: 16,
    elevation: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
