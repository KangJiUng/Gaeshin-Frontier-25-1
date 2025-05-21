import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const contacts = [
  {
    label: "소방서",
    url: "https://safekorea.go.kr/idsiSFK/neo/sfk/cs/ppn/tel/firsUserList.html?menuSeq=144",
    iconSet: FontAwesome5,
    iconName: "fire-extinguisher",
  },
  {
    label: "경찰서",
    url: "https://safekorea.go.kr/idsiSFK/neo/sfk/cs/ppn/tel/policeUserList.html?menuSeq=889",
    iconSet: Feather,
    iconName: "shield",
  },
  {
    label: "일반병원",
    url: "https://safekorea.go.kr/idsiSFK/neo/sfk/cs/ppn/tel/medicalUserList.html?menuSeq=148",
    iconSet: FontAwesome5,
    iconName: "hospital-alt",
  },
  {
    label: "약국",
    url: "https://safekorea.go.kr/idsiSFK/neo/sfk/cs/ppn/tel/drugstoreUserList.html?menuSeq=150",
    iconSet: MaterialCommunityIcons,
    iconName: "pill",
  },
  {
    label: "혈액원",
    url: "https://safekorea.go.kr/idsiSFK/neo/sfk/cs/ppn/tel/bloodUserList.html?menuSeq=151",
    iconSet: Feather,
    iconName: "droplet",
  },
  {
    label: "응급 의료 센터",
    url: "https://safekorea.go.kr/idsiSFK/neo/sfk/cs/ppn/tel/emrUserList.html?menuSeq=890",
    iconSet: MaterialCommunityIcons,
    iconName: "hospital-box",
  },
];

export default function EmergencyContactsModal({ visible, onClose }) {
  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>비상연락망</Text>
          <ScrollView contentContainerStyle={styles.list}>
            {contacts.map(({ label, url, iconSet: Icon, iconName }) => (
              <TouchableOpacity
                key={label}
                style={styles.item}
                onPress={() => openURL(url)}
              >
                <Icon name={iconName} size={28} color="#555" />
                <Text style={styles.label}>{label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "70%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    flexGrow: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  label: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
});
