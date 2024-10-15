import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, Card, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather'; // or lucide-react-native if available

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aiActivity, setAiActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAiActivity((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    // Handle login logic here
    console.log('Login attempted with:', email, password);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="ArabicAI Login"
          left={() => <Icon name="globe" size={24} color="#4fc3f7" />}
          titleStyle={styles.title}
        />
        <Card.Content>
          <TextInput
            label="البريد الإلكتروني (Email)"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="كلمة المرور (Password)"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            تسجيل الدخول (Login)
          </Button>
        </Card.Content>
        <Card.Actions style={styles.footer}>
          <Text style={styles.footerText}>Powered by Advanced Language AI</Text>
          <ProgressBar progress={aiActivity / 100} color="#4fc3f7" style={styles.progress} />
        </Card.Actions>
      </Card>
      <View style={styles.features}>
        <Text style={styles.featureText}>Futuristic Features:</Text>
        <Text>• Neural-link assisted learning</Text>
        <Text>• Holographic conversation practice</Text>
        <Text>• Time-dilated immersion sessions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(to-br, #1a237e, #4a148c)',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 16,
  },
  title: {
    color: '#4fc3f7',
    textAlign: 'center',
    fontSize: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#4fc3f7',
    color: '#fff',
  },
  button: {
    backgroundColor: '#4fc3f7',
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#4fc3f7',
  },
  progress: {
    width: '100%',
    marginTop: 8,
  },
  features: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#fff',
  },
  featureText: {
    color: '#fff',
    marginBottom: 4,
  },
});
