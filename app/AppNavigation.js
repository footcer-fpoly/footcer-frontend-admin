import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import HomeDetailScreen from './screens/HomeDetailScreen';
import PriceScreen from './screens/PriceScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class HomeStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="HomeDetails" component={HomeDetailScreen} />
      </Stack.Navigator>
    );
  }
}
class PriceStack extends Component {
  render() {
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
}
class NotificationStack extends Component {
  render() {
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
}
class UserStack extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Infor" component={ProfileScreen} />
      </Stack.Navigator>
    );
  }
}

class BottomNavigation extends Component {
  render() {
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
}

export default class AppNavigation extends Component {
  render() {
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
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
