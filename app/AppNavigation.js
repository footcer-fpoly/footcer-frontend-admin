import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
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
import UserAdmin from './screens/UserAdmin.js';
import StadiumAdmin from './screens/StadiumAdmin.js';
import OrderStadium from './screens/OrderStadium.js';
import StatisticsDay from './screens/StatisticsDay.js';
import StatisticsWeek from './screens/StatisticsWeek.js';
import Notifications from './screens/PushNotification/Notifications';
import OrderDetails from './screens/OrderDetails';
import ReviewScreen from './screens/ReviewScreen';
import NotificationScreen from './screens/NotificationScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const isLogin = useSelector((state) => state?.userReducer?.loggedIn);
  if (isLogin) {
    return (
      <>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StadiumDetailScreen"
          component={StadiumDetailScreen}
        />
        <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Statistics" component={BottomNavigation} />
        <Stack.Screen name="UpdateStadium" component={UpdateStadium} />
        <Stack.Screen name="InfoStadium" component={InfoStadium} />
        <Stack.Screen name="PriceScreen" component={PriceScreen} />
        <Stack.Screen name="CreateCollage" component={CreateCollage} />
        <Tab.Screen name="Prices" component={InfoStadium} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ServiceScreen" component={ServicesScreen} />
        <Stack.Screen name="OrderStadium" component={OrderStadium} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Admin" component={StadiumAdmin} />
      </>
    );
  } else {
    return (
      <>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
        <Stack.Screen
          name="UpdatePasswordScreen"
          component={UpdatePasswordScreen}
        />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
      </>
    );
  }
};

const BottomNavigation = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Thống kê ngày"
      tabBarOptions={{
        activeTintColor: '#0AB134',
        inactiveTintColor: 'gray',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Thống kê ngày') {
            iconName = 'chart-pie';
          } else if (route.name === 'Thống kê tuần') {
            iconName = 'chart-bar';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}>
      <Stack.Screen name="Thống kê ngày" component={StatisticsDay} />
      <Stack.Screen name="Thống kê tuần" component={StatisticsWeek} />
    </Tab.Navigator>
  );
};
export default function AppNavigation(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {HomeStack()}
    </Stack.Navigator>
  );
}
