import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import VoicePage from './VoicePage';
import ImageGeneration from './ImageGeneration';
import ImageDepth from '../components/ImageDepth';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Voice"
          component={VoicePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Image"
          component={ImageGeneration}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImageDepth"
          component={ImageDepth}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
