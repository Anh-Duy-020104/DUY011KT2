import Slider from '@react-native-community/slider';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CT3Screen({ navigation }: any) {
  const [isRunning, setIsRunning] = useState(false);
  const [text, setText] = useState('SOS! ĐẾN ĐÓN TÔI VỚI!');
  const [speed, setSpeed] = useState(5); 
  
  const lastTap = useRef(0);
  const screenWidth = Dimensions.get('window').height;
  const translateX = useRef(new Animated.Value(0)).current;

  const formattedText = text.replace(/ /g, '\u00A0');
  const separator = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
  const textArray = new Array(15).fill(formattedText + separator);

  useEffect(() => {
    if (isRunning) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      
      translateX.setValue(screenWidth);

      const duration = 250000 / speed; 

      const animation = Animated.loop(
        Animated.timing(translateX, {
          toValue: -15000, 
          duration: duration, 
          useNativeDriver: true, 
          easing: Easing.linear,
        })
      );
      
      animation.start();

      return () => {
        animation.stop();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      translateX.stopAnimation();
    }
  }, [isRunning, speed, text]);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (isRunning) setIsRunning(false);
      else navigation.goBack();
    } else {
      lastTap.current = now;
    }
  };

  if (isRunning) {
    return (
      <Pressable style={styles.ledContainer} onPress={handleDoubleTap}>
        <StatusBar hidden={true} /> 
        
        <Animated.View style={[styles.ledRow, { transform: [{ translateX }] }]}>
          {textArray.map((item, index) => (
            <Text key={index} style={styles.ledText} numberOfLines={1}>
              {item}
            </Text>
          ))}
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} barStyle="dark-content" />
      <Pressable style={styles.configContainer} onPress={handleDoubleTap}>
        <Text style={styles.title}>Cấu hình Bảng LED</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Nhập nội dung chữ chạy" 
          value={text} 
          onChangeText={setText} 
        />

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Chỉnh tốc độ:</Text>
          <View style={styles.sliderRow}>
            <Text style={styles.speedLabel}>Chậm</Text> 
            <Slider
              style={{ flex: 1, height: 40, marginHorizontal: 10 }}
              minimumValue={1}  
              maximumValue={10} 
              value={speed}
              onValueChange={(val) => setSpeed(val)}
              minimumTrackTintColor="#3B82F6"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#3B82F6"
            />
            <Text style={styles.speedLabel}>Nhanh</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.runBtn} onPress={() => setIsRunning(true)}>
          <Text style={styles.runBtnText}>BẮT ĐẦU PHÁT CHỮ</Text>
        </TouchableOpacity>
        
        <Text style={{color: '#888', marginTop: 20}}>(Nhấn đúp để thoát về Home)</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  configContainer: { flex: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#111827' },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 20, fontSize: 16, borderColor: '#ddd', borderWidth: 1 },
  
  sliderContainer: { width: '100%', backgroundColor: '#fff', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', marginBottom: 30 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#111827' },
  sliderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  speedLabel: { fontSize: 14, fontWeight: 'bold', color: '#6B7280' },

  runBtn: { width: '100%', height: 55, backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  runBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  ledContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  
  // ĐÃ FIX: Thêm position absolute và width siêu to để chữ dàn hàng mượt mà
  ledRow: { 
    flexDirection: 'row', 
    position: 'absolute', 
    width: 30000 
  },
  ledText: { color: '#FF0000', fontSize: 150, fontWeight: '900' }
});