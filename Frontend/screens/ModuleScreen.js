import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Add this import
import { icons } from '../constants';


export default function ModuleScreen() {
  const navigation = useNavigation();

  const lessons = [
    { title: 'Alphabet' },
    { title: 'Greetings' },
    { title: 'Numbers' },
    { title: 'Colors' },
    { title: 'Shapes' },
    { title: 'Animals' },
  ];

  const activities = [
    { title: 'Drawing', learned: false },
    { title: 'Matching', learned: true },
    { title: 'Basic Writing', learned: false },

  ];

  const renderLessonItem = ({ item }) => (
    <View style={styles.lessonBox}>
      <Text style={styles.boxText}>{item.title}</Text>
    </View>
  );

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityBox}>
      <Text style={styles.boxText}>{item.title}</Text>
      <Text style={item.learned ? styles.learnedText : styles.notLearnedText}>
        {item.learned ? 'Learned' : 'Not yet learned'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className='flex-1 bg-primary'>
    <LinearGradient
      colors={['#161622', '#161622']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.leftArrow} style={styles.backButton} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Module #1: Letters</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '33%' }]} />
        </View>

        <Text style={styles.sectionTitle}>Lessons:</Text>
        <FlatList
          data={lessons}
          renderItem={renderLessonItem}
          keyExtractor={(item, index) => `lesson-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <Text style={styles.sectionTitle}>Activities to learn:</Text>
        <FlatList
          data={activities}
          renderItem={renderActivityItem}
          keyExtractor={(item, index) => `activity-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <Text style={styles.sectionTitle}>Quizzes:</Text>
        <View style={styles.quizContainer}>
          <TouchableOpacity 
            style={[styles.quizButton, styles.quizButtonActive]}
            onPress={() => navigation.navigate('Lesson', { quizId: 1 })}
          >
            <Text style={styles.quizButtonText}>#1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizButton} disabled>
            <Text style={styles.quizButtonText}>#2</Text>
            <Text style={styles.lockedText}>Locked</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizButton} disabled>
            <Text style={styles.quizButtonText}>#3</Text>
            <Text style={styles.lockedText}>Locked</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#3a3a4a',
    borderRadius: 5,
    marginBottom: 20,
  },
  progress: {
    height: '100%',
    backgroundColor: '#9b59b6',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  horizontalList: {
    paddingBottom: 20,
  },
  lessonBox: {
    width: 110, // Reduced from 120
    height: 75, // Reduced from 80
    backgroundColor: '#3a3a4a',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8, // Reduced from 10
  },
  activityBox: {
    width: 110, // Reduced from 120
    height: 75, // Reduced from 80
    backgroundColor: '#3a3a4a',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8, // Reduced from 10
  },
  boxText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 3, // Reduced from 5
    fontSize: 13, // Added to make text slightly smaller
  },
  learnedText: {
    color: '#4CAF50',
    fontSize: 11, // Reduced from 12
    textAlign: 'center',
  },
  notLearnedText: {
    color: '#888',
    fontSize: 11, // Reduced from 12
    textAlign: 'center',
  },
  quizContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quizButton: {
    width: '30%',
    aspectRatio: 2,
    backgroundColor: '#3a3a4a',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizButtonActive: {
    backgroundColor: '#9b59b6',
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lockedText: {
    color: '#888',
    fontSize: 12,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40, // Adjust this value based on your device's status bar height
    paddingBottom: 10,
  },
});