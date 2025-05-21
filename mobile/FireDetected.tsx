import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function FireDetectedScreen() {
  const [address, setAddress] = useState<string | null>(null);

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

  return (
    <View style={styles.wrapper}>
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
        <Text style={styles.timerText}>00H 03M 58S</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
});
