import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavScreen from '../screens/FavScreen';
import SearchScreen from '../screens/SearchScreen';
import DetailsScreen from '../screens/DetailsScreen';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: route.name === 'Home' ? false : true,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Favs') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          backgroundColor: 'black',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Tab.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
      <Tab.Screen name="Favs" component={FavScreen} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <RootStack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
    </RootStack.Navigator>
  );
}

interface AppNavigatorProps {
  user: any;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({user}) => {
  return (
    <NavigationContainer>
      {user ? (
        <RootStack.Navigator>
          <RootStack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Details"
            component={DetailsScreen}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
