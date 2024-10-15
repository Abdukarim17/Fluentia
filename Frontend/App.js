import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LessonScreen from './screens/LessonScreen';
import LevelScreen from './screens/LevelScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import TabBar from './components/TabBar';
import { GlobalProvider } from './contexts/GlobalContext'; // Assuming it's a global context
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import ModuleScreen from './screens/ModuleScreen';
import AudioRecorder from './screens/audio/AudioRecorder';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName='MainHome'>
      <Stack.Screen name="MainHome" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Lesson" component={LessonScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Level" component={LevelScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

function MainApp() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Friends" component={ProfileScreen} />

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainApp">
          {/* The SignUp screen without bottom tab */}
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="Lesson" component={LessonScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Module" component={ModuleScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AudioRecorder" component={AudioRecorder} options={{ headerShown: false }} />
          {/* The Main App with bottom tabs */}
          <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}
