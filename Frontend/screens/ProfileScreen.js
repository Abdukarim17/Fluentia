import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { icons } from '../constants/';
import { useNavigation } from '@react-navigation/native'; 

const ProfileScreen = () => {
  const navigation = useNavigation(); 

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens, user data, etc.)
    // Then navigate to the sign-in page
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-grow px-4">
        <View className="justify-center items-center mb-5 w-full mt-4">
          <View className="flex-col justify-start items-center bg-[#3b3b52] p-5 rounded-lg w-full relative">
            <TouchableOpacity onPress={handleLogout} className="absolute top-2 right-2 p-2">
              <Image source={icons.logout} className="w-6 h-6" />
            </TouchableOpacity>

            <View className="items-center">
              <View className="w-[150px] h-[150px] rounded-full bg-gray-400 justify-center items-center relative border-2 border-[#b23af2]">
                <Image source={icons.profile} className="w-[70px] h-[75px]" />
                <View className="absolute bottom-[5px] right-[5px] bg-[#FFD700] rounded-full p-[5px]">
                  <Text className="text-black text-xl">🥈</Text>
                </View>
              </View>
              <View className="flex-col items-center">
                <Text className="text-white text-lg font-bold mt-1">Karim</Text>
                <Text className="text-white text-base">Rank 27</Text>
              </View>
            </View>

            {/* Accuracy and Conversation Score */}
            <View className="mt-5 flex-row justify-around w-full">
              <View className="items-center">
                <Text className="text-white text-sm">Lesson accuracy:</Text>
                <Text className="text-white text-xl font-bold">89%</Text>
              </View>
              <View className="items-center">
                <Text className="text-white text-sm">Conversation Score:</Text>
                <Text className="text-white text-xl font-bold">8.3</Text>
              </View>
            </View>

            <View className="flex-row w-full justify-around mt-4">
              <View className="border border-[#b23af2] rounded p-2.5">
                <Text className="text-white text-lg font-bold">⚡️ 41</Text>
                <Text className="text-white text-sm">Total XP</Text>
              </View>
              <View className="border border-[#b23af2] rounded p-4">
                <Text className="text-white text-lg font-bold">🥈 2</Text>
                <Text className="text-white">Top 2</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-[#3b3b52] rounded-lg p-5 w-full mb-4">
          <Text className="text-white text-lg font-bold mb-4">Weekly Leaderboard</Text>
          <View className="flex-row justify-between mb-2.5">
            <Text className="text-white text-base">🥇 Gold</Text> 
            <Text className="text-white text-base">Dean Diasti</Text>
            <Text className="text-white text-base">63 xp</Text>
          </View>
          <View className="flex-row justify-between mb-2.5">
            <Text className="text-white text-base">🥈 Silver</Text> 
            <Text className="text-white text-base">Me</Text>
            <Text className="text-white text-base">41 xp</Text>
          </View>
          <View className="flex-row justify-between mb-2.5">
            <Text className="text-white text-base">🥉 Bronze</Text>
            <Text className="text-white text-base">Kareem</Text>
            <Text className="text-white text-base">16 xp</Text>
          </View>

          <TouchableOpacity className="bg-[#b23af2] p-2.5 rounded mt-5 items-center">
            <Text className="text-white text-base">+ Add Friends</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
