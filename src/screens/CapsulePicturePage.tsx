import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 24;
const ITEM_MARGIN = 12;
const NUM_COLUMNS = 4;
const PREVIEW_SIZE = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;

const ITEM_SIZE =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - ITEM_MARGIN * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

const dummyData = Array.from({ length: 16 }, (_, i) => ({ id: i.toString() }));

const CapsulePicturePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          accessibilityLabel="닫기"
          activeOpacity={0.8}
        >
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>

        <Text style={styles.title}>사진/영상 선택</Text>

        <TouchableOpacity
          accessibilityLabel="다음으로 이동"
          activeOpacity={0.8}
        >
          <Text style={styles.nextText}>다음</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previewBox} />

      <Text style={styles.recentText}>최근항목 ▼</Text>

      <FlatList
        data={dummyData}
        numColumns={NUM_COLUMNS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View key={item.id} style={styles.imageBox} />}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: ITEM_MARGIN,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CapsulePicturePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeText: {
    fontSize: 18,
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  nextText: {
    fontSize: 16,
    color: '#007AFF',
  },
  previewBox: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    marginBottom: 20,
  },
  recentText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  imageBox: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
  },
});
