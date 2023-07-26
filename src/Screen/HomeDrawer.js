import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>}  screenOptions={{
            headerShown: false}} >
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    )
}

export default HomeDrawer