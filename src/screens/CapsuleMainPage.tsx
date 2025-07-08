import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BUTTON_WIDTH = 300;
const PREVIEW_SIZE = 200;

const CapsuleMainPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>
          세상에 단 하나뿐인{'\n'}타임캡슐을 만들어보세요
        </Text>
        <Text style={styles.subtitle}>
          IPFS 기술로 안전하게 보관되어{'\n'}수십 년이 지나도 그대로 간직될 수 있어요
        </Text>
      </View>

      <View style={styles.previewBox} />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        accessibilityLabel="타임캡슐 시작하기"
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CapsuleMainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  headerWrapper: {
    marginTop: 200,
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'gray',
  },
  previewBox: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'center',
    width: BUTTON_WIDTH,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
