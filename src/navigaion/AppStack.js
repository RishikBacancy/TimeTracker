<<<<<<< HEAD
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FeedScreen from '../screens/FeedScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Feed" component={FeedScreen} />
    </Stack.Navigator>
  );
};
=======
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../Constants/Colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppStack = () =>
{
    return(
        <Tab.Navigator
            screenOptions={({route})=>({
                tabBarIcon: ({ focused, color, size}) => {
                    let iconName;

                    if(route.name === "Home") {
                        iconName = focused ? "ios-home" : "ios-home-outline";
                    } else if(route.name === "Feed") {
                        iconName = focused ? "ios-albums" : "ios-albums-outline";
                    } else if(route.name === "Profile") {
                        iconName = focused ? "ios-person" : "ios-person-outline";
                    }

                    return <Icon name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: Colors.primaryColor,
                tabBarInactiveTintColor: Colors.accentColor,
                headerShown:true,
            })}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Feed" component={FeedScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
}
>>>>>>> 4f64a821e86b1d5801cf9e4274ff84897d40d8b0

export default AppStack;
