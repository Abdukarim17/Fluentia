import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from vector-icons
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AudioRecorder() {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [audioLevel, setAudioLevel] = useState(new Animated.Value(100)); // Initial circle size

  useEffect(() => {
    if (recording) {
      // Continuously monitor audio levels while recording
      const interval = setInterval(async () => {
        const status = await recording.getStatusAsync();
        if (status && status.metering) {
          const volume = status.metering; // Get the volume level
          const normalizedVolume = Math.max(100, Math.min(300, volume * 5)); // Normalize the volume between 100 and 300

          // Animate the circle size based on the volume
          Animated.timing(audioLevel, {
            toValue: normalizedVolume,
            duration: 100,
            useNativeDriver: false,
          }).start();
        }
      }, 100); // Check every 100ms

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [recording]);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        setRecordingStatus('Permission to access microphone not granted');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setRecordingStatus('Recording started...');
    } catch (err) {
      setRecordingStatus('Failed to start recording: ' + err.message);
    }
  }

  async function stopRecording() {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const newUri = FileSystem.documentDirectory + 'audio_' + Date.now() + '.m4a';
      await FileSystem.moveAsync({ from: uri, to: newUri });
      setRecordingStatus(`Recording saved at ${newUri}`);
      sendToBackend(newUri);
    } catch (err) {
      setRecordingStatus('Failed to stop recording: ' + err.message);
    }
    setRecording(null);
  }

  async function sendToBackend(uri) {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', { uri, name: 'audio.m4a', type: 'audio/m4a' });

      const response = await fetch('http://your-backend-url/api/upload-audio', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setRecordingStatus('File uploaded successfully');
      } else {
        setRecordingStatus('Upload failed');
      }
    } catch (err) {
      setRecordingStatus('Error during upload: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Moved text to the top */}
      <Text style={styles.title}>AI Voice Recorder</Text>

      {/* Animated Circle based on volume */}
      <Animated.View style={[styles.circle, { width: audioLevel, height: audioLevel }]} />

      <Text style={styles.status}>{recordingStatus}</Text>

      <TouchableOpacity
        style={[styles.recordButton, recording ? styles.stopButton : styles.startButton]}
        onPress={recording ? stopRecording : startRecording}
      >
        <Ionicons
          name={recording ? 'stop-circle' : 'mic-circle'}
          size={70}
          color={recording ? '#ff4d4d' : '#9b59b6'}
        />
      </TouchableOpacity>

      {isUploading && (
        <ActivityIndicator size="large" color="#9b59b6" style={styles.uploadIndicator} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: '#9b59b6',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    position: 'absolute',
    top: 40, // Moves the text to the top of the screen
  },
  circle: {
    borderRadius: 150, // Makes it a circle
    backgroundColor: '#9b59b6',
    marginBottom: 40,
  },
  recordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 50,
  },
  startButton: {
    shadowColor: '#9b59b6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  stopButton: {
    shadowColor: '#ff4d4d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  status: {
    fontSize: 18,
    color: '#dcdcdc',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  uploadIndicator: {
    marginTop: 20,
  },
});
