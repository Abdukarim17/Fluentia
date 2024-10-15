
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useGlobalContext } from '../contexts/GlobalContext'  // Assuming the GlobalContext is in the same directory
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook


const SignUp = () => {
    const { signUpRequest, loading, error } = useGlobalContext();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();  // Get the navigation object


    const handleSignUp = async () => {
            await signUpRequest(first_name, last_name, username, email, password, confirm_password);

        if (!error) {
            navigation.replace('MainApp');  // Navigate to the main app with bottom tabs
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error && <Text style={styles.errorText}>{String(error)}</Text>}


            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Sign Up" onPress={handleSignUp} />
            )}
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    }
});

