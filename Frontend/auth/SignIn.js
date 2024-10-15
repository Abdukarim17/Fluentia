import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Updated import
import { Globe } from 'lucide-react-native';
import { useGlobalContext } from '../contexts/GlobalContext'; // Import GlobalContext to use loginRequest

export default function SignIn({ navigation }) {
  const { loginRequest, loading, error } = useGlobalContext(); // Use loginRequest from GlobalContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      // Call the login request with email and password
      const success = await loginRequest(email, password);
  
      if (success) {
        // Navigate to the main app screen on successful login
        navigation.navigate('MainApp');
      } else {
        // If login fails, display an alert with the error message
        Alert.alert('Sign In Failed', error || 'Invalid email or password');
      }
    } catch (err) {
      // Handle unexpected errors during the login process
      console.error('Login error:', err);
      Alert.alert('Sign In Failed', 'Something went wrong. Please try again.');
    }
  };
  

  return (
    <LinearGradient
      colors={['#1a1b5c', '#281e7d']} // Deep purple to indigo gradient
      style={[styles.container, { justifyContent: 'space-between', paddingVertical: 250 }]} // Updated style
    >
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Globe width={24} height={24} color="#38b2ac" />
          <Text style={styles.title}>Fluentia Login</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#a0aec0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#a0aec0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {/* Add "Don't have an account? Sign Up" */}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>
              Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(30, 30, 60, 0.8)', // Darker background color for card
    padding: 20,
    borderRadius: 10,
    borderColor: '#667eea',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#38b2ac', // Vibrant teal color
    marginLeft: 10,
  },
  cardContent: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#a0aec0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Lighter dark color for inputs
    borderColor: '#667eea',
    borderWidth: 1,
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#667eea', // Vibrant blue button
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  signUpText: {
    color: '#ffffff',
    marginTop: 20,
    textAlign: 'center',
  },
  signUpLink: {
    color: '#38b2ac', // Make the "Sign Up" text stand out with teal color
    fontWeight: 'bold',
  }
});
