import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function MyPage() {
  return (
    <ScrollView style={styles.container}>
      {/* 상단 타이틀 */}
      <Text style={styles.mainTitle}>마이페이지</Text>

      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar} />
          <Text style={styles.username}>고양이는고양</Text>
          <TouchableOpacity>
            <Text style={styles.logout}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.settings}>환경설정</Text>
        </TouchableOpacity>
      </View>

      {/* 지갑 */}
      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>지갑</Text>
        <Text style={styles.walletAmount}>$ 10,000</Text>
        <View style={styles.walletActions}>
          <TouchableOpacity>
            <Text style={styles.walletActionText}>거래내역</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.walletActionText}>보내기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 그리드 */}
      <View style={styles.grid}>
        {[
          { id: 1, label: '오픈일까지\nD-2' },
          { id: 2, label: '오픈일까지\nD-2' },
          { id: 3, label: '오픈일 2025.06.06' },
          { id: 4, label: '오픈일까지\nD-2' },
        ].map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <Text style={styles.gridText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  logout: {
    fontSize: 14,
    color: '#888',
  },
  settings: {
    fontSize: 14,
    color: '#555',
  },
  walletCard: {
    backgroundColor: '#eee',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  walletLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  walletAmount: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  walletActionText: {
    fontSize: 14,
    color: '#555',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'flex-end',
    padding: 8,
    marginBottom: 12,
  },
  gridText: {
    fontSize: 12,
    color: '#111',
  },
});
