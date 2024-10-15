import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // To navigate between screens
import { icons } from '../constants';


const ChatScreen = () => {
  const navigation = useNavigation(); // Access navigation

  const handleTalkToAI = () => {
    // Navigate to the AudioRecorder screen
    navigation.navigate('AudioRecorder');
  };

  const handleTalkToPerson = () => {
    // Implement navigation or functionality to talk to a real person
    alert('Feature to talk to a person coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Conversation Options</Text>

        {/* Circle with Image Inside */}
        <View style={styles.waveCircle}>
          <Image
            source={icons.soundwave} // Add your image path here
            style={styles.imageInsideCircle}
          />
        </View>

        {/* Buttons Container - Align Buttons Side by Side */}
        <View style={styles.buttonContainer}>
          {/* Talk to AI Button */}
          <TouchableOpacity style={[styles.button, styles.aiButton]} onPress={handleTalkToAI}>
            <Text style={styles.buttonText}>AI Convo</Text>
          </TouchableOpacity>

          {/* Talk to a Person Button */}
          <TouchableOpacity style={[styles.button, styles.personButton]} onPress={handleTalkToPerson}>
            <Text style={styles.buttonText}>Real Convo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#302b30', // Dark background color
  },
  innerContainer: {
    padding: 20,
    marginTop: 50,
    alignItems: 'center', // Center items
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#344a73', // Purple color for the title
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#344a73', // Light purple shadow for depth
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  waveCircle: {
    width: 190,
    height: 190,
    borderRadius: 95, // To make it a circle
    backgroundColor: '#344a73', // Purple background for the circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, // Space between circle and buttons
    marginTop: 70,
  },
  imageInsideCircle: {
    width: 350,
    height: 350, // Adjust this size as needed
    resizeMode: 'contain', // Ensure the image fits nicely within the circle
    tintColor: 'black',
  },
  buttonContainer: {
    marginTop: 70,
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-between', // Space between the buttons
    width: '80%', // Ensure container is not too wide
  },
  button: {
    flex: 1,
    padding: 15,
    marginHorizontal: 10, // Space between the buttons
    borderRadius: 30,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  aiButton: {
    backgroundColor: '#9b59b6', // Purple button for AI
    shadowColor: '#9b59b6', // Shadow color matching the button
  },
  personButton: {
    backgroundColor: '#9b59b6', // Orange button for Person
    shadowColor: '#9b59b6', // Shadow color matching the button
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
