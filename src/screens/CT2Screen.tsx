import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Modal, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CT2Screen({ navigation }: any) {
  const [status, setStatus] = useState('config'); 
  const [name, setName] = useState('Sếp Tổng');
  const [origin, setOrigin] = useState('Việt Nam');
  const [delay, setDelay] = useState('3');
  const [showPicker, setShowPicker] = useState(false);
  
  const lastTap = useRef(0);
  const countries = ['Việt Nam', 'Hoa Kỳ', 'Nhật Bản', 'Không xác định', 'Số vệ tinh'];

  const handleRun = () => {
    setStatus('sleeping');
    setTimeout(() => { setStatus('calling'); }, parseInt(delay) * 1000);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (status !== 'config') setStatus('config');
      else navigation.goBack();
    } else { lastTap.current = now; }
  };

  if (status === 'sleeping') {
    return (
      <Pressable style={{ flex: 1, backgroundColor: '#000' }} onPress={handleDoubleTap}>
        <StatusBar hidden={true} />
      </Pressable>
    );
  }

  if (status === 'calling') {
    return (
      <Pressable style={styles.callContainer} onPress={handleDoubleTap}>
        <StatusBar hidden={true} />
        <View style={styles.callHeader}>
          {/* Ép hiện 1 dòng, tự động thu nhỏ nếu chữ quá to */}
          <Text style={styles.callName} numberOfLines={1} adjustsFontSizeToFit>{name}</Text>
          <Text style={styles.callOrigin} numberOfLines={1} adjustsFontSizeToFit>{origin}</Text>
        </View>
        
        <View style={styles.callButtons}>
          <View style={styles.actionBtn}>
            <View style={[styles.circleBtn, { backgroundColor: '#FF3B30' }]}><Ionicons name="call" size={32} color="#fff" style={{ transform: [{ rotate: '135deg' }] }}/></View>
            <Text style={styles.actionText} numberOfLines={1} adjustsFontSizeToFit>Từ chối</Text>
          </View>
          <View style={styles.actionBtn}>
            <View style={[styles.circleBtn, { backgroundColor: '#34C759' }]}><Ionicons name="call" size={32} color="#fff" /></View>
            <Text style={styles.actionText} numberOfLines={1} adjustsFontSizeToFit>Chấp nhận</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} barStyle="dark-content" />
      <Pressable style={styles.configContainer} onPress={handleDoubleTap}>
        <Text style={styles.title}>Cấu hình Cuộc gọi ảo</Text>
        <TextInput style={styles.input} placeholder="Tên người gọi" value={name} onChangeText={setName} />
        
        <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={{ color: '#111827', fontSize: 16 }}>{origin}</Text>
          <Ionicons name="chevron-down" size={20} color="#888" style={{ position: 'absolute', right: 15, top: 15 }} />
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Thời gian trễ (giây)" keyboardType="numeric" value={delay} onChangeText={setDelay} />
        <TouchableOpacity style={styles.runBtn} onPress={handleRun}>
          <Text style={styles.runBtnText}>BẮT ĐẦU</Text>
        </TouchableOpacity>
      </Pressable>

      <Modal visible={showPicker} transparent={true} animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            {countries.map((item, index) => (
              <TouchableOpacity key={index} style={styles.modalItem} onPress={() => { setOrigin(item); setShowPicker(false); }}>
                {/* Ép hiện 1 dòng cho danh sách Quốc gia */}
                <Text style={styles.modalItemText} numberOfLines={1} adjustsFontSizeToFit>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.modalItem, { borderBottomWidth: 0, marginTop: 10 }]} onPress={() => setShowPicker(false)}>
              <Text style={[styles.modalItemText, { color: '#FF3B30', fontWeight: 'bold' }]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  configContainer: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#111827' },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, borderColor: '#ddd', borderWidth: 1, color: '#111827', justifyContent: 'center' },
  runBtn: { width: '100%', height: 55, backgroundColor: '#34C759', justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginTop: 10 },
  runBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  callContainer: { flex: 1, backgroundColor: '#1C1C1E', paddingTop: 80, justifyContent: 'space-between' },
  callHeader: { alignItems: 'center', paddingHorizontal: 20 },
  callName: { color: '#fff', fontSize: 36, fontWeight: '400', marginBottom: 10, textAlign: 'center', width: '100%' },
  // FIX: Tăng width lên 100% để không bị rớt dòng
  callOrigin: { color: '#8E8E93', fontSize: 18, textAlign: 'center', width: '100%' },
  
  callButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 80, paddingHorizontal: 10 },
  // FIX: Mở rộng khung chứa nút bấm ra 150 để chứa được chữ Từ chối
  actionBtn: { alignItems: 'center', width: 150 }, 
  circleBtn: { width: 75, height: 75, borderRadius: 37.5, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionText: { color: '#fff', fontSize: 18, marginTop: 5, textAlign: 'center', width: '100%' },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F2F2F7', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 30 },
  modalItem: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd', alignItems: 'center', backgroundColor: '#fff', width: '100%' },
  modalItemText: { fontSize: 18, color: '#007AFF', textAlign: 'center', width: '100%' }
});