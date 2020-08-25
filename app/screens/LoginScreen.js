import React, {Component} from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';

export default class LoginScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <Text> Login </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Dashboard')}>
          <Text>Go to Dashboard</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
