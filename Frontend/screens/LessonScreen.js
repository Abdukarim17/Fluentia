import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, TextInput, SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const questions = [
  {
    type: "multipleChoice",
    question: "How do you say 'Hello' in Arabic?",
    options: ["مرحبا (Marhaba)", "صباح الخير (Sabah al-khair)", "كيف حالك؟ (Kayfa Halak?)", "شكرا (Shukran)"],
    correctAnswer: "مرحبا (Marhaba)",
  },
  {
    type: "fillInTheBlank",
    question: "______ means 'Goodbye'.",
    correctAnswer: "مع السلامة",
  },

];

const LessonScreen = ({ route }) => {
  const navigation = useNavigation();
  const { quizId } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [matches, setMatches] = useState({});
  const [selectedEnglish, setSelectedEnglish] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerPress = (answer) => {
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      Alert.alert('Correct!', 'Well done!');
    } else {
      Alert.alert('Oops!', 'Try again.');
    }
    moveToNextQuestion();
  };

  const handleSubmitFillInTheBlank = () => {
    if (userInput.trim() === currentQuestion.correctAnswer) {
      setScore(score + 1);
      Alert.alert('Correct!', 'Well done!');
    } else {
      Alert.alert('Oops!', 'Try again.');
    }
    setUserInput(""); // Reset input
    moveToNextQuestion();
  };

  const handleEnglishSelect = (word) => {
    setSelectedEnglish(word);
  };

  const handleArabicSelect = (word) => {
    if (selectedEnglish) {
      setMatches({...matches, [selectedEnglish]: word});
      setSelectedEnglish(null);
    }
  };

  const checkMatches = () => {
    // Logic to check if all matches are correct
    // Update score and move to next question
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz is finished
      Alert.alert(
        'Quiz Finished',
        `Your score: ${score}/${questions.length}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Module', { completedQuizId: quizId })
          }
        ]
      );
    }
  };

  const renderMultipleChoice = () => (
    <View className="w-full">
    <Text className="text-white text-2xl font-bold mb-4">{currentQuestion.question}</Text>
    <FlatList
      data={currentQuestion.options}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity 
          className="bg-black-100 p-4 rounded-lg my-2 justify-center items-center"
          onPress={() => handleAnswerPress(item)}
        >
          <Text className="text-lg text-white">{item}</Text>
        </TouchableOpacity>
      )}
    />
    </View>
  );

  const renderFillInTheBlank = () => (
    <View className="mt-20">
      <Text className="text-white text-2xl font-bold mb-4">{currentQuestion.question}</Text>
      <View className={`space-y-2`}>

      <View className=" border-2 border-black-200 rounded-2xl focus:border-[#9b59b6] items-center w-full h-16 px-4 bg-black-100 flex-row">
        <TextInput className="flex-1 text-white font-psemibold text-base"
        value={userInput}
        placeholder="Enter Answer"
        placeholderTextColor="#7b7b8b"
        onChangeText={setUserInput}
        />

      </View>
    </View>
    <View className="mt-4">
      <TouchableOpacity 
    onPress = {handleSubmitFillInTheBlank}
    activeOpacity={0.7}
    className = {`bg-[#9b59b6] rounded-xl min-h-[62px] justify-center items-center`}>
        <Text className ={`text-primary font-psemibold text-lg`}>
            Submit Answer
        </Text>
    </TouchableOpacity>
    </View>
    </View>
  );


  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multipleChoice':
        return renderMultipleChoice();
      case 'fillInTheBlank':
        return renderFillInTheBlank();
      default:
        return <Text className="text-white text-lg">Unknown question type!</Text>;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary p-4">
      {renderQuestion()}
    </SafeAreaView>
  );
};

export default LessonScreen;
