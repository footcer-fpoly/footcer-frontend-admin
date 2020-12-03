import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../app/screens/HomeScreen';
import PriceScreen from './screens/PriceScreen';
// import NotificationScreen from './screens/Notification/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import OTPScreen from './screens/OTPScreen';
import PasswordScreen from './screens/PasswordScreen';
import UpdatePasswordScreen from './screens/UpdatePasswordScreen';
import UpdateStadium from './screens/UpdateStadium';
import InfoStadium from './screens/InfoStadium';
import CreateCollage from './screens/CreateCollage';
import Spinner from './components/Spinner';
import StadiumDetailScreen from './screens/Stadium/StadiumDetailScreen';
import ServicesScreen from './screens/Services/ServicesScreen';
import Notifications from './screens/PushNotification/Notifications';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StadiumDetailScreen"
        component={StadiumDetailScreen}
      />
    </Stack.Navigator>
  );
};
const PriceStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Stadium"
        component={InfoStadium}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const NotificationStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const BottomNavigation = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
};
export default function AppNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Tab.Screen name="Home" component={HomeStack} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Dashboard" component={BottomNavigation} /> */}
        <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
        <Stack.Screen
          name="UpdatePasswordScreen"
          component={UpdatePasswordScreen}
        />
        <Stack.Screen name="UpdateStadium" component={UpdateStadium} />
        <Stack.Screen name="InfoStadium" component={InfoStadium} />
        <Stack.Screen name="PriceScreen" component={PriceScreen} />
        <Stack.Screen name="CreateCollage" component={CreateCollage} />
        <Tab.Screen name="Prices" component={PriceStack} />
        {/* <Tab.Screen name="Notifications" component={NotificationStack} /> */}
        <Tab.Screen name="Information" component={UserStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ServiceScreen" component={ServicesScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
      <Spinner />
    </NavigationContainer>
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
