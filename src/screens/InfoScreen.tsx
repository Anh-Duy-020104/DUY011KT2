import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- IMPORT ẢNH CỦA BẠN TẠI ĐÂY ---
// Hãy chắc chắn file ảnh này tồn tại trong thư mục src/assets/images/
const myAvatar = require('../../assets/images/duy.jpg');

export default function InfoScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} barStyle="dark-content" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.title}>Hồ sơ Kỹ sư</Text>
        
        <View style={styles.card}>
          {/* SỬ DỤNG ẢNH CỦA BẠN */}
          <Image source={myAvatar} style={styles.avatar} />
          
          <Text style={styles.label}>Họ tên: <Text style={styles.value}>Đỗ Tấn Trần Anh Duy</Text></Text>
          <Text style={styles.label}>MSSV: <Text style={styles.value}>0308231011</Text></Text>
          <Text style={styles.label}>Lớp/Ngành: <Text style={styles.value}>Điện tử viễn thông</Text></Text>
          <Text style={styles.label}>Nơi ở: <Text style={styles.value}>Hồ Chí Minh</Text></Text>
          <Text style={styles.label}>Sở thích: <Text style={styles.value}>Lập trình Mobile, Code React Native, Chơi Game</Text></Text>
          
          {/* Sửa link ở cả 2 chỗ: trong hàm openURL và trong chữ hiển thị */}
          {/* Sửa link ở cả 2 chỗ: trong hàm openURL và trong chữ hiển thị */}
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Anh-Duy-020104/DUY011KT2.git')}>
            <Text style={styles.link}>🔗 https://github.com/Anh-Duy-020104/DUY011KT2.git</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1, padding: 20 },
  backBtn: { marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#111827', textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 20, elevation: 3, alignItems: 'flex-start', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  avatar: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 20, borderWidth: 3, borderColor: '#6366F1' },
  label: { fontSize: 16, color: '#6B7280', marginBottom: 12, fontWeight: '600' },
  value: { color: '#111827', fontWeight: 'bold' },
  link: { color: '#3B82F6', marginTop: 15, fontSize: 16, fontStyle: 'italic', alignSelf: 'center' }
});