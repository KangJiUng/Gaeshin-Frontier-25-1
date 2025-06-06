import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from "react-native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./index";
import { useEvacuationStore } from "./useEvacuationStore";

export default function FireDetectedScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    state,
    setState,
    secondsElapsed,
    startTimer,
    dotTop: storedTop,
    dotLeft: storedLeft,
    setDotPosition,
    animationStep,
    setAnimationStep,
  } = useEvacuationStore();

  const [address, setAddress] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState(
    require("./assets/images/exit1.png")
  );
  const [showAlertText, setShowAlertText] = useState(false);
  const [showDangerImage, setShowDangerImage] = useState(false);

  const dotTop = useRef(new Animated.Value(storedTop)).current;
  const dotLeft = useRef(new Animated.Value(storedLeft)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (animationStep === 0) {
      Animated.sequence([
        Animated.timing(dotTop, {
          toValue: 220,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(dotLeft, {
          toValue: 210,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setImageSource(require("./assets/images/exit2.png"));
          setShowAlertText(true);
          setShowDangerImage(true);
          setAnimationStep(1);

          Animated.loop(
            Animated.sequence([
              Animated.timing(blinkAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }),
              Animated.timing(blinkAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
              }),
            ])
          ).start();
        }
      });
    }

    if (animationStep === 1) {
      Animated.sequence([
        Animated.timing(dotLeft, {
          toValue: 285,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(dotTop, {
          toValue: 80,
          duration: 4500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(dotLeft, {
          toValue: 320,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start(() => setAnimationStep(2));
    }
  }, [animationStep]);

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

  const pad = (num: number) => num.toString().padStart(2, "0");
  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

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
        {showAlertText && (
          <Animated.Text
            style={[styles.alertOverlayText, { opacity: blinkAnim }]}
          >
            대피 경로가 변경되었습니다!
          </Animated.Text>
        )}
        <Image style={styles.mapImage} source={imageSource} />
        {showDangerImage && (
          <Image
            source={require("./assets/images/danger.png")}
            style={[styles.dangerIcon, { top: 210, left: 310 }]}
          />
        )}
        <Animated.View
          style={[
            styles.redDot,
            {
              top: dotTop,
              left: dotLeft,
            },
          ]}
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
        <TouchableOpacity
          style={styles.homeContainer}
          onPress={() => {
            dotTop.stopAnimation((topVal) => {
              dotLeft.stopAnimation((leftVal) => {
                setDotPosition(topVal, leftVal);
                navigation.navigate("Home");
              });
            });
          }}
        >
          <View style={styles.iconWrapper}>
            <Feather name="home" size={80} color="rgba(0,0,0,0.1)" />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.buttonText}>홈으로</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeContainer}
          onPress={() => {
            Alert.alert(
              "안전하게 대피하셨나요?",
              "",
              [
                {
                  text: "예",
                  onPress: () => {
                    setState("idle");
                    setAnimationStep(0);
                    navigation.navigate("Home");
                  },
                },
                {
                  text: "아니오",
                  onPress: () => {
                    setState("detected");
                    setAnimationStep(0);
                    navigation.navigate("FireDetected");
                  },
                  style: "destructive",
                },
              ],
              { cancelable: false }
            );
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
  wrapper: { flexGrow: 1, backgroundColor: "#f0f0f0", padding: 16 },
  header: { marginBottom: 20, marginTop: 60 },
  title: { fontSize: 30, fontWeight: "bold", color: "#333", marginBottom: 4 },
  location: { fontSize: 36, fontWeight: "600", marginBottom: 10 },
  subtext: {
    fontSize: 18,
    color: "#555",
    lineHeight: 22,
    marginBottom: 8,
  },
  highlight: { color: "red", fontWeight: "bold" },
  mapContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    position: "relative",
  },
  alertOverlayText: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    zIndex: 2,
  },
  dangerIcon: {
    position: "absolute",
    resizeMode: "contain",
    width: 30,
    height: 30,
    zIndex: 3,
  },
  mapImage: { width: 350, height: 300, resizeMode: "contain" },
  redDot: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "red",
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
  timerText: { fontSize: 32, fontWeight: "bold", color: "#333" },
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
  textWrapper: { zIndex: 1 },
  buttonText: { fontSize: 24, fontWeight: "bold", color: "#333" },
});
