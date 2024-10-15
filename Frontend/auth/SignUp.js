import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../contexts/GlobalContext'
import { useNavigation } from '@react-navigation/native'; 

const SignUp = () => {
    const { signUpRequest, loading, error } = useGlobalContext();
    const navigation = useNavigation(); 

    // State for form inputs
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // For confirm password field

    const handleSignUp = async () => {
        // Ensure password and confirm password match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Call signUpRequest function from GlobalContext
            const isSuccess = await signUpRequest(firstname, lastname, username, email, password, confirmPassword);
            // On success, navigate to SignIn
            if(isSuccess){
                navigation.navigate('SignIn');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Sign Up to Fluentia</Text>

                {/* First and Last name inputs */}
                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, styles.nameInput]} // Custom style for name inputs
                        placeholder="First name"
                        value={firstname}
                        onChangeText={setFirstname}
                        placeholderTextColor="#a0aec0"
                    />

                    <TextInput
                        style={[styles.input, styles.nameInput]} // Custom style for name inputs
                        placeholder="Last name"
                        value={lastname}
                        onChangeText={setLastname}
                        placeholderTextColor="#a0aec0"
                    />
                </View>
    
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor="#a0aec0"
                />
    
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#a0aec0"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#a0aec0"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholderTextColor="#a0aec0"
                />
    
                {error && <Text style={styles.errorText}>{String(error)}</Text>}
    
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                )}

                {/* Already have an account? Sign In */}
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.signInText}>
                        Already have an account? <Text style={styles.signInLink}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};    

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#0d0d3a',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'rgba(30, 30, 60, 0.9)',
        padding: 20,
        borderRadius: 10,
        borderColor: '#667eea',
        borderWidth: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#38b2ac',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: '#667eea',
        borderWidth: 1,
        color: '#ffffff',
        padding: 12,
        borderRadius: 5,
        marginBottom: 16,
    },
    nameInput: {
        width: '48%', // Each name input takes 48% of the available space to fit next to each other
    },
    button: {
        width: '100%',
        backgroundColor: '#667eea',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
    loading: {
        marginTop: 16,
    },
    signInText: {
        color: '#ffffff',
        marginTop: 20,
        textAlign: 'center',
    },
    signInLink: {
        color: '#38b2ac',
        fontWeight: 'bold',
    }
});
