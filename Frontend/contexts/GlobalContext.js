import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUpRequest = async (first_name, last_name, username, email, password, confirm_password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post('http://localhost:8000/signup/', {
                first_name,
                last_name,
                username,
                email,
                password,
                confirm_password,
            });

            if (response.status === 200) {
                console.log("User signed up successfully", response.data);
            }
        } catch (err) {
            setError(err.response?.data?.detail || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Login function that sends email and password to the server and stores the token with user_id
    const loginRequest = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log(email, password)
            const response = await axios.post('http://localhost:8000/signup/', { email, password });
            console.log(response)

            if (response.status === 200) {
                const token = response.data.token;
                const userId = response.data.user_id; // Assuming backend sends user_id
                // Save the token with a user-specific key
                await AsyncStorage.setItem(`token_${userId}`, token);
                console.log(`Token saved for user ${userId}:`, token);
                return true;
            }
        } catch (err) {
            setError(err.response?.data?.detail || "Login failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Function to retrieve the token for a specific user
    const getToken = async (userId) => {
        try {
            const token = await AsyncStorage.getItem(`token_${userId}`);
            console.log(`Retrieved token for user ${userId}:`, token);
            return token;
        } catch (err) {
            console.error('Error retrieving token:', err);
        }
    };

    // Function to log out a specific user by removing their token
    const logout = async (userId) => {
        try {
            await AsyncStorage.removeItem(`token_${userId}`);
            console.log(`Token removed for user ${userId}`);
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return (
        <GlobalContext.Provider value={{ signUpRequest, loginRequest, getToken, logout, loading, error }}>
            {children}
        </GlobalContext.Provider>
    );
};
