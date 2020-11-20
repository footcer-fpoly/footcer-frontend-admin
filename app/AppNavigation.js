import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../app/screens/Home/HomeScreen';
import PriceScreen from './screens/PriceScreen';
import NotificationScreen from './screens/Notification/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import StadiumDetailScreen from './screens/Stadium/StadiumDetailScreen';
import ServicesScreen from './screens/Services/ServicesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({navigation}) =>{
    return (
      <Stack.Navigator
      screenOptions={{headerShown: false}}
      >
        <Stack.Screen
          name="Dashboard"
          component={HomeScreen}
        />
        <Stack.Screen name="StadiumDetailScreen" component={StadiumDetailScreen} />
      </Stack.Navigator>
    );
}
const PriceStack = ({navigation}) =>{
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Price"
          component={PriceScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
}
const NotificationStack = ({navigation}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
}
const UserStack = ({navigation}) => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Infor" component={ProfileScreen} />
        <Stack.Screen name="ServiceScreen" component={ServicesScreen} />
      </Stack.Navigator>
    );
}
const BottomNavigation = ({navigation}) => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Prices') {
              iconName = 'money';
            } else if (route.name === 'Notifications') {
              iconName = 'bell-o';
            } else if (route.name === 'Information') {
              iconName = 'user-o';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0AB134',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Prices" component={PriceStack} />
        <Tab.Screen name="Notifications" component={NotificationStack} />
        <Tab.Screen name="Information" component={UserStack} />
      </Tab.Navigator>
    );
}
export default function AppNavigation(props) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={BottomNavigation} />
          <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}