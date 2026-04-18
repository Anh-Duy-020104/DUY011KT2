import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StatusBar, StyleSheet, View } from 'react-native';

export default function CT1Screen({ navigation }: any) {
  const lastTap = useRef(0);
  
  // Chỉnh lại để không bị biến mất hoàn toàn, nhấp nháy mờ mờ (từ 0.2 đến 1)
  const blinkAnim = useRef(new Animated.Value(0.2)).current;

  // Hiệu ứng nhấp nháy cho lõi pin đỏ
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 0.2, duration: 800, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) navigation.goBack();
    else lastTap.current = now;
  };

  return (
    <Pressable style={styles.container} onPress={handleDoubleTap}>
      <StatusBar hidden={true} />

      {/* Vỏ cục pin */}
      <View style={styles.batteryWrapper}>
        <View style={styles.batteryBody}>
          {/* Lõi màu đỏ được gắn hiệu ứng nhấp nháy */}
          <Animated.View style={[styles.redSliver, { opacity: blinkAnim }]} />
        </View>
        <View style={styles.batteryTip} />
      </View>

      {/* Khu vực tia sét và chuôi cắm sạc (ĐỨNG IM) */}
      <View style={styles.chargeIndicator}>
        <Ionicons name="flash" size={30} color="#fff" />
        <View style={styles.plugBody} />
        <View style={styles.plugCord} />
      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  
  // Style vẽ cục pin
  batteryWrapper: { flexDirection: 'row', alignItems: 'center', transform: [{ scale: 1.5 }], marginBottom: 60 },
  batteryBody: { width: 100, height: 45, borderWidth: 1.5, borderColor: '#fff', borderRadius: 8, padding: 2, justifyContent: 'flex-start' },
  redSliver: { width: '12%', height: '100%', backgroundColor: '#FF3B30', borderRadius: 4 }, // Lõi đỏ siêu ít
  batteryTip: { width: 5, height: 15, backgroundColor: '#fff', borderTopRightRadius: 4, borderBottomRightRadius: 4, opacity: 0.8 },
  
  // Style vẽ phích cắm
  chargeIndicator: { alignItems: 'center', position: 'absolute', bottom: '20%' },
  plugBody: { width: 16, height: 25, backgroundColor: '#fff', borderTopLeftRadius: 4, borderTopRightRadius: 4, marginTop: 5 },
  plugCord: { width: 3, height: 50, backgroundColor: '#fff' }
});