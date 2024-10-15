import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { icons } from "../constants";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLessonPress = (lessonId) => {
    navigation.navigate('Module', { lessonId });
  };

  const lessons = [1, 2, 3, 4, 5, 6];

  const renderItem = ({ item: lessonNumber }) => (
    <TouchableOpacity
      key={lessonNumber}
      onPress={lessonNumber <= 4 ? () => handleLessonPress(lessonNumber.toString()) : undefined}
      style={{
        width: '48%',
        aspectRatio: 1,
        backgroundColor: getLessonColor(lessonNumber),
        borderRadius: 20,
        padding: 15,
        justifyContent: 'flex-end',
        marginBottom: 15,
        opacity: lessonNumber > 1 ? 0.5 : 1,
      }}
      disabled={lessonNumber > 1}
    >
      <Text style={{ color: 'white', fontSize: 18 }}>Module {lessonNumber}:</Text>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
        {getLessonName(lessonNumber)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#161622]">
      <StatusBar backgroundColor='#161622' style='light'/>
      <View className="p-5 bg-primary">
        <Text className="text-4xl font-bold mb-5 text-white mt-10">
          Let's Learn Arabic!
        </Text>
        <FlatList
          data={lessons}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

const getLessonColor = (lessonNumber) => {
  const colors = ['#FF9C01', '#6495ED', '#4B0082', '#FFD720', '#eb4034', '#3da112'];
  return colors[lessonNumber - 1];
};

const getLessonName = (lessonNumber) => {
  const names = ['Basics', 'Locked', 'Locked', 'Locked', 'Locked', 'Locked'];
  return names[lessonNumber - 1];
};

export default HomeScreen;