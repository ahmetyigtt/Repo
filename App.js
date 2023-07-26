import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AppStack from './src/Navigation/AppStack';
import AuthStack from './src/Navigation/AuthStack';
import { COLORS } from './src/Assets/Color';
import Navigation from './src/Service/Navigation';
import Auth from './src/Service/Auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserContext} from './src/Context/UserContext';

const Stack = createStackNavigator();

export default function App() {


  const { userData, setUserData, login, setLogin } = useContext(UserContext)

  const [logincheck, setlogincheck] = useState(true)



  useEffect(() => {

    getUser();
  }, [])

 

  const getUser = () => {

    Auth.getAccount().then(data => {
      if (data != null) {
        setUserData(data);
        setLogin(true);
        setlogincheck(false);
      }
      else {
        setlogincheck(false)
      }
    });

  }

  if (logincheck) {
    return null;
  }




  return (
    <SafeAreaProvider>

      <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
        <Stack.Navigator

          detachInactiveScreens={false}
          initialRouteName="Auth"
          screenOptions={{
            header: () => null,
            cardStyle: { backgroundColor: COLORS.white },
            gestureEnabled: true,
            backgroundColor: COLORS.button,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}>

          {!login ? <Stack.Screen name="Auth" component={AuthStack} /> :
            <Stack.Screen name="AppStack" component={AppStack} />
          }

        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
  );
}
