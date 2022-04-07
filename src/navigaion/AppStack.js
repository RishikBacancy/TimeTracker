import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../Constants/Colors';
import ChatScreen from '../screens/ChatScreen';
import MessagesScreen from '../screens/MessagesScreen';
import TimeTracking from '../screens/TimeTracking';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Message') {
            iconName = focused ? 'ios-albums' : 'ios-albums-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: Colors.accentColor,
        headerShown: true,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Message"
        component={MessageStack}
        options={({route}) => ({
          headerShown: false,
        })}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="TimeTracking" component={TimeTracking} />
    </Tab.Navigator>
  );
};

export default AppStack;
