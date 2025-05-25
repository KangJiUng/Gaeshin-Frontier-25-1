import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";
import { useEvacuationStore } from "./useEvacuationStore"; // ✅ zustand 훅 가져오기

export default function FireDetectedScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { state, setState, secondsElapsed, startTimer } = useEvacuationStore();

  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    startTimer(); // ✅ 컴포넌트 마운트 시 타이머 시작
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (geo.length > 0) {
        const info = geo[0];
        const name = info.name || "";
        const street = info.street || "";
        const region = info.region || "";
        setAddress(`${region} ${name || street}`);
      }
    })();
  }, []);

  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <ScrollView
      style={{ backgroundColor: "#f0f0f0" }}
      contentContainerStyle={styles.wrapper}
    >
      <View style={styles.header}>
        <Text style={styles.title}>나의 위치</Text>
        <Text style={styles.location}>{address || "위치 불러오는 중..."}</Text>
        <Text style={styles.subtext}>
          가까운 곳에서 <Text style={styles.highlight}>화재가 발생</Text>
          하였습니다.{"\n"}
          아래의 안내도에 따라 신속히 이동해주세요.
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <Image
          style={styles.mapImage}
          source={{ uri: "https://via.placeholder.com/1x1.png" }}
        />
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.fireText}>화재가 감지된 지</Text>
        <Text style={styles.timerText}>
          {pad(hours)}H {pad(minutes)}M {pad(seconds)}S
        </Text>
      </View>
      <View style={{ padding: 10 }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* 홈으로 */}
        <TouchableOpacity
          style={styles.homeContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <View style={styles.iconWrapper}>
            <Feather name="home" size={80} color="rgba(0,0,0,0.1)" />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.buttonText}>홈으로</Text>
          </View>
        </TouchableOpacity>

        {/* 대피 완료 */}
        <TouchableOpacity
          style={styles.homeContainer}
          onPress={() => {
            setState("completed"); // ✅ 상태 바꾸면 자동으로 타이머 리셋
            navigation.navigate("Home");
          }}
        >
          <View style={styles.iconWrapper}>
            <Feather name="check-circle" size={80} color="rgba(0,128,0,0.1)" />
          </View>
          <View style={styles.textWrapper}>
            <Text style={{ ...styles.buttonText, color: "green" }}>
              대피 완료
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 15 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  header: {
    marginBottom: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  location: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 18,
    color: "#555",
    lineHeight: 22,
  },
  highlight: {
    color: "red",
    fontWeight: "bold",
  },
  mapContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 65,
    marginBottom: 20,
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  timerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
  },
  fireText: {
    color: "red",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  timerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  homeContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 52,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  iconWrapper: {
    position: "absolute",
    width: 80,
    height: 80,
    zIndex: 0,
  },
  textWrapper: {
    zIndex: 1,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
