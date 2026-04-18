import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <View style={styles.logoEsc}>
            <Text style={styles.logoText}>ESC</Text>
          </View>
          <Text style={styles.title}>Thoát Hiểm</Text>
          <Text style={styles.subtitle}>Công cụ hỗ trợ khẩn cấp</Text>
        </View>
        
        <View style={styles.grid}>
          
          {/* Đã sửa thành CT1 - Sạc pin ảo */}
          {/* Đã sửa icon thành Sạc pin (màu cam) */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CT1')}>
            <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="battery-charging" size={28} color="#F59E0B" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>CT1</Text>
              <Text style={styles.cardDesc}>Sạc pin ảo</Text>
            </View>
          </TouchableOpacity>

          {/* Đã sửa thành CT2 - Cuộc gọi ảo */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CT2')}>
            <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="call" size={28} color="#22C55E" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>CT2</Text>
              <Text style={styles.cardDesc}>Cuộc gọi ảo</Text>
            </View>
          </TouchableOpacity>

          {/* Đã sửa thành CT3 - Chữ chạy LED */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CT3')}>
            <View style={[styles.iconBox, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="chatbubble-ellipses" size={28} color="#3B82F6" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>CT3</Text>
              <Text style={styles.cardDesc}>Bảng LED tín hiệu</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Info')}>
            <View style={[styles.iconBox, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="person" size={28} color="#A855F7" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Thông tin</Text>
              <Text style={styles.cardDesc}>Hồ sơ sinh viên</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F2F2F7', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 40 
  },
  logoEsc: {
    width: 80, 
    height: 80, 
    backgroundColor: '#FFFFFF',
    borderWidth: 4, 
    borderColor: '#111827',
    borderRadius: 20,
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoText: { 
    fontSize: 24, 
    fontWeight: '900', 
    color: '#111827',
    letterSpacing: 1
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#111827',
    marginBottom: 5
  },
  subtitle: { 
    fontSize: 16, 
    color: '#6B7280', 
    fontWeight: '500' 
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    rowGap: 15 
  },
  card: { 
    width: '48%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  cardTextContainer: {
    justifyContent: 'flex-end'
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#111827',
    marginBottom: 4
  },
  cardDesc: { 
    fontSize: 13, 
    color: '#9CA3AF',
    fontWeight: '500'
  }
});