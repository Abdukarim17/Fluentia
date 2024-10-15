// screens/LevelScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LevelScreen = () => {
  const userLevel = 3; // Placeholder for user level

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Current Level</Text>
      <Text style={styles.levelText}>Level: {userLevel}</Text>
      <Text style={styles.text}>Keep progressing to unlock more lessons!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  levelText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default LevelScreen;
