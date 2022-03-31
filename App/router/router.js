import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from '../Screens/SignUpScreen';
import React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import DashboardScreen from '../Screens/DashboardScreen';
import ChatScreen from '../Screens/ChatScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator




