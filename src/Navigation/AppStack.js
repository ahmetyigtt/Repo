import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { COLORS } from '../Assets/Color';
import Contacts from '../Screen/Contacts';
import SingleChat from '../Screen/SingleChat';
import HomeDrawer from '../Screen/HomeDrawer';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      cardStyle :{ backgroundColor: COLORS.button},
      gestureEnabled: true,
      backgroundColor:COLORS.button,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    }}
    initialRouteName="HomeDrawer" >
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="SingleChat" component={SingleChat} />
    </Stack.Navigator>
  );
}
