void setup() {
  // 모든 디지털 핀 (1 ~ 13) OUTPUT 및 초기화
  for (int i = 1; i <= 13; i++) {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW);
  }

  // 3초 대기
  delay(3000);
  for (int i = 1; i <= 5; i += 2) {
    digitalWrite(i, HIGH);  
  }
  for (int i = 6; i <= 12; i += 2) {
    digitalWrite(i, HIGH);  
  }

  // 추가로 12초 대기 (총 15초 경과 시점)
  delay(15000);
  for (int i = 1; i <= 5; i += 2) {
    digitalWrite(i, LOW);  
  }
  for (int i = 8; i <= 12; i += 2) {
    digitalWrite(i, LOW);  
  }
  for (int i = 2; i <= 4; i += 2) {
    digitalWrite(i, HIGH);  
  }
  for (int i = 7; i <= 13; i += 2) {
    digitalWrite(i, HIGH);  
  }
}

void loop() {
  // 아무 동작 없음 (setup에서 한 번만 실행됨)
}
